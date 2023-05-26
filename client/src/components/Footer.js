import React from 'react'
import { Link } from 'react-router-dom';
import { GoLocation } from 'react-icons/go'
import { AiOutlinePhone } from 'react-icons/ai'

function Footer() {

    
return(
  <footer className="text-gray-400 bg-gray-900 body-font mt-7">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">BUSINESS</h2>
          <nav className="list-none mb-10 space-y-3">
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />For Schools &amp; Institute (Distance Learning)
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />State Representative
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />For Franchise / School Integrated Program
            </li>
          </nav>
        </div>
        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">ABOUT US</h2>
          <nav className="list-none mb-10 space-y-2">
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Welcome
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />From Director's Desk
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />About Vibrant Academy
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Team Vulture
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Indian Institute of Technology
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />FAQ
            </li>
          </nav>
        </div>
        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">PHOTO GALLERY</h2>
          <nav className="list-none mb-10 space-y-3">
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />First Link
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Second Link
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Third Link
            </li>
          </nav>
        </div>
        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CAREER</h2>
          <nav className="list-none mb-10 space-y-3">
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Teaching Positions
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Non Teaching Positions
            </li>
            <li>
              <link to="/" className="text-gray-400 hover:text-white" />Certified Teacher Training Program
            </li>
          </nav>
        </div>
        <div className="lg:w-1/6 md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">CONTACT US</h2>
          <nav className="list-none mb-10 space-y-3">
            <li className="flex space-x-4 justify-center items-center align-middle">
              <golocation size="{48}" className="text-yellow-300">
                <link to="/" className="text-gray-400 hover:text-white" />Oppsite Panchayat Bhawan,
                Verma tower, Shiv Colony Mahendergarh Road Narnaul, Haryana
              </golocation></li>
            <li className="flex space-x-2 justify-center items-center align-middle">
              <AiOutlinePhone  className="text-3xl text-red-300"/>
                <Link to="/" className="text-gray-400 hover:text-white"> 01282-254539, 01282-254540 </Link>
            </li>
          </nav>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800">
      <div className="container px-5 py-8 flex flex-wrap mx-auto items-center">
        <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
          <link to="/" className="text-gray-400" />
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
          <link to="/" className="ml-3 text-gray-400" />
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
          <link to="/" className="ml-3 text-gray-400" />
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
          </svg>
          <link to="/" className="ml-3 text-gray-400" />
          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx={4} cy={4} r={2} stroke="none" />
          </svg>
        </span>
      </div>
    </div>
    <div className="bg-gray-800 bg-opacity-75">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-400 text-sm text-center sm:text-left">© 2022 Vulture Institute —
          <link to="/" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer" />@sldjvndsj
        </p>
      </div>
    </div>
</footer>
  )
}

export default Footer;