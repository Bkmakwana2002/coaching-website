const generateToken = require('../generateToken')
const User2 = require('../models/User2')
const Course = require('../models/Course')
const {EmailVerificationToken, RegistrationMailer} = require('../middleware/RegistrationMail');
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password, phone, pic, DOB } = req.body;

        let user = await User2.findOne({ email });
        if (user) {
            return res.status(404).send({ success: false, message: 'User already exists' })
        }

        // send email verification link 
        user = await User2.create({
            name,
            email,
            password,
            phone,
            pic,
            DOB,
        });

        EmailVerificationToken(email, user._id);

        const token = await generateToken(user._id)
        if (res.status(201)) {
            // Sending Mail

            RegistrationMailer(user.email, password);

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
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.EmailVerification = async (req, res)=>{
    
    try{
        const {id,token} = req.params;

        const user = await User2.findById(id);
        if(!user){
            return res.send(`<h1>Invalid Link</h1>`)
        }

        jwt.verify(token, process.env.EMAIL_VERIFICATION_TOKEN, async function(err, decoded){
            if(err){
                console.log(err);
                return res.send(`<h1>Email not verified</h1>`)
            }
            else {
                await User2.findByIdAndUpdate(id, { verified:true});
                return res.send(`<h1>Email verified successfully</h1>`)
            }
        });
    }catch(err){
        res.status(500).json({sucess:false, message:err.message});
        return false;
    }



}

exports.authUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User2.findOne({ email }).select('+password')

        if (user && ((await user.matchPassword(password)))) {
            if(user.verified===true){

                res.status(201).send({
                    success: true,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id),
                    
                })
            }else{
                res.status(401).send({
                    success: false,
                    message: "User is not verified",
                });
            }
        }
        else {
            res.status(401).send({
                success: false,
                message: "Wrong Email or Password"
            });
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

