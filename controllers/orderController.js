const { Order } = require("../models/order");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "_id name")
      .sort("-createdAt");

    res.json(orders);
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
};

const addOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,

    paymentMethod,

    itemsTotalPrice,
    taxPrice,
    shippingPrice,
    orderTotal,
  } = req.body;

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsTotalPrice,
    taxPrice,
    shippingPrice,
    orderTotal,
  });
  try {
    const createdOrder = await order.save();

    res.json(createdOrder);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return next(CustomErrorHandler.notFound());
    }
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (error) {
    return next(CustomErrorHandler.serverError());
  }
};

const orderDetails = async (req, res, next) => {
  console.log("order detaial");
  try {
    const order = await Order.findById(req.params.id)
      .select("-updatedAt -__v")
      .populate("user", "name");
    if (!order) {
      return next(CustomErrorHandler.notFound());
    } else {
      res.json(order);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOrders,
  addOrder,
  updateStatus,
  getMyOrders,
  orderDetails,
};
