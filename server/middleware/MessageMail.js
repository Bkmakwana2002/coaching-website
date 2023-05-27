const nodemailer = require('nodemailer');

exports.MessageMailer = async (req, res)=>{

    try{
        const {name, senderEmail, phone, visitorMessage } = req.body;

        const transporter = nodemailer.createTransport({
            service:process.env.EMAIL_SERVICE_NAME,
            auth:{
                user: process.env.ORGANIZATION_EMAIL,
                pass:process.env.ORGANIZATION_GMAIL_SECRET_KEY // to be hashed or done something with it to secure it
            },
            secure:true,
            host:process.env.EMAIL_HOST_NAME,
            port: 465

        })

        const mailInfo = await transporter.sendMail({
            from:process.env.ORGANIZATION_EMAIL,
            to:process.env.ORGANIZATION_EMAIL,
            subject:`New Message from ${senderEmail}, Website Visitor`,
            text:'This is the mail from contact page',
            html:`<p>Message from user: <h1>${name}</h1> </br> Email: <h1>${senderEmail}</h1> </br> Phone: <h1>${phone}</h1> </br> Message: <h2>${visitorMessage}</h2></p>`
        })
        
        if(res.status(201)){
            res.send({
                success:true
            })
        }else{
            res.send({
                success:false
            })
        }

    }catch(err){
        res.status(500).send({
            success:false,
            message: err.message
        })
    }
}