import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import shortid from 'shortid'

const ShowCourses = () => {
    
        const [courses, setCourses] = useState([]);

        const fetchCourses = async()=>{
            let result = await fetch("http://localhost:5000/api/Courses/fetch-course",
            {
                method:'get',
                headers:{
                    'Content-Type':"application/json"
                }
            })
            result = await result.json()
            setCourses([...result])
            console.log(result)
        }
        useEffect(()=>{
            fetchCourses()
        }, [])
    
    return (
    <div className='select-none lg:grid lg:grid-cols-3 lg:grid-row-3 flex flex-col justify-center items-center'>

        {
            courses.map((item, index)=>(
                <Link key={shortid.generate()} to={item.JEE?'/faculty/courses/jee':'/faculty/courses/neet'} state={{courseName: item.title, type:"faculty", courseCategory: item.category}}>
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
        

        {/* Add Course Card Always Visible */}

        <Link to="/addcourse">
            {/* Add Course Card */}
            <div className="max-w-sm m-4 p-4 hover:bg-blue-400 active:bg-[#5F9DF7] rounded overflow-hidden shadow-lg bg-[#5F9DF7]">
                <div className = "px-6 py-4 mx-auto flex justify-center items-center">
                    <AiOutlinePlus className='text-9xl'/>
                </div>
            </div>
        </Link>

    </div>
  )
}

export default ShowCourses