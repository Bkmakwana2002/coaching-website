import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { LoginContext } from '../Contexts/LoginContext'

const Student = () => {
    const {userloggedin,setUserloggedin} = useContext(LoginContext);
    const navigate = useNavigate();
  
    const [userinfo, setuserinfo] =useState({
        name:"Fetching...",
        email:"Fetching...",
        enRoll:"Fetching...",
        fatherName:"Fetching...",
        userpic:"Fetching...",
        batch:"Fetching..."
    })

    useEffect(()=>{
        const findData = ()=>{
            let data = localStorage.getItem("data");
            data = JSON.parse(data);
            setuserinfo(existingdata => ({
                ...existingdata,
                name: data.result.name,
                email: data.result.email,
                enRoll: data.result.enRoll,
                fatherName: data.result.fatherName,
                userpic: data.result.pic,
                batch: data.result.batch
            }))
            console.log(data.result.email)
            console.log("userinfo is ", userinfo)
        }
        findData();
        console.log(userinfo)
    }, []);

    function handleLogout(){
    
        if(userloggedin===1 || userloggedin==3){
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
                {userinfo?.batch} Student
                </p>
                <button onClick={handleLogout} className='text-white bg-red-500 w-fit mx-2 p-2 rounded hover:bg-red-600 active:bg-red-500 select-none'>
                Logout
                </button>
            </div> 
            <p>
                Email: {userinfo.email}
            </p>
                {
                    userinfo.enRoll ?
                    <p>
                    Enrollment Number: {userinfo.enRoll}
                    </p>
                    :
                    null
                }
            <br />

        </div>
    </div>
  )
}

export default Student