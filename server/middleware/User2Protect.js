const jwt = require("jsonwebtoken");
const User2 = require("../models/User2");
const asyncHandler = require("express-async-handler");

const protect2 = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        
        try {
            token = req.headers.authorization.split(" ")[1];

            //decoded token id
            const decoded = jwt.verify(token, process.env.AUTHORIZATION_SECRET_KEY);

            req.user = await User2.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).send(new Error("Not authorized, token failed"));
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect2 };