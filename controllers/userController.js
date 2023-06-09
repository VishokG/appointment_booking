import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../services/auth.js";
import jsonwebtoken from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

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

        userRepository.writeUserData(user.uid, req.body.name, req.body.email);
        res.status(200).send({message:"Registration Successful", success: true});
    })
    .catch((error) => {
        // const errorCode = error.code;
        res.status(500).send({message: error.message, success: false})
    });
}

const authController = async (req, res) => {
    try {
        const user = await userRepository.getUserFromId(req.body.userId);
        
        if(!user) {
            return res.status(200).send({
                message: "user not found",
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
    } catch(err) {
        console.log(err);
        res.status(400).send({message: err, success: false})
    }
}

export default {loginController, registerController, authController};