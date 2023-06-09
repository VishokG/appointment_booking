import express from "express";
import controller from "../controllers/appointment.js";

const router = express.Router();

//GET ALL APPOINTMENTS
router.get("/", controller.getApt);
//GET SPECIFIC APPOINTMENT
router.get("/:aptId", controller.getApt);
//CREATE APPOINTMENT
router.post("/", controller.createApt);
//UPDATE APPOINTMENT
router.put("/:aptId", controller.updateApt);
//DELETE APPOINTMENT
router.delete("/:aptId", controller.deleteApt);


export default router;