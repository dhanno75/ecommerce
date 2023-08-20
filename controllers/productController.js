import Product from "../models/productModel.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, available, categoryID } = req.body;
    const product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({
        status: "fail",
        message: "This category already exists",
      });
    } else {
      const newProduct = await Product.create({
        name,
        description,
        price,
        available,
        categoryID,
      });

      return res.status(201).json({
        status: "success",
        data: newProduct,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again later.",
    });
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        status: "fail",
        message: "This product does not exist",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: product,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again later.",
    });
  }
};
