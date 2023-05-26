import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const RegisterUser2 = () => {

  const role = "Student";

  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [confirmeduserpassword, setConfirmedUserPassword] = useState('');
  const [phone, setPhoneNumber] = useState(0);
  const [category, setCategory] = useState(0);
  const [DOB, setDOB] = useState(new Date());
  const [warning, setWarning]=useState("");
  const [profilepic, setProfilePic] = useState(null);

  const batches = ['JEE', 'NEET', 'Foundation'];

  const handleDOB = (event)=>{
    console.log(event.target.value);
    setDOB(new Date(`${event.target.value}Z`));
  }
  
  // Navigation
  const navigate = useNavigate();

  const AddStudent = async(event)=>{
    // Prevent Reloading of the page
    event.preventDefault();

    // check if the password and confirmed password are same of not
    if(password===confirmeduserpassword && password.length >= 5){

      // if upload a profile picture then upload it to firebase storage
      if(profilepic){
        const profilePicRef = ref(storage, `profile-images/user2-images/${profilepic.name + uuidv4()}`)
        await uploadBytes(profilePicRef, profilepic).then((snapshot) => {
          console.log(snapshot)
          getDownloadURL(snapshot.ref).then(async(URL) => {
            console.log(URL)
          
            
            fetch("http://localhost:5000/api/User2/register/user2",
            {
              method:'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({name, email, password, phone, DOB, pic:URL})

            }).then(response=>{
              response.json().then((data)=>{
                if(data.success){
                  localStorage.setItem("result", JSON.stringify({data, ...{userloggedin: 3, loggedin:true}})); // save data in localstorage
                  navigate('/');
                }else{
                  setWarning(data.message);
                }
              })
            }).catch((err)=>{
              window.alert("Couldn't upload your profile picture")
              console.log(err);
            })

            })
        }).catch((er)=>{
          window.alert("Couldn't upload your profile picture")
          console.log(er);
        })
      }else{          
        // Now check if the token is of admin or not
        // console.log(profilepicurl)
        let result = await fetch("http://localhost:5000/api/User2/register/user2",
        {
          method:'post',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name, email, password, phone, DOB})
          
        });
        
        result = await result.json();
        if(result.success){
          localStorage.setItem("data", JSON.stringify({result, ...{userloggedin: 3, loggedin:true}})); // save data in localstorage
          navigate('/');
        }else{
          setWarning(result.message);
        }
      }
      }
  }


  return (
    <form onSubmit={AddStudent}>
      <div className="bg-grey-lighter min-h-screen flex flex-col ">
          <div className="container w-full lg:w-1/3 mx-auto flex-1 my-24 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>

              {/* for getting image upload */}

              <div className='p-2 m-2'>
                <label htmlFor="file" className='text-left mr-64 font-bold text-gray-500'>Profile Photo </label>
                <input onChange={(e)=>{setProfilePic(e.target.files[0])}} id="file-upload" type="file" accept='image/*'/>
              </div>

              {/* for Username  */}
              <input required type="text" onChange={(event)=>{setUserName(event.target.value)}} className="block border border-grey-light w-full p-3 rounded mb-4" name="fullname" placeholder="Full Name" />

              {/* for Email  */}
              <input required onChange={(event)=>{setUserEmail(event.target.value)}} type="email" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />

              {/* For DOB */}
              <label htmlFor="dob" className='text-left mr-64 font-bold text-gray-500'>DOB</label>
              <input required onChange={handleDOB} type="date" className="block border border-grey-light w-full p-3 rounded mb-4" name="date" placeholder="Date of Birth" />

              {/* for Phone Number  */}
              <input required onChange={(event)=>{setPhoneNumber(event.target.value)}} type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="phone" placeholder="Phone" />

              {/* Password */}
              <input required onChange={(event)=>{setUserPassword(event.target.value)}} type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" />
                
              {/* Confirm Password */}
              <input required onChange={(event)=>{setConfirmedUserPassword(event.target.value)}} type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="confirm_password" placeholder="Confirm Password" />

              {/* Warning if user already exists */}
              <label className='text-red-400 font-bold pb-6' htmlFor="warning">{warning}</label>

              {/* Matching Password and Confirm Password */}
              {
                password===confirmeduserpassword ?
                "" :
                <label className='text-red-400 font-bold pb-6' htmlFor="check-same-password">!Password and Confirm Password are different <br /></label>

              }

              {/* Checking Password Length */}
              {
                password.length >= 5 ?
                "" :
                <label className='text-red-400 font-bold pb-6' htmlFor="check-same-password">!Password should be atleast 5 characters long</label>

              }

              <input type="submit" className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1 active:border focus:ring-2 focus:ring-blue-400 " value= "Create Account"/>

            </div>


        </div>
      </div>
    </form>


    


  )
}

export default RegisterUser2;