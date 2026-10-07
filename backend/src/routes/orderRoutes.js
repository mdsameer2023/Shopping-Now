import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.patch("/:id/pay", protect, updateOrderToPaid);

export default router;
