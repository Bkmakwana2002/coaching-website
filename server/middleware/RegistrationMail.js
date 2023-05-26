const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');


const RegistrationMailer = async (senderEmail,  password)=>{
    console.log(process.env.EMAIL_HOST_NAME);
    try{
        const transporter = nodemailer.createTransport({
            service:process.env.EMAIL_SERVICE_NAME,
            auth:{
                user: process.env.ORGANIZATION_EMAIL,
                pass:process.env.ORGANIZATION_GMAIL_SECRET_KEY
            },
            secure:true,
            host:process.env.EMAIL_HOST_NAME,
            port: 465

        })

        const mailInfo = await transporter.sendMail({
            from:process.env.ORGANIZATION_EMAIL,
            to:senderEmail,
            subject:'Your credentials for vulture institute website',
            text:'This is the mail for sending password',
            html:`<p>Hey, Welcome to Vulture Institute,Your Email for login is <h1>${senderEmail}</h1> </br> Your password is </br> <h1>${password}</h1></br>Do not share this with anyone. </br>We hope you'll enjoy joining us.</p>`
        })


    }catch(err){
        console.log(err)
    }
}


const EmailVerificationToken = async(senderEmail, id)=>{
    try{
        const transporter = nodemailer.createTransport({
            service:process.env.EMAIL_SERVICE_NAME,
            auth:{
                user: process.env.ORGANIZATION_EMAIL,
                pass:process.env.ORGANIZATION_GMAIL_SECRET_KEY
            },
            secure:true,
            host:process.env.EMAIL_HOST_NAME,
            port: 465

        })

        const verificationToken = jwt.sign(
        {
            data:'Token Data'
        },
        process.env.EMAIL_VERIFICATION_TOKEN,
        {
            expiresIn:'10m'
        } 
        );

        const mailInfo = await transporter.sendMail({
            from:process.env.ORGANIZATION_EMAIL,
            to:senderEmail,
            subject:'Verification for vulture institute account',
            text:'This is the mail for sending password',
            html:`<p>Hey, Welcome to Vulture Institute, Please visit this url to complete your verification process. ${process.env.BACKEND_URL}api/User2/verify/${id}/${verificationToken}
            <br/>
            Thanks
            </p>`
        })
    }
    catch(err){
        console.log("SOMETHING WENT WRONG");
    }
}


module.exports = {RegistrationMailer, EmailVerificationToken};