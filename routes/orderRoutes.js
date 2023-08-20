import express from "express";
import { getOrders, placeOrder } from "../controllers/orderController.js";
import { auth } from "../controllers/userController.js";

const router = express.Router();

router.use(auth);
router.post("/checkout", placeOrder);
router.get("/", getOrders);

export default router;
