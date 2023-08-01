import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../Contexts/LoginContext';

function LoginSuperUser() {

  // v1v2v3v4v5v6v7v8v9v10

  const {email, setEmail, setUserloggedin} = useContext(LoginContext);
  const[LogInWarning, setLogInWarning] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async() => {
    let result = await fetch(process.env.REACT_APP_API_URL+"/api/SuperUser/login/admin", {
      method:'post',
      body: JSON.stringify({email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    });
    result = await result.json();
    
    if(result.success){
      setUserloggedin(0);
      localStorage.setItem("data",JSON.stringify({result, ...{userloggedin:0, loggedin: true}}));
      navigate('/admin');
      setLogInWarning("");
    }else{
      setLogInWarning("Wrong Credentials");
    }
    
    
  }

  return (
    <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
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
                  <button onClick={handleLogin} type="button" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
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

export default LoginSuperUser;