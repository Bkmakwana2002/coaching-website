import React from 'react'
import { useState , useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

const Lectures = () => {
  
//   List all lectures here
    const location = useLocation();
    const [lectures, setLectures] = useState(location.state);

    
    useEffect(()=>{
      console.log(lectures)
      try{
        lectures.sort((vid1, vid2)=>{
          if(vid1.chapter>vid2.chapter){
            return 1;
          }else{
            return -1;
          }
        })
      }catch(err){
        console.log(err);
        console.log(lectures)
      }
      
    }, [])


    return (
      <div className='pt-32 flex flex-col lg:grid lg:grid-cols-3 lg:grid-row-3'>

        {
          lectures? 
          (lectures.map((item, index)=>{
            return (
              <div key={index} className='flex mx-4 justify-center my-4 lg:mx-4 md:mx-4'>
                <Link to={'/videos'} state={item.vidurl}> 
                  <div className="max-w-sm rounded overflow-hidden shadow-lg hover:bg-gray-200 active:bg-gray-300">
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
}

export default Lectures