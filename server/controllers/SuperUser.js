const generateToken = require('../generateToken')
const SuperUser = require('../models/SuperUser')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const superUser = await SuperUser.findOne({ email }).select('+password')

        if (superUser && (await superUser.matchPassword(password))) {
            let token =  generateToken(superUser._id)
            res.status(201).send({
                success: true,
                _id: superUser._id,
                email: superUser.email,
                token: token,
            });
            console.log("NICEE")
        }else{
            res.status(401);
            throw new Error("Wrong Email or Password");
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}