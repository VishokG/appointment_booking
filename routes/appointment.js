import express from "express";
import controller from "../controllers/appointment.js";
import authMiddleWare from "../middlewares/authMiddleWare.js";

const router = express.Router();

//GET ALL APPOINTMENTS
router.get("/", authMiddleWare, controller.getApt);
//GET SPECIFIC APPOINTMENT
router.get("/:aptId", authMiddleWare, controller.getApt);
//CREATE APPOINTMENT
router.post("/", authMiddleWare, controller.createApt);
//UPDATE APPOINTMENT
router.put("/:aptId", authMiddleWare, controller.updateApt);
//DELETE APPOINTMENT
router.delete("/:aptId", authMiddleWare, controller.deleteApt);


export default router;