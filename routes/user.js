import controller from "../controllers/user.js";
import express from "express";
import validation from "../middlewares/validators/user.js"

const router = express.Router();

router.post("/login", validation.login, controller.loginController);
router.post("/register", validation.registration, controller.registerController);

export default router;