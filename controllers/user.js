import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../services/auth.js";
import jwt from "jsonwebtoken";
import repository from "../repositories/user.js";
import { validationResult } from "express-validator";

//HANDLE USER LOGIN
const loginController = async (req, res) => {
    const error = validationResult(req);
    
    if(!error.isEmpty()) {
        res.status(200).json({message:"Errors present", success: false, errors: error.mapped()});
        return;
    }

    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;
        const token = jwt.sign({id: user.uid}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).json({message:"Login Successful", success: true, token});
    })
    .catch((error) => {
        res.status(200).json({success: false, message: error.message})
    });
}

//HANDLE USER REGISTRATION
const registerController = async (req, res) => {
    const error = validationResult(req);
    
    if(!error.isEmpty()) {
        res.status(200).json({message:"Errors present", success: false, errors: error.mapped()});
        return;
    }
    
    await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;
        repository.writeUserData(user.uid, req.body.name, req.body.email);
        res.status(200).json({message:"Registration Successful", success: true});
    })
    .catch((error) => {
        // const errorCode = error.code;
        console.log(error);
        res.status(500).json({message: error.message, success: false})
    });
}

const authController = async (req, res) => {
    try {
        const user = await repository.getUserFromId(req.body.userId);
        
        if(!user) {
            return res.status(200).json({
                message: "user not found",
                success: false
            })
        } else {
            res.status(200).json({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
    } catch(err) {
        console.log(err);
        res.status(400).json({message: err, success: false})
    }
}

export default {loginController, registerController, authController};