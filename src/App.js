import SignIn from './Components/signIn';
import './App.css';
import Dashboard from './Components/dashboard';
import Webcam from './Components/Webcam';
import React, { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import TeacherDashboard from './Components/teacher-dashboard';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './Components/navbar';
// import Loading from './Components/loading';
import Courses from './Components/courses';
import Attendance from './Components/attendance';
import Modify from './Components/modify';

function App() {

const [startScan, setStartScan] = useState(false);
const [username,setUsername]=useState('adeelanmed123@gmail.com');
const [password,setPassword]=useState('adeel123');
const [userData,setUserData]=useState({})
const [teacherCourses,setTeacherCourses]=useState([]);
const [selectCourse,setSelectCourse]=useState();
const nav = useNavigate();

console.log(selectCourse);
 
console.log(startScan);

useEffect(() => {
  const loggedIn = localStorage.getItem('token');
  if(loggedIn) {
    const foundUser = JSON.parse(loggedIn);
    setUserData(foundUser);
  }
}, [])

  return (
    <div className="App">
      {/* <Navbar userData={userData} /> */}
      {/* <Loading/> */}


      <Routes>
        {/* <Route path='/loading' element={<Loading/>} /> */}
        
        <Route path='/teacherDashboard' 
          element={<TeacherDashboard 
          userData={userData}
          setUserData={setUserData}
          setStartScan={setStartScan}
          nav={nav} 
          teacherCourses = {teacherCourses}
          setTeacherCourses={setTeacherCourses}
          setSelectCourse={setSelectCourse} 
          selectCourse={selectCourse}/>} ></Route>


        <Route path='/' element={<SignIn username={username} password={password}
          nav={nav} setPassword={setPassword} setUsername={setUsername} 
          userData={userData} setUserData={setUserData} teacherCourses = {teacherCourses}
          setTeacherCourses={setTeacherCourses}
          /> } />
        
        <Route path='/courses' element={<Courses teacherCourses={teacherCourses} 
          setTeacherCourses={setTeacherCourses} userData={userData} nav={nav}
          setSelectCourse={setSelectCourse} selectCourse={selectCourse} />}></Route>       
        
        <Route path='/webcam' element={<Webcam startScan ={startScan} 
          nav={nav} userData={userData} selectCourse={selectCourse}/>}></Route>

        <Route path='/attendance' element={<Attendance userData={userData} 
          selectCourse={selectCourse} />}></Route>
        
        <Route path='/modify' element={<Modify 
          userData={userData}
          setUserData={setUserData}
          setStartScan={setStartScan}
          nav={nav} 
          teacherCourses = {teacherCourses}
          setTeacherCourses={setTeacherCourses}
          setSelectCourse={setSelectCourse} 
          selectCourse={selectCourse}/>}/>

        {/* <Route path='/studentDashboard' element={<StudentDashboard userData={userData}
          setUserData={setUserData}
          />} ></Route> */}
      </Routes>
      
    </div>
  );
}

export default App;
