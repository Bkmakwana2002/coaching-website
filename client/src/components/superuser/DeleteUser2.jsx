import React, { useEffect, useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

const DeleteUser2 = () => {
  const [User, setUser] = useState([])
  const [error, setError] = useState('')

  const [searchQuery, setSearchQuery] = useState('')

  const searchUser = async (e) => {
    e?.preventDefault();

    try {
      console.log(searchQuery)
      const response = await fetch('http://localhost:5000/api/search/users2', {
        method: 'post',
        body: JSON.stringify({key:searchQuery}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      console.log(data)
      if(data?.success){
        if(data.data.length>0){
          setUser(data.data);
        }else{
          setUser([]);
          setError('No User Found')
        }
      }else{
        setUser([]);
        if(data?.message==="empty"){
          setError('Empty Search Query')
          return;
        }
        if(data?.data==="" || data?.data===undefined || data?.data===null || data?.data.length===0){
          setError('No User Found')
          // console.log("YES")
          return;
        }
      }
    } catch (e) {
      setUser([]);
      if(e.message==="empty"){
        setError('Empty Search Query')
      }else{
        setError('No User Found')
      }
    }
  }

  useEffect(()=>{
    searchUser();
  }, [])


  return (
    <div className='z-40 justify-center'>

      <form onSubmit={searchUser} className='bg-gray-200 w-full mx-auto rounded py-2'>
        <div className='flex flex-row justify-between items-center p-2'>
          <label className='text-2xl text-black dark:text-white font-inter' htmlFor="search">Search Name or Email</label>
          <input onChange={(e)=>{setSearchQuery(e.target.value)}} className='p-2 m-2 rounded w-1/2 mx-auto border border-orange-black shadow-md' type="text" name="searchQuery" id="searchQuery" />
          <button className='p-2 bg-blue-300 mx-auto rounded shadow-lg active:shadow-none' type="submit"><AiOutlineSearch className='text-2xl'/></button>
        </div>
      </form>

      <div className='grid lg:grid lg:grid-cols-3 lg:grid-row-3 flex-col justify-center items-center '>
      {
        User.length > 0 ? User.map((user) => {
          return (
            <div class="m-4 p-2">

                <div class="max-w-xs">
                    <div class="bg-white shadow-xl rounded-lg py-3">
                        <div class="photo-wrapper p-2">
                            <img class="w-32 h-32 rounded-full mx-auto" src={user.pic} alt='student'/>
                        </div>
                        <div class="p-2">
                            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{user.name}</h3>
                            <div class="text-center text-gray-400 text-xs font-semibold">
                                <p>Student</p>
                            </div>
                            <table class="text-xs my-3">
                                <tbody>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                    <td class="px-2 py-2">{user.email}</td>
                                </tr>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                    <td class="px-2 py-2">{user.phone}</td>
                                </tr>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Batch</td>
                                    <td class="px-2 py-2">{user.batch}</td>
                                </tr>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Category</td>
                                    <td class="px-2 py-2">{user.category}</td>
                                </tr>
                                <tr>
                                    <td class="px-2 py-2 text-gray-500 font-semibold">Enrollment ID</td>
                                    <td class="px-2 py-2">{user.enRoll}</td>
                                </tr>
                            </tbody></table>

                            <div class="text-center my-3">
                                <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
          )
        }
        ) : <div>{error}</div>
      }
      </div>


    </div>

  )
}

export default DeleteUser2