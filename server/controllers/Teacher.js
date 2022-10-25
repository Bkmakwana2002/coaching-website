const generateToken = require('../generateToken')
const Teacher = require('../models/Teacher')

exports.registerTeacher = async (req, res) => {
    try {

        const { name, email, password, phone, tCode, pic, DOB,subject } = req.body

        let teach = await Teacher.findOne({ email })
        if (teach) {
            return res.status(404).send({ success: false, message: 'teacher already exists' })
        }

        teach = await Teacher.create({
            name,
            email,
            password,
            phone,
            subject,
            pic,
            DOB,
            tCode
        })

        res.status(201).send({
            success: true,
            _id: teach._id,
            name: teach.name,
            email: teach.email,
            role: teach.role,
            enRoll: teach.enRoll,
            batch: teach.batch,
            year: teach.year,
            pic: teach.pic,
            DOB: teach.DOB
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.authTeacher = async (req, res) => {
    try {

        const { email, password } = req.body
        const teach = await Teacher.findOne({ email }).select('+password')

        if (teach && ((await teach.matchPassword(password)))) {
            res.status(201).send({
                success: teach,
                name: teach.name,
                email: teach.email,
                enRoll: teach.enRoll,
                fatherName: teach.fatherName,
                pic: teach.pic,
                token: generateToken(teach._id),

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
