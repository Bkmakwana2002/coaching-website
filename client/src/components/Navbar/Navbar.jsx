import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom";

const Navbar = () => {

  let Links = [
    { name: "Home", l: "/" },
    //{ name: "Courses", l: "/Courses"},
    //{ name: "SEAT/VSAT", l: "contact"},
    //{ name: "Payments", l: "contact"},
    //{ name: "Our Centers", l: "contact"},
    { name: "About Us", l: "/about"},
    //{ name: "Gallery", l: "contact"},
    { name: "Contact Us", l: "contact"},
    { name: "Login", l: "/login"},

  ];
  let [open, setOpen] = useState(false);

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-20'>
      <div className='md:flex items-center justify-between bg-gray-500 py-4 md:px-10 px-7'>
        <div className='font-bold text-4xl md:text-4xl select-none flex items-center 
       text-white font-signature'>
          <Link to='/'>Vulture Institute</Link>
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer lg:hidden'>
          {open ? <FaTimes className='text-white' /> : <GiHamburgerMenu name={open ? 'close' : 'menu'} className='text-white' />}
        </div>

        <ul className={`lg:flex lg:items-center lg:pb-0 absolute lg:static bg-gray-500 lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-1000px]'}`}>
          {
            Links.map((link) => (
              <li key={link.name} className='lg:ml-8 text-xl mx-auto lg:my-0 my-7'>
                <Link to={link.l} onClick={()=>{setOpen(!open)}} smooth duration={500} spy={true} className='text-2xl text-center hover:border-b-2 hover:border-yellow-200 text-white hover:text-yellow-200 duration-300'>{link.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar