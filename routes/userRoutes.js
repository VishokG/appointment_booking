import userController from "../controllers/userController.js";
import express from "express";
import authMiddleWare from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/login", userController.loginController);
router.post("/register", userController.registerController);
router.post("/getUserData", authMiddleWare, userController.authController);

export default router;