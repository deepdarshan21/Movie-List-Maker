const UserDB = require("../models/Users");
const { validateToken } = require("../utils/ValidateToken");

// @desc    Allow users to sign up
// @route    POST /user/userName
// @access  Public
exports.getUserName = (req, res, next) => {
    try {
        const { jwtToken } = req.body;
        const userEmail = validateToken(jwtToken);
        UserDB.findOne({email: userEmail}).then((user)=>{
            if(user){
                return res.status(200).json({
                    success: true,
                    message: "User found",
                    name: user.name
                });
            }else {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
        }).catch((err)=>{
            return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                });
        })
    } catch (error) {
        return res.status(400).json({
                    success: false,
                    message: "Invalid or Empty Token",
                });
    }
};
