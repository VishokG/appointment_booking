import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";  //FIREBASE AUTHENTICATION FUNCTIONS
import { validationResult } from "express-validator";
import auth from "../services/auth.js";
import jwt from "jsonwebtoken";
import { writeUserData } from "../repositories/user.js";

//HANDLE USER LOGIN
export const loginController = async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        res.status(200).json({
            success: false, 
            message:"Invalid input", 
            error: err.mapped()
        });
        return;
    }

    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;
        const token = jwt.sign({id: user.uid}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).json({
            success: true,
            message:"Login Successful", 
            token
        });
    })
    .catch((error) => {
        res.status(200).json({
            success: false, 
            error
        })
    });
}

//HANDLE USER REGISTRATION
export const registerController = async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        res.status(200).json({
            success: false, 
            message:"Invalid input", 
            error: err.mapped()
        });
        return;
    }
    
    await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;
        writeUserData(user.uid, req.body.name, req.body.email);
        res.status(200).json({
            success: true,
            message:"Registration Successful"
        });
    })
    .catch((error) => {
        res.status(200).json({
            success: false, 
            error
        })
    });
}