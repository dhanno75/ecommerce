import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

// Create new category
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name });

    if (category) {
      return res.status(400).json({
        status: "fail",
        message: "This category already exists",
      });
    } else {
      const newCategory = await Category.create({ name });
      return res.status(201).json({
        status: "success",
        data: newCategory,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "success",
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Get all categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again later.",
    });
  }
};

// Get products based on category
export const getProductsBasedOnCategory = async (req, res, next) => {
  try {
    const { categoryID } = req.params;

    const products = await Product.find({ categoryID });

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No products found in this category",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: products,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
