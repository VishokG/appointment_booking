import { checkSchema } from "express-validator";

export default {
    registration: checkSchema({
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
    }),
    login: checkSchema({
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
    })
}