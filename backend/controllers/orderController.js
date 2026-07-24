import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      products,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};