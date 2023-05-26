import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Faculty = () => {

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
            
        }
        findData();
    }, [])




  return (
    <div className='pt-32'>
        <div className='py-12 rounded h-fit  mx-auto'>
            <img src={userinfo.userpic} alt="" className='w-48 h-48 object-cover rounded-full mx-auto m-2 '/>
            <p className='text-2xl text-black font-inter'>
            {userinfo.name}
            </p> 
            <p className='bg-blue-300 w-fit mx-auto p-2 rounded'>
            Faculty
            </p>
            <p>
                Email: {userinfo.email}
            </p>
            <br />

        </div>
    </div>
  )
}

export default Faculty