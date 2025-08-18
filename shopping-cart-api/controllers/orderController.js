const Order = require('../models/orderModel');

exports.getAllOrder = async (req, res) => {
  const order = await Order.getAllOrder();
  res.json(order);
};