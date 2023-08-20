import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Create cart
export const createCart = async (req, res, next) => {
  const userID = req.user._id;

  const { productID, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userID });
    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const price = product.price;
    const name = product.name;

    // If cart already exists for user
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.productID == productID
      );

      // Check if product exists or not
      if (productIndex > -1) {
        const productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        cart.totalCost = cart.products.reduce((acc, el) => {
          return acc + el.quantity * el.price;
        }, 0);
        cart.products[productIndex] = productItem;
        await cart.save();
        res.status(200).json({
          message: "success",
          data: cart,
        });
      } else {
        cart.products.push({ productID, name, quantity, price });
        cart.totalCost = cart.products.reduce((acc, el) => {
          return acc + el.quantity * el.price;
        }, 0);
        await cart.save();
        res.status(200).json({
          status: "success",
          data: cart,
        });
      }
    } else {
      // no cart exists, than create one
      const newCart = await Cart.create({
        userID,
        products: [{ productID, name, quantity, price }],
        totalCost: quantity * price,
      });
      return res.status(201).json({
        status: "success",
        data: newCart,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again after sometime",
    });
  }
};

// Get cart
export const getCart = async (req, res, next) => {
  const userID = req.user._id;
  try {
    const cart = await Cart.findOne({ userID });
    if (cart && cart.products.length > 0) {
      res.status(200).json({
        status: "success",
        data: cart,
      });
    } else {
      res.send(null);
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try after sometime",
    });
  }
};

// Remove items from the cart
export const removeProductsFromCart = async (req, res, next) => {
  const userID = req.user._id;
  const productID = req.query.productID;

  // try {
  let cart = await Cart.findOne({ userID });
  const productIndex = cart.products.findIndex(
    (product) => product.productID == productID
  );

  if (productIndex > -1) {
    let productItem = cart.products[productIndex];
    cart.totalCost -= productItem.quantity * productItem.price;

    if (cart.totalCost < 0) {
      cart.totalCost = 0;
    }

    cart.products.splice(productIndex, 1);
    cart.totalCost = cart.products.reduce((acc, el) => {
      return acc + el.quantity * el.price;
    }, 0);
    cart = await cart.save();
    res.status(200).json({
      status: "success",
      data: cart,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "product not found",
    });
  }
  // } catch (err) {
  //   console.log(err);
  //   res.status(400).json({
  //     status: "fail",
  //   });
  // }
};
