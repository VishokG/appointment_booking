import { checkSchema } from "express-validator";

export const loginValidation = checkSchema({
    email: {
        exists: {
            errorMessage: "Please enter your email"
        }
    },
    password: {
        exists: {
            errorMessage: "Please enter password"
        }
    }
});

export const registerValidation = checkSchema({
    name: {
        exists: {
            errorMessage: "Please enter your name"
        },
        isEmpty: false,
        trim: true,
    },
    email: {
        exists: {
            errorMessage: "Please enter your email"
        },
        isEmail: true,
        isEmpty: false
    },
    password: {
        exists: {
            errorMessage: "Please enter password"
        },
        isLength: {
            options: {
                min: 8
            }
        }
    }
});