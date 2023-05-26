const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv');
const connectDB = require('./db')
const SuperUserRoutes = require('./routes/SuperUserRoutes')
const UserRoutes = require('./routes//userRoutes')
const MessageMailRoutes = require('./routes/MessageMailRoutes')
const teachRoutes = require('./routes/TeachRoutes')
const fetchVideos = require('./routes/FetchVideos')
const authRoutes= require('./routes/authRoutes')
const testRoutes = require('./routes/TestRoutes')
const imageRoutes = require('./routes/imageRoutes');
const User2Routes = require('./routes/User2')
const Courses = require('./routes/Courses')
const payment = require('./routes/Payment')
const searchRoutes = require('./routes/searchRoutes')
const app = express()

// env file configuration setup
dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(express.json())
app.use(cors())
connectDB()

console.log(process.env.BACKEND_URL)

const PORT = 5000

app.use('/api/SuperUser',SuperUserRoutes)

app.use('/api/User',UserRoutes)

app.use('/api/User2',User2Routes)

app.use('/api/Courses',Courses)

app.use('/api/Teach',teachRoutes)

app.use('/api/visitor',MessageMailRoutes);

app.use('/api/fetchVideos',fetchVideos)

app.use('/api/auth', authRoutes);

app.use('/api/test',testRoutes)

app.use('/api/images',imageRoutes)

app.use('/api/payment',payment)

app.use('/api/search',searchRoutes)


app.listen(PORT, console.log(`running`, PORT))