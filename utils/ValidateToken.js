const jwt = require("jsonwebtoken");

require("dotenv").config("../config.env");

const JWT_SECRET = process.env.JWT_SECRET;

exports.validateToken = (jwtToken) => {
    if (jwtToken === "") {
        return new Error("Empty Token");
    }
    try {
        const decodedToken = jwt.verify(jwtToken, JWT_SECRET);
        return decodedToken.email;
    } catch (error) {
        return new Error("Invalid Token");
    }
};
