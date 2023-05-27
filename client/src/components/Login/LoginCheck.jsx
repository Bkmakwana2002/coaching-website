import React from 'react'
import { Link } from 'react-router-dom'
import {FaGraduationCap, FaChalkboardTeacher} from 'react-icons/fa';
import {FcSupport} from 'react-icons/fc';
import { useState } from 'react'

const LoginCheck = () => {


  return (
    <section className="text-black md:pt-2 mt-2 lg:pt-2 bg-gray-100 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 md:w-1/3 lg:w-1/3 w-full">
            <div className="h-full flex flex-col justify-center items-center border-2 border-gray-800 rounded-lg overflow-hidden">
              <FaGraduationCap className="lg:h-32 md:h-32 h-32 w-full object-center" />
              <div className="p-6 space-y-10">
                <h2 className="tracking-widest text-2xl lg:text-4xl title-font font-medium text-black mb-1">Are you a Student ?</h2>
                <div className="flex items-center flex-wrap justify-center">
                  <Link to={'/login/usertype'} className="hover:cursor-pointer hover:text-white hover:bg-blue-900 duration-300 rounded-md p-2 text-blue-900 inline-flex items-center md:mb-2 lg:mb-0 text-2xl">Login
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3 lg:w-1/3 w-full">
            <div className="h-full border-2 flex flex-col justify-center items-center border-gray-800 rounded-lg overflow-hidden">
              <FaChalkboardTeacher className="lg:h-32 md:h-32 h-32 pt-4 w-full object-center"/>
              <div className="p-6 space-y-10">
                <h2 className="tracking-widest text-2xl lg:text-4xl title-font font-medium text-black mb-1">Are you a Teacher ?</h2>
                <div className="flex items-center flex-wrap justify-center">
                  <Link to={'/login/teacher'} className="hover:cursor-pointer hover:text-white hover:bg-blue-900 duration-300 rounded-md p-2 text-blue-900 inline-flex items-center md:mb-2 lg:mb-0 text-2xl">Login
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3 lg:w-1/3 w-full">
            <div className="h-full border-2 flex flex-col justify-center items-center border-gray-800 rounded-lg overflow-hidden">
              <FcSupport className="lg:h-32 md:h-32 w-full h-32 mt-4 object-center"/>
              <div className="p-6 space-y-10">
                <h2 className="tracking-widest text-2xl lg:text-4xl title-font font-medium text-black mb-1">Are you an Administrator ?</h2>
                <div className="flex items-center flex-wrap justify-center">
                  <Link to='/login/admin'  className="hover:cursor-pointer hover:text-white hover:bg-blue-900 duration-300 rounded-md p-2 text-blue-900 inline-flex items-center md:mb-2 lg:mb-0 text-2xl">Login
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