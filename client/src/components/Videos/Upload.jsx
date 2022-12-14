import React from 'react'
import { storage } from '../../firebase'
import { useState,useEffect } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {IoIosArrowDropdownCircle} from 'react-icons/io'

// Naming convention in the video storage
// videotitle_uuid


const Upload = () => {

  const [video, setVideo] = useState(null)
  const [uploadDate, setUploadDate]=useState(new Date())
  const [show, setShow ] = useState(false);

  // Setting today's date and closing the subject dropdown
  useEffect(()=>{
    setUploadDate(new Date());
    setShow(false);
  }, []);

  const [url, setUrl] = useState("")  
  const [showWarning, setWarning] = useState(false);
  const [fileName, setFileName ] = useState('None');
  const navigate = useNavigate();
  const [subject, setSubject] = useState("Subject");

  const [videoInfo, setVideoInfo]=useState(
    {title: "",
    subject:subject,
    teacher:"",
    chapterNum:0, 
    lecture:0,
    JEE:false, 
    NEET:false, 
    Foundation:false,
    date: uploadDate,
    email: ""
  });

  const setMySubject = (e)=>{
    console.log(e)
    console.log(videoInfo.subject)
    setSubject(e)
    setVideoInfo(existingValues=>({
      ...existingValues,
      subject:e
    }))
    setShow(!show);
  }


  // This function sends the video data to mongodb and stores the information of that video in the database
  // This function uploads video to Firebase
  const uploadVideo = async (e) => {
    e.preventDefault();
    console.log("uploading")

    if (video === null) {
      console.log("no video found")
      setWarning(true);
      return;
    }
    
    if(videoInfo.subject==="Subject"){
      setWarning(true);
      console.log("Not uploaded")
      return;
    }

    const videoRef = ref(storage, `videos/${video + uuidv4()}`)
    await uploadBytes(videoRef, video).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((URL) => {
        setUrl(URL);
        sendDataToDB(URL)
        console.log(URL)  
      })
    }).catch((er)=>{
      console.log(er);
    })

    console.log(url);
    // Call SendDataToDB to send the data of the video
    // await sendDataToDB(url);

    navigate('/');

  }

  // Handling files
  const handleFile = (e)=>{
    setVideo(e.target.files[0].name);
    setFileName(e.target.files[0].name);
    // const name = e.target.files[0].name.split('.');
    // setVideo(name[0]);
    // console.log("name is ", name)
    setWarning(false);
  }

  // Handling Storing information of the video
  const setMyVideoInfo = (e)=>{

    if(e.target.value ==="on" && (e.target.name ==="JEE" || e.target.name ==="NEET" || e.target.name ==="Foundation")){
      setVideoInfo(existingValues=>({
        ...existingValues,
        [e.target.name]: e.target.checked
      }));
    }else if(e?.target?.name==="chapterNum"){
      setVideoInfo(existingValues=>({
        ...existingValues,
        [e.target.name]: parseInt(e.target.value)
      }));
    }else{
      setVideoInfo(existingValues =>({
        ...existingValues,
        [e.target.name] : e.target.value
      }));
    }

    console.log(videoInfo)
  }
  
  const sendDataToDB = async(URL)=>{
    
    let data = {...videoInfo}
    data.vidurl = URL
    let localdata = localStorage.getItem("data");
    localdata = JSON.parse(localdata)
    data.email = localdata.result.email
    console.log("url is ",data)
    const Token = JSON.parse(localStorage.getItem("data")).result.token;
    console.log(Token)
    // console.log(JSON.parse(localStorage.getItem("data")).result.token)

    let result = await fetch("http://localhost:5000/api/Teach/Upload-Video",{
        method:'post',
        headers:{
          'Content-Type':'application/json',
          'authorization':'Bearer '+Token
        },

        body:JSON.stringify(data)
      })
      result = await result.json();
      console.log("results",result);
  }

  


  return (
    <form className='w-4/5 flex flex-col mx-auto justify-center my-24 py-12 border border-black' onSubmit={uploadVideo}>

        <div className="flex flex-col justify-center items-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Video</p>
            </div>
            <input id="dropzone-file" type="file" accept="video/mp4,video/x-m4v,video/*" className="hidden" required onChange={handleFile}/>
          </label>

          <div>
            {showWarning?"Please select a file":""}
          </div>
          <label htmlFor="fileName" className='bg-orange-400 p-2 rounded m-2'>
            File selected : {fileName}
          </label>

          <div className='flex flex-col md:justify-center md:items-center lg:justify-center lg:items-center md:flex-row lg:flex-row p-2 mx-2'>

            <div className='mx-4 lg:flex lg:flex-row '>
              <label htmlFor="title" className='mt-4 mx-4 '>Title</label>
              <input type="text" required onChange={setMyVideoInfo} name="title" id="title" placeholder='Title'  className="p-4 rounded border border-black"/>
            </div>
            
            <div className='mx-auto my-2 lg:my-0 w-2/3'>
              <div className='bg-blue-300 p-4 rounded w-full'>
                <button onClick={()=>{setShow(!show)}} className="w-full flex flex-row justify-center items-center">{subject}<IoIosArrowDropdownCircle/></button>
              </div>
              <div className={show?`absolute flex flex-col bg-gray-300 `:`hidden`}>

                <button onClick={()=>{setMySubject("Physics")}} className='p-2 border border-black'>Physics</button>
                <button onClick={()=>{setMySubject("Chemistry")}} className='p-2 border border-black'>Chemistry</button>
                <button onClick={()=>{setMySubject("Maths")}} className='p-2 border border-black'>Maths</button>
                <button onClick={()=>{setMySubject("Biology")}} className='p-2 border border-black'>Biology</button>
              </div>
            </div>

            <div className='mx-4 lg:flex lg:flex-row '>
              <label htmlFor="title" className='mt-4 mx-4 '>Lecture</label>
              <input type="number" onChange={setMyVideoInfo} name="lecture" id="lecture" placeholder='Lecture' required className="p-4 rounded border border-black"/>
            </div>

          </div>

          <div className='flex flex-col md:flex-row lg:flex-row p-2 mx-2'>
            <div className='m-2'>
              <label htmlFor="teacher" className='mt-4 mx-2'>Teacher's Code</label>
              <input required type="text" onChange={setMyVideoInfo} name="teacher" id="teacher" placeholder="Teacher's Code" className="p-4 rounded border border-black"/>
            </div>
            <div className='m-2'>
              <label htmlFor="Chapter Number" className='mt-4 mx-2'>Chapter Number</label>
              <input required type="number" onChange={setMyVideoInfo} name="chapterNum" id="chapterNum" placeholder="Chapter Number" className="p-4 rounded border border-black"/>
            </div>
          </div>

          <div className='w-2/3 flex justify-center flex-col md:flex-row lg:flex-row'>
            {/* Batch menu button */} 

            <div className='mx-2 px-2'>  
              <label className='mx-2' htmlFor="JEE">JEE</label>
              <input type="checkbox" onChange={setMyVideoInfo} name="JEE" id="JEE" />
            </div>

            <div className='mx-2 px-2'>
              <label htmlFor="NEET" className='mx-2'>NEET</label>
              <input type="checkbox" onChange={setMyVideoInfo} name="NEET" id="NEET" />
            </div>

            <div className='mx-2 px-2'>
              <label htmlFor="Foundation" className='mx-2'>Foundation</label>
              <input type="checkbox" onChange={setMyVideoInfo} name="Foundation" id="Foundation" />
            </div>

            
          </div>

          <div className='flex justify-center items-center'>
            <input className='px-4 py-2 m-4 hover:bg-blue-300 active:bg-blue-500 focus:pointer-events-auto bg-blue-400 rounded' type="submit" value="Upload" />
            <input type="reset"  className='px-4 py-2 m-4 hover:bg-slate-300 rounded'  value="Cancel" onClick={()=>{setFileName("None")}}/>

          </div>
          
        </div>

    </form>
  )
}

export default Upload