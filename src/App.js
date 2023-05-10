import SignIn from './Components/signIn';
import './App.css';
import Webcam from './Components/Webcam';
import React, { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import TeacherDashboard from './Components/teacher-dashboard';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import Courses from './Components/courses';
import Attendance from './Components/attendance';
import Modify from './Components/modify';
import axios from 'axios';

function getUser(){
  let user = localStorage.getItem('userData');
  if(user){
    user = JSON.parse(user);
  }
  else{
    user = null;
  }
  return user;
}

function getCourse(){
  let course = localStorage.getItem('selectCourse');
  if(course){
    course = JSON.parse(course);
  }
  else{
    course=null;
  }
  return course;
}

function App() {

const [startScan, setStartScan] = useState(false);
const [username,setUsername]=useState('adeelanmed123@gmail.com');
const [password,setPassword]=useState('adeel123');
const [userData,setUserData]=useState({})
const [teacherCourses,setTeacherCourses]=useState([]);
const [selectCourse,setSelectCourse]=useState(getCourse());
const [selectCourseId,setSelectCourseId]=useState();
const [user,setUser]=useState(getUser());
const [attendanceData,setAttendanceData] = useState([]);
const [filteredCourses, setFilteredCourses] = useState([]);
    
const nav = useNavigate();

useEffect(() => {
  if (!user) {
  nav('/');
  }
}, [user]);

useEffect(()=>{
  axios.post('https://sdok7nl5h2.execute-api.ap-northeast-1.amazonaws.com/prod/getattendance',{
          studentId:null
        }).then((res)=>{
          const data = res.data;
          localStorage.setItem('attendance',JSON.stringify(data.attendances)); 
        }).catch(e=>{
          console.log(e)
        })
},[selectCourse])


  return (
    <div className="App">

      <Routes>

        <Route path='/teacherDashboard' 
          element={<TeacherDashboard 
          userData={userData}
          setUserData={setUserData}
          setStartScan={setStartScan}
          nav={nav} 
          teacherCourses = {teacherCourses}
          setTeacherCourses={setTeacherCourses}
          setSelectCourse={setSelectCourse} 
          selectCourse={selectCourse}
          user={user}/>} ></Route>


        <Route path='/' element={<SignIn username={username} password={password}
          nav={nav} setPassword={setPassword} setUsername={setUsername} 
          userData={userData} setUser={setUser} teacherCourses = {teacherCourses}
          setTeacherCourses={setTeacherCourses}
          /> } />
        
        <Route path='/courses' element={<Courses teacherCourses={teacherCourses} 
          setTeacherCourses={setTeacherCourses} nav={nav}
          setSelectCourse={setSelectCourse} selectCourse={selectCourse}
          setSelectCourseId={setSelectCourseId}
          user={user}
          />}></Route>       
        
        <Route path='/webcam' element={<Webcam startScan ={startScan} 
          nav={nav} user={user} selectCourse={selectCourse}
          setSelectCourse={setSelectCourse} setSelectCourseId={setSelectCourseId}
          />}></Route>

        <Route path='/attendance' element={<Attendance user={user} 
          selectCourse={selectCourse} nav={nav} 
          attendanceData={attendanceData} setAttendanceData={setAttendanceData}
          filteredCourses={filteredCourses} setFilteredCourses={setFilteredCourses} />}></Route>
        
        <Route path='/modify' element={<Modify 
          userData={userData}
          setUserData={setUserData}
          setStartScan={setStartScan}
          nav={nav} 
          teacherCourses = {teacherCourses}
          setTeacherCourses={setTeacherCourses}
          setSelectCourse={setSelectCourse} 
          selectCourse={selectCourse}
          selectCourseId= {selectCourseId}
          setSelectCourseId={setSelectCourseId}
          user={user}
          />}/>

        {/* <Route path='/studentDashboard' element={<StudentDashboard userData={userData}
          setUserData={setUserData}
          />} ></Route> */}
      </Routes>
      
    </div>
  );
}

export default App;
