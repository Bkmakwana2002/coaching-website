import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes, FaBookReader, FaHome } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { IoMdPhotos } from "react-icons/io";
import { MdContactPage } from "react-icons/md";
import { BsFillFilePersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiInformationCircle } from 'react-icons/hi';
import { LoginContext } from "../Contexts/LoginContext";


const Navbar = () => {

  let [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);


  return (
     <div className="shadow-md w-full sticky z-20 top-0 left-0 mb-8">
       <div className="md:flex items-center justify-between bg-gray-900 py-2 md:px-10">
         <div
           className="w-full font-medium text-4xl md:text-4xl select-none flex flex-row items-center text-white font-inter font-signature"
         >

           <button
             className="border ml-4 border-black"
             onClick={() => {
               setOpen(!open);
              }}
           > 
             {open ? <FaTimes /> : <GiHamburgerMenu />}
            </button>

            <img src="../images/logo.jpeg" className="mx-4 w-12 h-12" />

            <div className="w-full text-left">
            <Link to="/"> Vulture Institute</Link>
            </div>

         </div>
       </div>

      {/* -----------------SIDE BAR--------------------- */}
              
       <div className={`transition ease-in-out delay-150 z-40 fixed mr-4 w-64 ${ open ? "translate-x-0" : "-translate-x-full"}`}>
         <aside
           class={`relative h-screen ease-in-out duration-1000`}
           aria-label="Sidebar"
         >
          
           <div class={`overflow-y-auto h-screen py-4 px-3 bg-gray-50 dark:bg-blue-500`}>
             <ul class="space-y-4">

              {/* Home */}
              <li>
                 <Link to='/' onClick={()=>{setOpen(!open)}}>
                 <div
                   class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                 >
                   <FaHome />
                   <span class="flex-1 text-2xl whitespace-nowrap">
                     {open ? "Home" : ""}
                   </span>
                 </div>
                 </Link>
               </li>
              {/* Courses */}
               <li>
                 <Link to='/Courses' onClick={()=>{setOpen(!open)}}>
                 <div
                   class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                 >
                   <FaBookReader />
                   <span class="flex-1 text-2xl whitespace-nowrap">
                     {open ? "Courses" : ""}
                   </span>
                 </div>
                 </Link>
               </li>
               {/* Gallery */}
               <li>
                 <Link to="/gallery" onClick={()=>{setOpen(!open)}}>
                 <div
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <IoMdPhotos />
                  <span class="flex-1 text-2xl whitespace-nowrap">
                    {open ? "Gallery" : ""}
                  </span>
                </div>
                </Link>
              </li>
              {/* Admission */}
              <li>
                <Link to="/admission" onClick={()=>{setOpen(!open)}}>
                <div
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <BsFillFilePersonFill />
                  <span class="flex-1 text-2xl whitespace-nowrap">
                    {open ? "Admission" : ""}
                  </span>
                </div>
                </Link>
              </li>
              {/* Login - Logout */}
              <li>
                {/* // if not logged in already */}
                <Link to = "/login" onClick = {()=>{setOpen(!open)}}>
                <div
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <FiLogIn />
                  <span class="flex-1 text-2xl whitespace-nowrap">
                    {open ? "Login" : ""}
                  </span>
                </div>
                </Link>
                
                
              </li> 

              {/* Register - Logout */}
              <li>
                {/* // if not logged in already */}
                <Link to = "/register" onClick = {()=>{setOpen(!open)}}>
                <div
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <FiLogIn />
                  <span class="flex-1 text-2xl whitespace-nowrap">
                    {open ? "Register" : ""}
                  </span>
                </div>
                </Link>
              </li> 



              {/* About Us */}
              <li>
                <Link to="/about" onClick={()=>{setOpen(!open)}}>
                <div
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <HiInformationCircle />
                  <span class="flex-1 text-2xl whitespace-nowrap">
                    {open ? "About Us" : ""}
                  </span>
                </div>
                </Link>
              </li>
              {/* Contact Us */}
              <li>
                <Link to="/contact" onClick={()=>{setOpen(!open)}}>
                <div
                  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <MdContactPage />
                  <span class="flex-1 text-2xl whitespace-nowrap">
                    {open ? "Contact Us" : ""}
                  </span>
                </div>
                </Link>
              </li>
              
            </ul>
          </div>
        </aside>
      </div>


     </div>

  );
};

export default Navbar;
