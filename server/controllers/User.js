const generateToken = require('../generateToken')
const User = require('../models/User')
const RegistrationMailer = require('../middleware/RegistrationMail');

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password, phone, enRoll, batch, year, pic, fatherName, DOB, category } = req.body

        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).send({ success: false, message: 'User already exists' })
        }

        user = await User.create({
            name,
            email,
            password,
            phone,
            enRoll,
            batch,
            year,
            pic,
            DOB,
            fatherName,
            category
        })

        if(res.status(201)){
            // Sending Mail
            RegistrationMailer(user.email, password);

            res.send({
                success:true,
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                enRoll: user.enRoll,
                batch: user.batch,
                year: user.year,
                pic: user.pic,
                dob: user.DOB
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.authUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')

        if (user && ((await user.matchPassword(password)))) {
            res.status(201).send({
                success: true,
                name: user.name,
                email: user.email,
                enRoll: user.enRoll,
                fatherName: user.fatherName,
                batch:user.batch,
                pic: user.pic,
                year:user.year,
                category:user.category,
                token: generateToken(user._id),

            })
        }
        else {
            res.status(401);
            throw new Error("Wrong Email or Password");
        }


    } catch (error) {

        res.status(500).send({
            success: false,
            message: error.message,

        })

    }
}


exports.removeUser = async (req, res) => {  
    try {
        const email = req.body.email
        const enRoll = req.body.enRoll
        const result = await User.findOneAndDelete({email:email, enRoll: enRoll})
        if (result) {
            return res.status(201).json({result:result, success:true,message: 'User Removed' })
        } else {
            return res.status(404).json({success:false, message: 'User Not Found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}