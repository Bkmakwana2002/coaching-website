const Razorpay = require('razorpay')
const crypto = require('crypto')
const Payment = require('../models/Payment')
const Course = require('../models/Course')

const instance = new Razorpay({
    key_id: "rzp_test_mQT2hOwfgh1POz",
    key_secret: "knSoRjBjP7kvytO2hxPqwosk"
});


exports.checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        console.log(order)
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, User2, courseName } = req.body;
        const body = (razorpay_order_id + "|" + razorpay_payment_id);

        const expectedSignature = crypto
            .createHmac("sha256", "knSoRjBjP7kvytO2hxPqwosk")
            .update(body.toString())
            .digest("hex");
    
        const value = await Payment.find({ 'razorpay_order_id' : razorpay_order_id })
        if(!value)
        {
            return res.status(400).json({msg:"Same rzpID"})
        }
        const isAuthentic = (expectedSignature === razorpay_signature);

        if (isAuthentic) {

            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });
            
            const courseItem = await Course.find({ 'title': courseName })
            console.log("courseItem ",courseItem);
            if(!courseItem || !courseItem[0]){
                res.status(200).json({success:false});
            }
            console.log("USER 2 ", User2);
            courseItem[0].user2Array.push(User2);
            await courseItem[0].save();

            // res.redirect(
            //     `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
            // );
            res.status(200).json({success: true}, expectedSignature,razorpay_order_id, razorpay_payment_id, razorpay_signature, User2, courseName,
                isAuthentic)
        } else {
            res.status(400).json({
               razorpay_signature, expectedSignature
            });
        }
    } catch (error) {
        console.log("HELLO, ERROR")
        res.status(500).send(error.message)
        console.log(error.message)
    }
}

exports.getKey = (req, res) => {
    res.status(200).json({ key: "rzp_test_mQT2hOwfgh1POz" })
}

