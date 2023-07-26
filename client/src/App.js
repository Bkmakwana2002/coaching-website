import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hero from './components/Home/hero';
import Footer from './components/Footer';
import React from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useState, useEffect } from 'react';
import Content from './components/Home/content';
import Director from './components/Home/director';
import Products from './components/Home/products';
import LoginSuperUser from './components/Login/LoginSuperUser';
import Contact from './components/Contact/contact';
import Navbar from './components/Navbar/Navbar'
import NavbarSuperUser from './components/Navbar/NavbarSuperUser';
import AboutUsInfo from './components/NavbarExtentsion/AboutUsInfo';
import CoursesInfo from './components/NavbarExtentsion/CoursesInfo';
import Slider from './components/ImageSlider/Slider' 
import LoginCheck from './components/Login/LoginCheck';
import SuperUser from './components/superuser/SuperUser';
import DeleteUser from './components/superuser/DeleteUser';
import LoginFaculty from './components/Login/LoginFaculty';
import LoginStudent from './components/Login/LoginStudent';
import Logout from './components/Logout/Logout';
import {LoginContext} from './components/Contexts/LoginContext'
import NavbarStudent from './components/Navbar/NavbarStudent';
import AddStudent from './components/superuser/AddStudent';
import AddFaculty from './components/superuser/AddFaculty';
import Success from './components/Redirecting/Success';
import Upload from './components/Videos/Upload';
import NavbarFaculty from './components/Navbar/NavbarFaculty';
import ViewFaculty from './components/Videos/View/ViewFaculty';
import ViewJEE from './components/Videos/View/ViewJEE';
import ViewNEET from './components/Videos/View/ViewNEET';
import ViewFoundation from './components/Videos/View/ViewFoundation';
import Student from './components/Profile/Student';
import Faculty from './components/Profile/Faculty';
import Physics from './components/Videos/Subject/Physics';
import Chemistry from './components/Videos/Subject/Chemistry';
import Maths from './components/Videos/Subject/Maths';
import Biology from './components/Videos/Subject/Biology';
import Protected from './components/Protected';
import Player from './components/Videos/Player';
import Chapters from './components/Videos/Chapters.jsx/Chapters';
import Lectures from './components/Videos/Subject/Lectures';
import AddTests from './components/Tests/AddTests';
import ViewTestSuper from './components/Tests/ViewTestSuper';
import ViewTestSuperBatch from './components/Tests/ViewTestSuperBatch';
import ViewTestStudent from './components/Tests/ViewTestStudent';
import ShowTestCards from './components/Tests/ShowTestCards';
import AddTestDetails from './components/Tests/AddTestDetails';
import ViewTestFaculty from './components/Tests/ViewTestFaculty';
import ViewTestAnalysis from './components/Tests/ViewTestAnalysis';
import ShowAnalysisCard from './components/Tests/ShowAnalysisCard';
import AnalysisForm from './components/Tests/AnalysisForm';
import AddSliderImages from './components/AddRemoveImages/AddSliderImages';
import AddTeacherImages from './components/AddRemoveImages/AddTeacherImages';
import ImageOptions from './components/AddRemoveImages/ImageOptions';
import RemoveSliderImages from './components/AddRemoveImages/RemoveSliderImages';
import RemoveTeacherImages from './components/AddRemoveImages/RemoveTeacherImages';
import ViewCourses from './components/Videos/View/ViewCourses';
import ShowCoursesFaculty from './components/Courses/ShowCoursesFaculty';
import AddCourse from './components/Courses/AddCourse';
import ShowCoursesCategory from './components/Courses/ShowCoursesCategory';
import ShowCoursesUser2 from './components/Courses/ShowCoursesUser2';
import LoginUser2 from './components/Login/LoginUser2';
import AskUser from './components/Login/AskUser';
import RegisterUser2 from './components/Register/RegisterUser2';
import NavbarUser2 from './components/Navbar/NavbarUser2';
import Payment from './components/payment/payment';
import PaymentSuccess from './components/payment/PaymentSuccess';
import DeleteUser2 from './components/superuser/DeleteUser2';
import DeleteFaculty from './components/superuser/DeleteFaculty';


