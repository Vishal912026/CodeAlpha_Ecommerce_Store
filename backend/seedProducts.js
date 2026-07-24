import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    description: "Comfortable over-ear wireless headphones with noise cancellation",
    price: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 25,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    stock: 15,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with breathable mesh",
    price: 1499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 30,
  },
  {
    name: "Backpack",
    description: "Water-resistant travel backpack with laptop compartment",
    price: 999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    stock: 40,
  },
  {
    name: "Sunglasses",
    description: "UV protection stylish sunglasses",
    price: 599,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    stock: 50,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and 12-hour battery",
    price: 1299,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    stock: 20,
  },
  {
    name: "Coffee Mug",
    description: "Ceramic coffee mug, 350ml capacity",
    price: 249,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
    stock: 60,
  },
  {
    name: "Table Lamp",
    description: "Modern LED table lamp with adjustable brightness",
    price: 899,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    stock: 18,
  },
  {
    name: "Laptop Sleeve",
    description: "Padded laptop sleeve for 14-15 inch laptops",
    price: 449,
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400",
    stock: 35,
  },
  {
    name: "Wall Clock",
    description: "Minimalist wooden wall clock",
    price: 799,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400",
    stock: 22,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    price: 699,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400",
    stock: 28,
  },
  {
    name: "Desk Organizer",
    description: "Wooden desk organizer for stationery and gadgets",
    price: 549,
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400",
    stock: 33,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await Product.insertMany(products);
    console.log("Products added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Error:", err);
  });