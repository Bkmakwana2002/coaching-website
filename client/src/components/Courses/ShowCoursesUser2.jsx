import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import shortid from 'shortid'

const ShowCoursesUser2 = () => {

        const [courses, setCourses] = useState([]);
        
        const fetchCourses = async()=>{
            const email = JSON.parse(localStorage.getItem('data')).result.email;
            
            let result = await fetch(process.env.REACT_APP_API_URL+"/api/Courses/fetch-course-with-user2",
            {
                method:'post',
                body:JSON.stringify({email}),
                headers:{
                    'Content-Type':"application/json"
                }
            })

            result = await result.json()
            console.log(result)
            setCourses([...result])
        }

        useEffect(()=>{
            fetchCourses()
        }, [])
    
    return (
    <div className='select-none pt-32 lg:grid lg:grid-cols-3 lg:grid-row-3 flex flex-col justify-center items-center'>

        {
            courses.map((item, index)=>(
                <Link key={shortid.generate()} to={item.JEE?'/courses/jee':'/courses/neet'} state={{courseCategory:item.category, user2Arr:item.user2Array, courseID: item._id, type:"user2", courseName:item.title}}>
                    {/* Course Card */}
                    <div key={index} className="max-w-sm w-full m-4 p-4 hover:bg-blue-400 active:bg-[#5F9DF7] rounded overflow-hidden shadow-lg bg-[#5F9DF7]">
                        <div className = "px-6 py-4">
                            <div className = "font-bold text-xl mb-2">{item.title}</div>
                           
                            {
                                item.JEE?(
                                <p className = "bg-gray-200 rounded my-2 py-2 text-gray-700 text-sm">
                                    JEE
                                </p>
                                ):null
                            }
                            {
                                item.NEET?(
                                <p className = "bg-gray-200 rounded my-2 py-2 text-gray-700 text-sm">
                                    NEET
                                </p>
                                ):null
                            }
                            <p className = "bg-gray-200 rounded my-2 py-2 text-gray-700 text-sm">
                                Uploaded at: 
                                {new Date(item.Date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
                            </p>
                        </div>
                    </div>
                </Link>
            ))
        }
        

    </div>
  )
}

export default ShowCoursesUser2