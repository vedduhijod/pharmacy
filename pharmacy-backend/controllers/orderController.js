import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { items } = req.body;

  try {
    const order = await Order.create({
      user: req.user, // comes from protect middleware
      items,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
