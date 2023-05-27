const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Teacher = require('../models/Teacher')
const SuperUser = require('../models/SuperUser');
const User2 = require('../models/User2');


exports.checkAuthUser = async(req, res)=>{
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        
        try {
            token = req.headers.authorization.split(" ")[1];

            //decoded token id
            const decoded = jwt.verify(token, process.env.AUTHORIZATION_SECRET_KEY);

            const user = await User.findById(decoded.id).select("-password");
            if(user){
                res.status(200).json({success:true})
            }else{
                res.status(401).json({success:false})
            }

        } catch (error) {
            res.status(401).json({success:false});
            // throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401).json({success:false});
        // throw new Error("Not authorized, no token");
    }
}
exports.checkAuthUser2 = async (req, res) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        
        try {
            token = req.headers.authorization.split(" ")[1];

            //decoded token id
            const decoded = jwt.verify(token, process.env.AUTHORIZATION_SECRET_KEY);


            const user = await User2.findById(decoded.id).select("-password");

            if(user){
                res.status(200).json({success:true})
            }else{
                res.status(401).json({success:false})
            }

        } catch (error) {
            // res.status(401).send(new Error("Not authorized, token failed"));
            // throw new Error("Not authorized, token failed");
            res.status(401).json({success:false});
        }
    }

    if (!token) {
        // res.status(401);
        // throw new Error("Not authorized, no token");
        res.status(401).json({success:false});
    }
};


exports.checkAuthTeacher = async(req, res)=>{
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        
        try {
            token = req.headers.authorization.split(" ")[1];

            //decoded token id
            const decoded = jwt.verify(token, process.env.AUTHORIZATION_SECRET_KEY);

            const user = await Teacher.findById(decoded.id).select("-password");
            if(user){
                res.status(200).json({success:true})
            }else{
                res.status(401).json({success:false})
            }

        } catch (error) {
            res.status(401).json({success:false});
            // throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401).json({success:false});
        // throw new Error("Not authorized, no token");
    }
}
exports.checkAuthSuper = async(req, res)=>{
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        
        try {
            token = req.headers.authorization.split(" ")[1];

            //decoded token id
            const decoded = jwt.verify(token, process.env.AUTHORIZATION_SECRET_KEY);

            const user = await SuperUser.findById(decoded.id).select("-password");
            if(user){
                res.status(200).json({success:true})
            }else{
                res.status(401).json({success:false})
            }
        } catch (error) {
            res.status(401).json({success:false});
            // throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401).json({success:false});
        // throw new Error("Not authorized, no token");
    }
}
