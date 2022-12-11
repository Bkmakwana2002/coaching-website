import React from 'react'
import { Link } from 'react-router-dom'
import student from './images/student.jpg'
import admin from './images/admin.jpg'
import teacher from './images/teacher.jpg'
import { useState } from 'react'

const LoginCheck = () => {

  const [loginState, setloginState] = useState(null)

  const handleState = (v)=>{
    setloginState(v);
    // console.log(loginState)
  }

  return (
    <section className="text-black md:pt-12 lg:pt-12 bg-gray-100 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
              <img className="lg:h-48 md:h-36 w-full object-center" src={student} alt="blog"/>
              <div className="p-6 space-y-10">
                <h2 className="tracking-widest text-4xl title-font font-medium text-black mb-1">Are you a Student ?</h2>
                <div className="flex items-center flex-wrap justify-center">
                  <Link to='/login/student' onClick={()=>handleState(0)} className="hover:cursor-pointer hover:text-white hover:bg-blue-900 duration-300 rounded-md p-2 text-blue-900 inline-flex items-center md:mb-2 lg:mb-0 text-2xl">Login
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
              <img className="lg:h-48 md:h-36 w-full  object-center" src={teacher} alt="blog"/>
              <div className="p-6 space-y-10">
                <h2 className="tracking-widest text-4xl title-font font-medium text-black mb-1">Are you a Teacher ?</h2>
                <div className="flex items-center flex-wrap justify-center">
                  <Link to='/login/teacher'  onClick={()=>handleState(1)}   className="hover:cursor-pointer hover:text-white hover:bg-blue-900 duration-300 rounded-md p-2 text-blue-900 inline-flex items-center md:mb-2 lg:mb-0 text-2xl">Login
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
              <img className="lg:h-48 md:h-36 w-full object-center" src={admin} alt="blog"/>
              <div className="p-6 space-y-10">
                <h2 className="tracking-widest text-4xl title-font font-medium text-black mb-1">Are you a Administrator ?</h2>
                <div className="flex items-center flex-wrap justify-center">
                  <Link to='/login/admin'  onClick={()=>handleState(2)}  className="hover:cursor-pointer hover:text-white hover:bg-blue-900 duration-300 rounded-md p-2 text-blue-900 inline-flex items-center md:mb-2 lg:mb-0 text-2xl">Login
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  )
}

export default LoginCheck