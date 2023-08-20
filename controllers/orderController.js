import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res, next) => {
  try {
    const userID = req.user._id;
    let payload = req.body;

    // Find cart and the user
    let cart = await Cart.findOne({ userID });
    let user = req.user;

    if (cart) {
      payload = { ...payload, amount: cart.totalCost, email: user.email };
      const newOrder = await Order.create({
        userID,
        products: cart.products,
        totalCost: cart.totalCost,
      });

      // Delete cart
      const deleteCart = await Cart.findByIdAndDelete({ _id: cart.id });
      return res.status(201).json({
        status: "success",
        data: newOrder,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "No cart found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again after sometime.",
    });
  }
};

// Get orders
export const getOrders = async (req, res, next) => {
  const userID = req.user._id;
  const order = await Order.find({ userID }).sort({ date: -1 });

  if (order) {
    return res.status(200).json({
      status: "success",
      data: order,
    });
  }

  res.status(404).json({
    status: "fail",
    message: "No orders found",
  });
};
