import express from "express";
import {
  createProduct,
  getOneProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").post(createProduct);
router.route("/:id").get(getOneProduct);

export default router;
