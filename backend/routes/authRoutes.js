import express from "express";
import { register, login, getProfile, logout, updateProfile, deleteAccount } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", protect, updateProfile);
router.delete("/delete", protect, deleteAccount);
// protected route
router.get("/profile", protect, getProfile);

export default router;  