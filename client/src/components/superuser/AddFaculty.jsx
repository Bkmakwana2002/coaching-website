import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../firebase';

const AddFaculty = () => {

// name, email, password, phone, tCode, pic, DOB,subject

  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [confirmeduserpassword, setConfirmedUserPassword] = useState('');
  const [phone, setPhoneNumber] = useState(0);
  const [tCode, setTCode] = useState("");
  const [subject, setSubject] = useState("");
  const [DOB, setDOB] = useState("");
  const [warning, setWarning]= useState("");
  const [profilepic, setProfilePic] = useState(null);


  const handleDOB = (event)=>{
    setDOB(new Date(`${event.target.value}Z`));
  }
  
  // Navigation
  const navigate = useNavigate();

  const Addfaculty = async(event)=>{
    // Prevent Reloading of the page
    event.preventDefault();

    // first we need token of the admin
      const user = JSON.parse(localStorage.getItem("data"));
      const Token = user.result.token;
      console.log(Token); // token fetch successful

    // check if the password and confirmed password are same of not
    if(password===confirmeduserpassword && password.length >= 5 && subject.length >0){
        let URL = "";
        let body = "";
        if(profilepic){
          const profilePicRef = ref(storage, `profile-images/faculty-images/${profilepic.name + uuidv4()}`);
          const snapshot = await uploadBytes(profilePicRef, profilepic);          
          URL = await getDownloadURL(snapshot.ref);

          // update body to send to backend
          body = JSON.stringify({name, email, password, phone, tCode, subject, DOB, pic:URL})
        }else{
          // update body to send to backend
          body = JSON.stringify({name, email, password, phone, tCode, subject, DOB})
        }

        console.log("URL IS ", URL)
        // Now check if the token is of admin or not
        let result = await fetch(process.env.REACT_APP_API_URL+"/api/Teach/register/user",
        {
          method:'post',
          headers:{
            'Content-Type':'application/json',
            'authorization':'Bearer '+Token
          },
          body:body

        });

        result = await result.json();
        if(result.success){
          navigate('/');
        }else{
          setWarning(result?.message || "Something Went Wrong");
        }
    }
  }



  return (
    <form onSubmit={Addfaculty}>
      <div className="bg-grey-lighter min-h-screen flex flex-col ">
          <div className="container max-w-sm mx-auto flex-1 my-24 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>

              <div className="p-2 m-2">
                <label htmlFor="file" className="text-left mr-4 font-bold text-gray-500">
                  Profile Photo
                </label>
                <input
                  onChange={(e) => { setProfilePic(e.target.files[0]) }}
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block py-2 px-4 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-600"
                >
                  {profilepic?.name || "Choose File"}
                </label>
              </div>

              {/* for Username  */}
              <input required type="text" onChange={(event)=>{setUserName(event.target.value)}} className="block border border-grey-light w-full p-3 rounded mb-4" name="fullname" placeholder="Full Name" />

              {/* for Email  */}
              <input required onChange={(event)=>{setUserEmail(event.target.value)}} type="email" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />

              {/* For DOB */}
              <label htmlFor="dob" className='select-none text-left mr-64 font-bold text-gray-500'>DOB</label>
              <input required onChange={handleDOB} type="date" className="block border border-grey-light w-full p-3 rounded mb-4" name="date" placeholder="Date of Birth" />

              {/* for Phone Number  */}
              <input required onChange={(event)=>{setPhoneNumber(event.target.value)}} type="tel" className="block border border-grey-light w-full p-3 rounded mb-4" name="phone" placeholder="Phone" pattern="[0-9]{10}"/>

              {/* for Teacher's Code Name  */}
              <input required onChange={(event)=>{setTCode(event.target.value)}} type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="tcode" placeholder="Teacher's Code" />

              {/* for Teacher's Subject */}
              {/* <input required onChange={(event)=>{setSubject(event.target.value)}} type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="subject" placeholder="Teacher's Subject" /> */}
              <select
                required
                onChange={(event) => { setSubject(event.target.value) }}
                className="block border border-grey-light w-full p-3 rounded mb-4 select-dropdown"
                name="subject"
              >
                <option value="">Select Subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
                <option value="Biology">Biology</option>
              </select>




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

export default AddFaculty;