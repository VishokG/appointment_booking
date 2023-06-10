import { validationResult } from "express-validator";
import repository from "../repositories/appointment.js"

const createApt = async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        res.status(200).json({
            success: false, 
            message:"Invalid input", 
            error: err.mapped()
        });
        return;
    }

    try {
        if(await repository.checkAppointmentPresent(req.body.day, req.body.timeStart)) {
            res.status(200).send({
                success: false, 
                message: "This slot has already been booked"
            });
        } else {
            repository.createAppointment(req.body.userId, req.body.day, req.body.timeStart);
            res.status(200).send({
                success: true,
                message: "Your appointment has been successfully booked"
            });
        }
    } catch(error) {
        res.status(200).send({
            success: false,
            error
        })
    }
}

const getApt = async (req, res) => {
    try {
        const data = await repository.getAppointment(req.params.aptId);
        if(data.exists) {
            res.status(200).send({
                success: true,
                data
            });
        } else {
            res.status(200).send({
                success: false,
                message: "No appointments match given criteria"
            });
        }
    } catch(error) {
        res.status(200).send({
            success: false,
            error
        })
    }
}

const updateApt = async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        res.status(200).json({
            success: false, 
            message:"Invalid input", 
            error: err.mapped()
        });
        return;
    }
    
    try {
        const data = await repository.updateAppointment(req.params.aptId, req.body.day, req.body.timeStart);
        res.status(200).send({
            success: true,
            message: "Appointment has been updated successfully"
        });
    } catch(error) {
        res.status(200).send({
            success: false,
            error
        });
    }
}

const deleteApt = async (req, res) => {
    try {
        await repository.deleteAppointment(req.params.aptId);
        res.status(200).send({
            success: true,
            message: "Appointment has been deleted successfully"
        })
    } catch(error) {
        res.status(200).send({
            success: false,
            error
        })
    }
}

export default { createApt, getApt, updateApt, deleteApt };