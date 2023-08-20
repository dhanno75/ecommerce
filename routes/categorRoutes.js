import express from "express";
import {
  createCategory,
  getAllCategories,
  getProductsBasedOnCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(createCategory).get(getAllCategories);
router.route("/:categoryID").get(getProductsBasedOnCategory);

export default router;
