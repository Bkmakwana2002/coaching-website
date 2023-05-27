import React, { useCallback, useEffect, useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import shortid from 'shortid'

const DeleteUser = () => {
  const [User, setUser] = useState([])
  const [error, setError] = useState('')

  const [searchQuery, setSearchQuery] = useState('')

  const searchUser = async (e) => {
    e?.preventDefault();

    try {
      console.log(searchQuery)
      const response = await fetch('http://localhost:5000/api/search/users', {
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

  const removeUser= useCallback((e, email, enRoll)=>{
    e.preventDefault();

    // ask for confirmation
    const confirmation = window.confirm('Are you sure you want to delete this user?')
    if(!confirmation){
      return;
    }

    // get data from the database
    fetch(process.env.REACT_APP_API_URL+`/api/User/remove`, {
      method:'delete',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:email, enRoll:enRoll})
    }).then(response=>{
      response.json().then((data)=>{
        if(data.success){
          setError(null);
          window.location.reload(true)
        }else{
          setError(data.message);
        }
        searchUser();
      })
    })
    
  }, [])

  useEffect(()=>{
    // search for all the users on page load
    searchUser();
    //eslint-disable-next-line
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

      <div className='grid lg:grid lg:grid-cols-3 lg:grid-row-3 flex-col justify-center items-center'>
      {
        User.length > 0 ? User.map((user, index) => {
          return (
            <div className="m-4 p-4" key={shortid.generate()}>

                <div className="max-w-xs">
                    <div className="bg-white shadow-xl rounded-lg py-3">
                        <div className="photo-wrapper p-2">
                            <img className="w-32 h-32 rounded-full mx-auto" src={user.pic} alt='student'/>
                        </div>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.name}</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>Student</p>
                            </div>
                            <table className="text-xs my-3">
                                <tbody>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                    <td className="px-2 py-2">{user.email}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                    <td className="px-2 py-2">{user.phone}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Batch</td>
                                    <td className="px-2 py-2">{user.batch}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Category</td>
                                    <td className="px-2 py-2">{user.category}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">Enrollment ID</td>
                                    <td className="px-2 py-2">{user.enRoll}</td>
                                </tr>
                            </tbody></table>

                            <div className="text-center my-3">
                                <button onClick={(e)=>{removeUser(e,user.email, user.enRoll)}} className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium">Remove</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
          )
        }) 
        :
        <div className='p-2 mx-auto border border-black justify-center'>{error}</div>
      }
      </div>


    </div>

  )
}

export default DeleteUser