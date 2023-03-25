import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { CSVLink,CSVDownload } from 'react-csv'
import Delete from '../delete'

function getAttendance(){
  let attendance = localStorage.getItem('attendance');
  if(attendance){
    attendance = JSON.parse(attendance);
  }
  else{
    attendance = [];
  }
  return attendance;
}

export default function Attendance({user, selectCourse,nav,attendanceData,setAttendanceData}) {

   const [attendance] = useState(getAttendance());
   const [filteredCourses, setFilteredCourses] = useState([]);
   console.log(filteredCourses);

   useEffect(()=>{
    const filteredData = attendance.filter((data)=>data.courseName === selectCourse)
    setFilteredCourses(filteredData);
   },[selectCourse])
 
  return (
<div className='main'>
          <div className='sub-main'>
  
            <Delete nav={nav} />
  
            <h2 className='heading student-name'>{user?.user.name}</h2>
            
            <div className='student-metadata'>
                
                <span>ID: {user?.instructor.id}</span>
                <span>{selectCourse}</span>
            </div>

            
            <div className='boxes'> 
                
            {
           
                (
                <>
                {/* <h1>Attendance</h1> */}
  {filteredCourses.length>0 ?
                (
                  <>
  <table className='table-container'>
  
  <thead>
    <tr>
      <th>Course ID</th>
      <th>Course Name</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Student ID</th>
      <th>Time In</th>

    </tr>
  </thead>
  <tbody>
    {filteredCourses.map(item => {
      return (
        <tr>
          <td>{ item.courseId }</td>
          <td>{ item.courseName }</td>
          <td>{ item.firstName }</td>
          <td>{ item.lastName }</td>
          <td>{ item.studentId }</td>
          <td>{ item.timeIn }</td>

        </tr>
      );
    })}
  </tbody>
</table>

                  
                  </>
                  
                ) : (<div>data not found</div>) }
                </>
                
                )
                }
              
                <div className='export-container'>
        
        <CSVLink
        className='export-btn'
        data={filteredCourses}
        filename={"att.csv"}
        target="_blank"
      >
        Export
      </CSVLink>
                
                </div>

            </div>
            

        </div>
    </div>  
  )
}
