const Teacher = require('../models/Teacher')
const User = require('../models/User')
const User2 = require('../models/User2')
const Course = require('../models/Course')


exports.findTeachers = async (req, res) => {
    try {
        const key = req.body.key;
        const data = await Teacher.find({ 
            "$or":
            [
                { "name": { "$regex": key, "$options": "i" } },
                { "email": { "$regex": key, "$options": "i" } },
            ]
         }).populate('name').populate('email').populate('phone').populate('_id').populate('subject').populate('pic')
        res.status(201).json({
            data:data,
            success:true
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.findUsers = async (req, res) => {
    try {
        const key = req.body.key;
        console.log(key)
        const data = await User.find({ 
            "$or":
            [
                { "name": { "$regex": key, "$options": "i" } },
                { "email": { "$regex": key, "$options": "i" } },
            ]
         }).populate('name').populate('email').populate('phone').populate('_id').populate('batch').populate('category').populate('enRoll').populate('pic')
        res.status(201).json({
            data:data,
            success:true
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.findUsers2 = async (req, res) => {
    try {
        const key = req.body.key;
        const data = await User2.find({ 
            "$or":
            [
                { "name": { "$regex": key, "$options": "i" } },
                { "email": { "$regex": key, "$options": "i" } },
            ]
         }).populate('name').populate('email').populate('phone').populate('_id').populate('pic')
        res.status(201).json({
            data:data,
            success:true
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


// For finding courses
exports.findCourses = async (req, res) => {
    try {
        const courseName = req.body.courseName;
        const data = await Course.find({ 
            "$or":
            [
                { "title": { "$regex": courseName, "$options": "ig" } },
            ]
         }).populate('title').populate('Fees').populate('user2Array')

        

        res.status(201).json({
            data:data,
            success:true
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}