import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const quantities = {};
    for (const item of products) {
      const quantity = Number(item.quantity);

      if (
        typeof item.product !== "string" ||
        !mongoose.isValidObjectId(item.product) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({ message: "Invalid product or quantity" });
      }

      quantities[item.product] = (quantities[item.product] || 0) + quantity;
    }

    const productIds = Object.keys(quantities);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== productIds.length) {
      return res
        .status(400)
        .json({ message: "Some products in your cart no longer exist" });
    }

    let totalAmount = 0;
    const orderProducts = [];
    const stockUpdates = [];

    for (const product of dbProducts) {
      const quantity = quantities[product._id.toString()];

      if (product.stock < quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }

      totalAmount += product.price * quantity;
      orderProducts.push({ product: product._id, quantity });
      stockUpdates.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $inc: { stock: -quantity } },
        },
      });
    }

    const newOrder = new Order({
      user: req.userId,
      products: orderProducts,
      totalAmount,
    });

    await newOrder.save();
    await Product.bulkWrite(stockUpdates);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    if (req.params.userId !== req.userId) {
      return res.status(403).json({ message: "You can only see your own orders" });
    }

    const orders = await Order.find({ user: req.params.userId }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};