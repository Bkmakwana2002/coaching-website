import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Chapters from '../Chapters.jsx/Chapters'
// import Lectures from '../Subject/Lectures'

const ViewFaculty = () => {
    
    const [lectures, setArray] = useState([]);
    const [chapters, setChapters] = useState(()=>new Set());
    const [chapterArr, setChapterArr ] = useState([]);

    useEffect(()=>{
      const fetchVideos = async()=>{
        let localdata = localStorage.getItem("data");
        localdata = JSON.parse(localdata)
        
        fetch(process.env.REACT_APP_API_URL+`/api/fetchVideos/faculty`, {
        method:'post',
        body:JSON.stringify({"email":localdata.result.email}),
        headers:{
          'Content-Type':'application/json'
        }
      }).then((response)=>{
        response.json().then(
          (lectureArr)=>{
            lectureArr.forEach(element => {
              if(!chapters.has(element.chapter)){
                setChapters(prev => new Set(prev).add(element.chapter));
                chapters.add(element.chapter);
              }
            });

            setArray([...lectureArr])

            setChapterArr([...chapters].sort((a,b)=>{
              console.log(a)
              if(parseInt(a)<parseInt(b)){
                return -1;
              }else{
                return 1;
              }
            }));

          }
        )
      })
      .catch((err)=>{
        console.log("Error is ",err)
      })
    }

      fetchVideos();
      if(lectures.length===0){
        const newArr = [{
          subject:'No Subject',
          batch:'No batch',
          title:'No Video found',
          pic:'No source',
          vidurl:'/'
        }]
        setArray(newArr)
      }
      console.log(lectures)
      
    }, [])
  

  return (
    <div className='pt-32 flex flex-col lg:grid-cols-3 lg:mx-4 lg:grid lg:gap-4 md:grid-cols-3 md:mx-4 md:grid md:gap-4 justify-center items-center'>

      {
        chapterArr.map((item, index) =>(
          <Chapters key={index} lectures = {lectures} chapter={item} subject={"Physics"}/>
        )) 
      }



    </div>
  )
}

export default ViewFaculty