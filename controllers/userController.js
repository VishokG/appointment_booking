import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../services/auth.js";
import jsonwebtoken from "jsonwebtoken";
import db from "../models/userModel.js";

//HANDLE USER LOGIN
const loginController = async (req, res) => {

    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;
        const token = jsonwebtoken.sign({id: user.uid}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).send({message:"Login Successful", success: true, token});
    })
    .catch((error) => {
        // const errorCode = error.code;
        res.status(200).send({success: false, message: error.message})
    });
}

//HANDLE USER REGISTRATION
const registerController = async (req, res) => {

    await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;

        db.writeUserData(user.uid, req.body.name, req.body.email);
        res.status(200).send({message:"ok", success: true});
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(500).send({errorCode, message: errorMessage})
    });
}

const authController = async (req, res) => {
    try {
        const user = await db.getUserFromId(req.body.userId);
        
        if(!user) {
            console.log(1);
            return res.status(200).send({
                message: "user not found",
                success: false
            })
        } else {
            console.log(user);
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
    } catch(err) {
        console.log(3);
        console.log(err);
        res.status()
    }
}

export default {loginController, registerController, authController};