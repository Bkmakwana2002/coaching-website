import React, { useEffect, useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes, FaHome } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { IoMdPhotos } from "react-icons/io";
import { MdContactPage } from "react-icons/md";
import {AiOutlinePlayCircle, AiOutlineEye} from 'react-icons/ai'
import { BsFillFilePersonFill, BsFillPersonFill, BsGraphUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiInformationCircle } from 'react-icons/hi'
import { LoginContext } from "../Contexts/LoginContext";


const NavbarFaculty = () => {

  // Get email from Login-Context
  const {userloggedin,setUserloggedin, email} = useContext(LoginContext);
  let [open, setOpen] = useState(false);

    // initially keep the side bar closed
  useEffect(() => {
    setOpen(false);
  }, []);


  const handleLogoutBtn = async () =>{
    setOpen(!open);
    if(userloggedin===2){
      setUserloggedin(-1);
      localStorage.removeItem("data");
    }
  }


  return (
     <div className="shadow-md w-full sticky top-0 left-0 z-20 mb-4">
       <div className="md:flex items-center justify-between bg-gray-900 py-2 md:px-10">
         <div
           className="w-full font-medium text-4xl md:text-4xl select-none flex items-center text-white font-inter font-signature"
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
            <div className="hidden lg:flex lg:relative">
              <Link to="/profile/faculty"><BsFillPersonFill/></Link>
            </div>
         </div>
       </div>



      {/* -----------------SIDE BAR--------------------- */}
             
       <div className={`transition ease-in-out delay-150 z-40 fixed mr-4 w-64 ${ open ? "translate-x-0" : "-translate-x-full"}`}>
         <aside
           className={`relative h-screen ease-in-out duration-1000`}
           aria-label="Sidebar"
         >
          
           <div className={`overflow-y-auto h-screen py-4 px-3 bg-gray-50 dark:bg-blue-500 `}>
             <ul className="space-y-4">

              {/* Home */}
              <li>
                 <Link to='/' onClick={()=>{setOpen(!open)}}>
                 <div
                   className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                 >
                   <FaHome />
                   <span className="flex-1 text-xl whitespace-nowrap">
                     {open ? "Home" : ""}
                   </span>
                 </div>
                 </Link>
               </li>
               {/* Profile */}
              <li>
                <Link to='/profile/faculty' onClick={()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <BsFillPersonFill />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Profile" : ""}
                  </span>
                </div>
                </Link>
              </li>
              
               {/* Gallery */}
               <li>
                 <Link to="/gallery" onClick={()=>{setOpen(!open)}}>
                 <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <IoMdPhotos />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Gallery" : ""}
                  </span>
                </div>
                </Link>
              </li>

              {/* Watch Video */}
              <li>
                <Link to="/faculty/courses" onClick={()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <AiOutlinePlayCircle />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Courses" : ""}
                  </span>
                </div>
                </Link>
              </li>

              {/* Tests */}
              {/* <li>
                <Link to={`/faculty/test`} onClick={()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <AiOutlineEye />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Tests" : ""}
                  </span>
                </div>
                </Link>
              </li> */}

              {/* Tests Analysis */}
              {/* <li>
                <Link to={`/faculty/analysis`} onClick={()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <BsGraphUp />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Test Analysis" : ""}
                  </span>
                </div>
                </Link>
              </li> */}

              {/* Admission */}
              <li>
                <Link to="/admission" onClick={()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <BsFillFilePersonFill />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Admission" : ""}
                  </span>
                </div>
                </Link>
              </li>

              {/* Login - Logout */}
              <li>
                {/* Check for logged in */}
                {userloggedin===2 ? 
                // if not logged in
                <Link to="/" onClick={handleLogoutBtn}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <FiLogIn />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Logout" : ""}
                  </span>
                </div>
                </Link>
                : 
                // if not logged in already
                <Link to = "/login" onClick = {()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <FiLogIn />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "Login" : ""}
                  </span>
                </div>
                </Link>
                }
                
                
              </li>

              {/* About Us */}
              <li>
                <Link to="/about" onClick={()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <HiInformationCircle />
                  <span className="flex-1 text-xl whitespace-nowrap">
                    {open ? "About Us" : ""}
                  </span>
                </div>
                </Link>
              </li>

              {/* Contact Us */}
              <li>
                <Link to="/contact" onClick={()=>{setOpen(!open)}}>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 h-10"
                >
                  <MdContactPage />
                  <span className="flex-1 text-xl whitespace-nowrap">
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

export default NavbarFaculty;
