import express from "express";
import {
  createCart,
  getCart,
  removeProductsFromCart,
} from "../controllers/cartController.js";
import { auth } from "../controllers/userController.js";

const router = express.Router();

router.use(auth);
router.route("/").post(createCart).get(getCart);
router.delete("/remove/", removeProductsFromCart);

export default router;
