import React from 'react'
import { useState , useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../../firebase';



const Lectures = () => {
  
//   List all lectures here
    const location = useLocation();
    const navigate = useNavigate();
    // console.log("Location.state is ", location.state)
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    function DeleteVideo(url){

      const ans = window.confirm("Are you sure you want to delete this video?");

      if(ans){
        if(url){

          let videoRef = ref(storage, url);
          deleteObject(videoRef).then(()=>{
            console.log("deleted")
          }).catch((err)=>{
            console.log(err)
          })

          // once this is done, delete the video from the database
          fetch(process.env.REACT_APP_API_URL+`/api/fetchVideos/delete-video`, {
            method:'post',
            body:JSON.stringify({vidurl:url}),
            headers:{
              'Content-Type':'application/json'
            }
          }).then((response)=>{
            response.json().then(
              (res)=>{
                console.log(res)
                console.log("Deleted");
                navigate(-1)
                // window.location.reload(true)
              }
            )
          }).catch((err)=>{
            console.log("Error is ", err);
          })
        }

      }else{
        return;
      }

    }
    
    useEffect(()=>{
      if(location.state===undefined || location.state===null){
        setLectures([])
        setError(true);
      }else{
        setLectures([...location.state.thisLectures])
        setError(false);
      }
      setLoading(true);

      try{
        //if lectures is empty, return
        if(lectures.length<=0){
          setLoading(false);
          return;
        }

        const newLec = lectures.sort((vid1, vid2)=>{
          if(parseInt(vid1.chapter)<parseInt(vid2.chapter)){
            return -1;
          }else if(parseInt(vid1.chapter)===parseInt(vid2.chapter)){
            if(parseInt(vid1.lecture)<parseInt(vid2.lecture)){
              return -1;
            }else{
              return 1;

            }
          }else{
            return 1;
          }
        })
        
        setLectures(newLec);
        setLoading(false);
        setError(false);
      }catch(err){
        setError(true);
        setLoading(false);
      }
      
    }, [location.state, lectures])


    return (

      // check if loading
      loading?

      // if loading, then check if error
      error?

      // if error, then show error
      <div className='pb-4 mx-auto pt-32 text-center text-5xl'> Error Loading Videos... </div>

      
      :
      // if no error, then show loading
      
          <div className='pb-4 mx-auto pt-32 text-center text-5xl'> Loading Videos... </div>
      
          :
          // if no loading and no error, then show videos
      (
          <div className='flex flex-col lg:grid lg:grid-cols-3 lg:grid-row-3'>

        {
          // if lectures is empty, then show no videos
          lectures?
          (lectures.map((item, index)=>{
            return (
              <div key={index} className='flex mx-4 flex-col justify-center my-4 w-1/2 lg:mx-4 md:mx-4'>
                <Link to={'/videos'} state={item.vidurl}> 
                  <div className="rounded overflow-hidden shadow-lg hover:bg-gray-200 active:bg-gray-300 hover:shadow-md">
                    <img className="w-full" src={item.pic} alt={item.title} />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{item.title}</div>
                      <p className="text-gray-700 text-base">
                        Chapter: {item.chapter}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lecture: {item.lecture}</span>
                      
                    </div>
                  </div>
                  
                </Link>

                {
                  location?.state?.user==="faculty"?
                  // if faculty, then show delete button
                  <button onClick={()=>{DeleteVideo(item.vidurl)}} className='bg-red-500 text-white rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 hover:bg-red-400 active:bg-red-500'>
                  Delete 
                  </button>
                  :
                  null
                }
              
              </div>
            )
          })) : 
            <div key={1} className='flex justify-center my-4'>
              <Link to={'/videos'} state={'/'}> 
                <div className="max-w-sm rounded overflow-hidden shadow-lg hover:bg-gray-200 active:bg-gray-300">
                  <img className="w-full" src={'No pic'} alt={"No picture"} />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{"No title"}</div>
                    <p className="text-gray-700 text-base">
                      Chapter: {0}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lecture: {0}</span>
                  </div>
                </div>
              </Link>
            </div>
        }


        
      </div>

      )

  )
}

export default Lectures