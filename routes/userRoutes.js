import express from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
  userVerified,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify/:userId/:uniqueString", userVerified);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:token", resetPassword);

export default router;
