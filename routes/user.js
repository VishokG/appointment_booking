import express from "express";
import { loginController, registerController} from "../controllers/user.js";
import { loginValidation, registerValidation } from "../middlewares/validators/user.js"

const router = express.Router();

router.post("/login", loginValidation, loginController);
router.post("/register", registerValidation, registerController);

export default router;