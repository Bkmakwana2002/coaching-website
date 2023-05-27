import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import shortid from 'shortid'

const ShowCoursesCategory = () => {
    
        const [courses, setCourses] = useState([]);

        const fetchCourses = async()=>{
            const data = JSON.parse(localStorage.getItem('data'));
            const category = data.result.category;
            const batch = data.result.batch;

            let result = await fetch(process.env.REACT_APP_API_URL+"/api/Courses/fetch-course-with-category",
            {
                method:'post',
                body:JSON.stringify({category, batch}),
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
    <div className='select-none pt-32 lg:grid lg:grid-cols-3 lg:grid-row-3 flex flex-col justify-center items-center'>

        {
            courses.map((item, index)=>(
                <Link key={shortid.generate()} to={item.JEE?'/courses/jee':'/courses/neet'} state={{courseCategory:item.category, user2Arr:item.user2Array, type:"category", courseName:item.title}}>
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

export default ShowCoursesCategory