function App() {
  const [email, setEmail] = useState("");

  // Checks which navbar to load
  const log = localStorage.getItem("data");
  const data = JSON.parse(log);
  
  const [userloggedin, setUserloggedin] = useState(-1);
  
  useEffect(()=>{
    console.log(data)
    if(data?.userloggedin===0){ 
      setUserloggedin(0);
    }else if(data?.userloggedin===1){
      setUserloggedin(1);
    }else if(data?.userloggedin===2){
      setUserloggedin(2);
    }else if(data?.userloggedin===3){
      setUserloggedin(3)
    }
    console.log(data?.userloggedin)
  }, [data?.userloggedin])
  
  const checkNavbarToLoad = ()=>{
    try{

      if(userloggedin === 0){ // 0 for superuser
        return <NavbarSuperUser/>;
      }else if(userloggedin === 1){ // 1 for Student
        return <NavbarStudent/>;
      }else if(userloggedin === 2){ // 2 for faculty
        return <NavbarFaculty/>;
      }else if(userloggedin===3){ // 3 for user2
        return <NavbarUser2/> 
      }else{
        return <Navbar/>;
      }
    }catch(err){
      console.log(err);
    }
      
  }

  useEffect(()=>{
    checkNavbarToLoad();
    // eslint-disable-next-line
  }, []);


  const loginContextparams = {
    email, 
    setEmail,
    userloggedin, 
    setUserloggedin,
    checkNavbarToLoad
  }

  const [progress, setProgress] = useState(0);
  return (
    
    <div>
      <div className="App bg-gray-100 font-lato">
      <BrowserRouter>
      <LoginContext.Provider value = {loginContextparams}>
      
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={4}
      />
      
      {checkNavbarToLoad()}

        <Routes>
          <Route path="/paymentsuccess" element={<PaymentSuccess/>}></Route>
          {/* ---------------------------public routes ---------------------------*/}
          <Route path = "/" element={
          <div>
              <Slider/><Hero/> <Content/> <Director/><Products/>
          </div>
          }/>
          <Route path ="/login" element = {<LoginCheck/>} />
          <Route path ="/register" element = {<RegisterUser2/>} />
          <Route path ="/login/usertype" element = {<AskUser redirect1={"/login/student"} redirect2 = {"/login/user2"}/>} />
          <Route path ="/login/student" element = {<LoginStudent/>} />
          <Route path ="/login/user2" element = {<LoginUser2/>} />
          <Route path ="/login/teacher" element = {<LoginFaculty/>} />
          <Route path ="/logout" element = {<Logout/>} />
          <Route path ="/login/admin" element = {<LoginSuperUser/>} />
          <Route path ="/contact" element = {<Contact setProgress ={setProgress}/>} />
          <Route path ="/about" element = {<AboutUsInfo/>} />
          <Route path ="/videos" element = {<Player/> } />
          <Route path ="/chapter" element = {<Chapters/> } />
          <Route path ="/lectures" element = {<Lectures/> } />
          <Route path ="/category/courses" element = {<ShowCoursesCategory/> } />
          <Route path ="/user2/courses" element = {<ShowCoursesUser2/> } />
          <Route path ="/faculty/courses" element = {<ShowCoursesFaculty/> } />
          <Route path ="/addcourse" element = {<AddCourse/> } />
          <Route path ="/courses/jee" element = {<ViewJEE user="student"/> } />
          <Route path ="/courses/neet" element = {<ViewNEET user="student"/> } />
          <Route path ="/faculty/courses/neet" element = {<ViewNEET user="faculty"/> } />
          <Route path ="/faculty/courses/jee" element = {<ViewJEE user="faculty"/> } />
          <Route path ="/buy-courses" element = {<Payment/> } />
          

          {/* ------------------protected routes------------------- */}

          {/* /////////////////////Student Routes//////////////////////// */}
          <Route path ="/profile/student" element = {<Protected user="student" setProgress = {setProgress} Component={<Student setProgress = {setProgress}/>}/>} />

          <Route path ="/student/test" element = {<ViewTestStudent /> } />

          <Route path ="/upcoming-tests/student/:batchORsubject" element = {<Protected user="student" setProgress = {setProgress} Component={<ShowTestCards setProgress = {setProgress}/>} /> } />

          {/* JEE Student */}
          <Route path ="/watch/student/JEE" element = {<Protected user="student" setProgress = {setProgress} Component={<ViewJEE setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/student/JEE/Physics" element = {<Protected setProgress={setProgress} user="student" type="user2" batch="JEE" Component={<Physics setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/student/JEE/Chemistry" element = {<Protected setProgress={setProgress} user="student" type="user2" batch="JEE" Component={<Chemistry setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/student/JEE/Maths" element = {<Protected setProgress={setProgress} user="student" type="user2" batch="JEE" Component={<Maths setProgress = {setProgress}/>}/>} />

          {/* NEET Student */}
          <Route path ="/watch/student/NEET" element = {<Protected setProgress={setProgress} user="student" type="user2" Component={<ViewNEET setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/student/NEET/Physics" element = {<Protected setProgress={setProgress} user="student" type="user2" batch="NEET" Component={<Physics setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/student/NEET/Chemistry" element = {<Protected setProgress={setProgress} user="student" type="user2" batch="NEET" Component={<Chemistry setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/student/NEET/Biology" element = {<Protected setProgress={setProgress} user="student" type="user2" batch="NEET" Component={<Biology setProgress = {setProgress}/>}/>} />
          
          {/* ////////////////////Faculty Routes ////////////////////// */}
          
          <Route path ="/upload-video/:subject/:courseName/:courseCategory" element = {<Protected user="faculty" setProgress = {setProgress} Component={<Upload setProgress = {setProgress}/>}/>} />
          <Route path ="/profile/faculty" element = {<Protected user="faculty" setProgress = {setProgress} Component={<Faculty setProgress = {setProgress}/>}/>} />
          
          {/* JEE Routes */}
          <Route path ="/watch/faculty/JEE/Physics" element = {<Protected user="faculty" setProgress = {setProgress} Component = {<Physics setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/faculty/JEE/Chemistry" element = {<Protected user="faculty" setProgress = {setProgress} Component = {<Chemistry setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/faculty/JEE/Maths" element = {<Protected user="faculty" setProgress = {setProgress} Component = {<Maths setProgress = {setProgress}/>}/>} />

          {/* NEET Routes */}
          <Route path ="/watch/faculty/NEET/Physics" element = {<Protected user="faculty" setProgress = {setProgress} Component = {<Physics setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/faculty/NEET/Chemistry" element = {<Protected user="faculty" setProgress = {setProgress} Component = {<Chemistry setProgress = {setProgress}/>}/>} />
          <Route path ="/watch/faculty/NEET/Biology" element = {<Protected user="faculty" setProgress = {setProgress} Component = {<Biology setProgress = {setProgress}/>}/>} />
          
          <Route path ="/faculty/analysis" element = {<Protected user="faculty" setProgress={setProgress} Component={<ViewTestAnalysis setProgress = {setProgress}/>} /> } />
          <Route path ="/faculty/test" element = {<Protected user="faculty" setProgress={setProgress} Component={<ViewTestFaculty setProgress = {setProgress}/>} /> } />
          <Route path ="/upcoming-tests/faculty/:batchORsubject" element = {<Protected user="student" setProgress = {setProgress} Component={<ShowTestCards setProgress = {setProgress}/>} /> } />

          {/* /////////////////////Admin Routes//////////////////// */}

          <Route path ="/admin/addstudent" element = {<Protected user="admin" setProgress = {setProgress} Component={<AddStudent setProgress = {setProgress}/>}/>} />
          <Route path ="/admin/addfaculty" element = {<Protected user="admin" setProgress = {setProgress} Component={<AddFaculty setProgress = {setProgress}/>}/>} />
          <Route path ="/admin/deleteuser" element = {<Protected user="admin" setProgress = {setProgress} Component={<DeleteUser setProgress = {setProgress}/>}/>} />
          <Route path ="/addtest" element = {<Protected user="admin" setProgress={setProgress} Component ={<AddTests setProgress = {setProgress}/>}/> } />
          <Route path ="/addanalysis" element = {<Protected user="admin" setProgress = {setProgress} Component={<AddTestDetails setProgress = {setProgress}/>}/> } />
          <Route path ="/addcourses" element = {<Protected user="admin" setProgress = {setProgress} Component={<AddCourse setProgress = {setProgress}/>}/> } />
          <Route path ="/viewcourses" element = {<Protected user="admin" setProgress = {setProgress} Component={<ViewCourses setProgress = {setProgress}/>}/> } />
          <Route path ="/viewtest/admin" element = {<Protected user="admin" setProgress = {setProgress} Component={<ViewTestSuper setProgress = {setProgress}/>} /> } />
          <Route path ="/upcoming-tests/admin" element = {<Protected user="admin" setProgress = {setProgress} Component={<ViewTestSuperBatch setProgress = {setProgress}/>} /> } />
          <Route path ="/upcoming-tests/admin/:batchORsubject" element = {<Protected user="admin" setProgress = {setProgress} Component={<ShowTestCards setProgress = {setProgress}/>} /> } />
          <Route path ="/test-analysis-form" element = { <Protected user="admin" setProgress = {setProgress} Component={<AnalysisForm setProgress = {setProgress}/>}/>} />
          <Route path ="/viewanalysis" element = { <Protected user="admin" setProgress = {setProgress} Component={<ShowAnalysisCard setProgress = {setProgress}/>}/>} />

          <Route path ="/admin" element = { <Protected user="admin" setProgress = {setProgress} Component={<SuperUser setProgress = {setProgress}/>}/>} />
          <Route path ="/addimages" element = {<Protected Component = {<ImageOptions setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />
          <Route path ="/addsliderimages" element = {<Protected Component = {<AddSliderImages setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />
          <Route path ="/addteacherimages" element = {<Protected Component = {<AddTeacherImages setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />
          <Route path ="/removesliderimages" element = {<Protected Component = {<RemoveSliderImages setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />
          <Route path ="/removeteacherimages" element = {<Protected Component = {<RemoveTeacherImages setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />
          
          
          <Route path ="/admin/removestudent" element = {<Protected Component = {<AskUser redirect1={"/admin/removeuser"} redirect2={"/admin/removeuser2"} setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />
          <Route path="/admin/removeuser" element = {<Protected Component = {<DeleteUser setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />
          <Route path="/admin/removeuser2" element = {<Protected Component = {<DeleteUser2 setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />

          <Route path ="/admin/removefaculty" element = {<Protected Component = {<DeleteFaculty setProgress = {setProgress}/>} user="admin" setProgress={setProgress}/> } />

          {/* ////////////////////// Success Redirects ////////////////////////// */}
          <Route path ="/success/:message" element = {<Success/> } />
        </Routes>
          <Footer/>
        </LoginContext.Provider>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
