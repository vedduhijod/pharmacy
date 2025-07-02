import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = await Product.create({ name, price });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
