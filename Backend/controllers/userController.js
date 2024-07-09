const { passwordHash, matchPassword } = require("../utils/passwordHashing");
const userModel = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.login = async (request, response) => {
    try {
        const {email, password} = request.body;
        
        const user = await userModel.findOne({email});

        if (!user) {
            return response.json({
                success: false,
                message: "Please create an account before logging in"
            })
        }

        const hashedPassword = user.password;

        if (await matchPassword(password, hashedPassword)) {

            const JWT_SECRET = process.env.JWT_SECRET;

            const payload = {
                email: user.email
            };

            let token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1h"
            })

            const options = {
                expires: new Date(Date.now() + 60*60*1000),
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }

            return response.cookie("token", token, options).json({
                success: true,
                message: "You're logged in successfully"
            })
        } else {
            return response.json({
                success: false,
                message: "Username or password don't match"
            })
        }
    } catch(err) {
        console.log("Error in login", err);
        return response.json({
            success: false,
            message: "We are facing some issues. Please try again later. Sorry for inconvenience!!!"
        })
    }
}

exports.signup = async (request, response) => {
    try {
        const {name, email, password} = request.body;

        const hashedPassword = await passwordHash(password);

        if (!hashedPassword) {
            response.json({
                success: false,
                message: "Couldn't create entry in database due to error in password hashing"
            });
            return;
        }

        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            response.json({
                success: false,
                message: "Email is already registered"
            });
            return;
        }

        const user = await userModel.create({name, email, password:hashedPassword});

        if (user) {
            response.json({
                success: true,
                message: "Your account has been created successfully"
            });
            return;
        }
    } catch(err) {
        console.log("Error in signup", err);
        response.json({
            success: false,
            message: "We are facing some issues. Please try again later. Sorry for inconvenience!!!"
        });
        return;
    }
}

exports.logout = (request, response) => {
    response.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }).json({
        success: true
    });
    return;
}