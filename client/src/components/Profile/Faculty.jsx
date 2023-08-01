import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { LoginContext } from '../Contexts/LoginContext'

const Faculty = () => {
    
  const {userloggedin,setUserloggedin} = useContext(LoginContext);
    const navigate = useNavigate();
    
    const [userinfo, setuserinfo] =useState({
        name:"Fetching...",
        email:"Fetching...",
        userpic:"Fetching..."
    })

    useEffect(()=>{
        const findData = ()=>{
            let data = localStorage.getItem("data");
            data = JSON.parse(data);
            setuserinfo(existingdata => ({
                ...existingdata,
                name: data.result.name,
                email: data.result.email,
                userpic: data.result.pic
            }))
            // console.log(data.result.email)
            // console.log(userinfo)
            console.log(userinfo)
            
        }
        findData();
    }, []);

    function handleLogout(){
    
        if(userloggedin===2){
            setUserloggedin(-1);
            localStorage.removeItem("data");
            toast.info("Logout Successful");
        }else{
            toast.error("Something went wrong");
        }
        navigate('/');
        
    }




  return (
    <div className='pt-12'>
        <div className='py-12 rounded h-fit  mx-auto'>
            <img src={userinfo.userpic} alt="" className='w-48 h-48 object-cover rounded-full mx-auto m-2 '/>
            <p className='text-2xl text-black font-inter'>
            {userinfo.name}
            </p>
            <div className='flex flex-row justify-center items-center'>
                <p className='bg-blue-300 w-fit mx-2 p-2 rounded'>
                Faculty
                </p>
                <button onClick={handleLogout} className='text-white bg-red-500 w-fit mx-2 p-2 rounded hover:bg-red-600 active:bg-red-500 select-none'>
                Logout
                </button>
            </div> 
            <p>
                Email: {userinfo.email}
            </p>
            <br />

        </div>
    </div>
  )
}

export default Faculty