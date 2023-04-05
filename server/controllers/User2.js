const generateToken = require('../generateToken')
const User2 = require('../models/User2')
const Course = require('../models/Course')

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password, phone, pic, DOB } = req.body

        let user = await User2.findOne({ email })
        if (user) {
            return res.status(404).send({ success: false, message: 'User already exists' })
        }

        user = await User2.create({
            name,
            email,
            password,
            phone,
            pic,
            DOB,
        })
        const token = await generateToken(user._id)
        if (res.status(201)) {
            // Sending Mail
            res.send({
                success:true,
                _id: user._id,
                name: user.name,
                email: user.email,
                year: user.year,
                pic: user.pic,
                dob: user.DOB,
                token: token,
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
        const user = await User2.findOne({ email }).select('+password')

        if (user && ((await user.matchPassword(password)))) {
            res.status(201).send({
                success: true,
                name: user.name,
                email: user.email,
                pic: user.pic,
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

exports.enrollCourse = async (req, res) => {
    try {
       const email = req.body.email
       const coursName = req.body.coursName
       const doc = await Course.findOne({ 'coursName': coursName })
       doc.user2Array.push(email)
       const doc2 = await doc.save()
       res.status(201).json(doc2)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,

        })
    }
}

exports.removeUser2 = async (req, res) => {  
    try {
        const email = req.body.email
        const result = await User2.findOneAndDelete({email:email})
        if (result) {
            return res.status(201).json({result:result, success:true,message: 'User Removed' })
        } else {
            return res.status(404).send({success:false, message: 'User Not Found' })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}