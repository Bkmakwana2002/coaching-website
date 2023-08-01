import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Protected = (props) => {
  
  const {Component, user, batch, setProgress} = props;
  const navigate = useNavigate();
  const location = useLocation();
  let type = undefined;

  // if the type is not user2, then it will automatically be normal user
  if(location?.state?.type){
    // console.log(location.state.type)
    // console.log("USER ", user)
    type = location.state.type;
  }
  // const {type} = location?.state?.type ? location.state.type : {type:undefined};
  // console.log(type)


  useEffect(()=>{
    try{
      setProgress(10);
      const isAuth = async()=>{
        if(type==="user2" && user==="student"){
          const Token = JSON.parse(localStorage.getItem("data"))?.result.token;
            fetch(process.env.REACT_APP_API_URL+`/api/auth/user2`, {
                method:'get',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':'Bearer '+Token
                }
            }).then(response=>{
              response.json().then(message=>{
                console.log(message)
                if(!(message.success)){
                  navigate('/login');
                  // window.location.reload(true);
                }
                setProgress(100);
              })
            })

            setProgress(0);
        }else{          
          const Token = JSON.parse(localStorage.getItem("data"))?.result.token;
            fetch(process.env.REACT_APP_API_URL+`/api/auth/${user}`, {
                method:'get',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':'Bearer '+Token
                }
            }).then(response=>{
              response.json().then(message=>{
                if(!(message.success)){
                  navigate('/login');
                  window.location.reload(true);
                }
                setProgress(100);
              })
            })

            setProgress(0);
        }
      }
      isAuth();
  }catch(err){
    setProgress(100);
    navigate('/login');
  }

    //eslint-disable-next-line
  }, [])

  return (
    
    <div>
      {Component}
      {/* <Component setProgress={setProgress} batch={batch} redirect1={redirect1} redirect2={redirect2}/>     */}
    </div>
  )
}

export default Protected