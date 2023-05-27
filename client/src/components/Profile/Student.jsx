import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Student = () => {
  
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
    }, [])



    return (
    <div className='pt-32'>
        <div className='py-12 rounded h-fit  mx-auto'>
            <img src={userinfo.userpic} alt="" className='w-48 h-48 object-cover rounded-full mx-auto m-2 '/>
            <p className='text-2xl text-black font-inter'>
            {userinfo.name}
            </p> 
            <p className='bg-blue-300 w-fit mx-auto p-2 rounded'>
            {userinfo.batch} Student
            </p>
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