const Video = require('../models/Video');
const Course = require('../models/Course')

exports.AddVideo = async (req, res) => {
    try {

        const { title, email, subject, teacher, chapter, JEE, NEET, category, date, vidurl, lecture, courseName } = req.body;
        
        // const chapter = chapterNum;
        let video = await Video.create({
            title,
            subject,
            date,
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

        const course = await Course.findOne({ 'title': courseName })
        
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

        // getting current date and time;
        const currentdate = new Date(); 
        const datetime = currentdate.getDate() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();

        const message = email + ' added video, titled ' + title + ' on ' + datetime;

        // pushing message to array
        course.VideoAdded.push(message);
        await course.save();
        res.status(201).json(video);

    } catch (error) {
        console.log("HEY error", error);
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
        console.log("data ",data)

        if(data){ // video deleted
            try{
                const courseName = data?.courseName;
                const title = data?.title;
                const email = data?.email;
                const course = await Course.findOne({ 'title': courseName })
                
                if (!course) {
                    console.log("HEYYY");
                    return res.status(404).json({ success: false, message: 'Course not found.' });
                }
                
                // getting current date and time;
                const currentdate = new Date(); 
                const datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                
                
                const message = email + ' deleted video, titled ' + title + ' on ' + datetime;
                
                // pushing message to array
                course.VideoDelete.push(message);
                await course.save();

            }catch(err){
                console.log("error ", err);
                return res.status(500).json({success:false, message:err.message})
            }

            return res.status(200).json({success:true, data})
        }else{
            return res.status(404).json({success:false, message:"No such video found"})
        }

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}