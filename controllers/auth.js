const UserDB = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config("../.env");

const JWT_SECRET = process.env.JWT_SECRET;

// @desc    Allow users to sign up
// route    POST /auth/signup
// @access  Public
exports.signup = (req, res, next) => {
    const { name, email, password } = req.body;

    UserDB.findOne({ email })
        .then(async (val) => {
            if (val) {
                return res.status(409).json({
                    success: false,
                    errorMessage: "User already using this email, try different email",
                });
            } else {
                UserDB.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                })
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            message: "Successfully Registered",
                        });
                    })
                    .catch((err) => {
                        if (err.errors) {
                            return res.status(422).json({
                                success: false,
                                message: "Please Check Your Inputs again",
                            });
                        } else {
                            return res.status(500).json({
                                success: false,
                                message: "Internal Server Error",
                            });
                        }
                    });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                sucess: false,
                message: "Internal Server Error, please try again sfter some time",
            });
        });
};

// @desc    Allow users to sign in
// route    POST /auth/login
// @access  Public
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    if (email) {
        UserDB.findOne({ email }).then(async (user) => {
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    return res.status(200).json({
                        success: true,
                        message: "Successfully Logged-in",
                        token: jwt.sign(
                            {
                                id: user._id,
                                email: user.email,
                            },
                            JWT_SECRET
                        ),
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        message: "Incorrect Email/Password",
                    });
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Incorrect Email/Password",
                });
            }
        });
    }
};
