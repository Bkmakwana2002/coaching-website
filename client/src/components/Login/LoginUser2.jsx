import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../Contexts/LoginContext';

const LoginUser2 = () => {
  
    const {email, setEmail, setUserloggedin} = useContext(LoginContext);
    const[LogInWarning, setLogInWarning] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
  
    const handleUser2Login = async (e)=>{
        e.preventDefault();

      let result = await fetch("http://localhost:5000/api/User2/login/user2",
        {
          method:'post',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({email, password})
        }
      );
      result = await result.json();
  
  
      if(result.success){
        setLogInWarning(""); // no login warning
        setUserloggedin(3); // user2 loggedin 
        navigate('/'); // navigate to home page after successful login
        localStorage.setItem("data", JSON.stringify({result, ...{userloggedin: 3, loggedin:true}})); // save data in localstorage
      }else{
        setLogInWarning(result.message); // show warning for wrong credentials
      }
      
    }
  
    return (
        <section className="h-screen">
            <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <form onSubmit={handleUser2Login}>
                    {/* Email input */}
                    <label htmlFor="warning" className='text-2xl text-red-400'>{LogInWarning}</label>
                    <div className="mb-6">
                    <input type="email" onChange={(event)=>{setEmail(event.target.value)}} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInputEmail" placeholder="Email address" />
                    </div>
                    {/* Password input */}
                    <div className="mb-6">
                    <input type="password" onChange={(event)=>{setPassword(event.target.value)}} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInputPassword" placeholder="Password" />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                    <a href="#!" className="text-gray-800">Forgot password?</a>
                    </div>
                    <div className="text-center lg:text-left">
                    <button type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Login
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </section>
  )
}

export default LoginUser2