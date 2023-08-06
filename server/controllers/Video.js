const Video = require('../models/Video');
const Course = require('../models/Course')

exports.AddVideo = async (req, res) => {
    try {

        const { title, email, subject, teacher, chapter, JEE, NEET, category, Date, vidurl, lecture, courseName } = req.body;
        
        // const chapter = chapterNum;
        let video = await Video.create({
            title,
            subject,
            Date,
            teacher,
            chapter,
            JEE,
            NEET,
            category,
            vidurl,
            lecture,
            email,
            courseName
        })
        // course.VideoAdded.push(teacher)
        // await course.save()
        // await Course.findOneAndUpdate(
        //     { courseName: courseName },
        //     { $push: { VideoAdded: teacher } },
        //     { new: true }
        // );

        const course = await Course.findOne({ courseName: courseName });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }
        course.VideoAdded.push(email);
        await course.save()
        console.log("HELLO")
        res.status(201).json(video)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.FetchVideosFaculty = async (req, res) => {
    try {
        const email = req.body.email;
        const courseName = req.body.courseName;
        const subject = req.body.subject;
        if (email&&courseName&&subject) {
            const data = await Video.find({ "email": email, courseName:courseName, subject: subject }).populate('title').populate('vidurl').populate('chapter').populate('lecture').populate('pic')
            console.log(data);
            res.status(200).json(data)
        } else {
            res.status(201).json({ success: false })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

// for normal coaching user
exports.fetchVideo = async (req, res) => {
    try {
        const batch = req.body.batch
        const subject = req.body.subject
        const category = req.body.category
        const courseName = req.body.courseName

        const data = await Video.find({"courseName": courseName, [batch]: true, "subject": subject, "category": category }).populate('title').populate('vidurl').populate('email').populate('chapter').populate('lecture').populate('pic')
        
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

// for user2
exports.fetchVideoWithCourseName = async (req, res) => {
    try {
        const courseName = req.body.courseName
        const subject = req.body.subject;
        const data = await Video.find({'subject':subject,  'courseName': courseName }).populate('title').populate('vidurl').populate('chapter').populate('lecture').populate('pic')
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.removeVideoByURL = async (req, res) => {
    try {
        const vidurl = req.body.vidurl;
        // console.log(req.body)
        const data = await Video.findOneAndDelete({ "vidurl": vidurl })
        console.log(data)
        if(data){
            res.status(200).json({success:true, data})
        }else[
            res.status(404).json({success:false, message:"No such video found"})
        ]

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}