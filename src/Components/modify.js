import axios from 'axios'
import React, { useState } from 'react'

export default function Modify({userData,selectCourse,selectCourseId}) {

    const [studentId,setStudentId]=useState('');
    const [student,setStudent]=useState({});

    const getStudent=()=>{

    }

    const handleModify= async(e)=>{
        e.preventDefault();
        const res = await axios.post('https://sdok7nl5h2.execute-api.ap-northeast-1.amazonaws.com/prod/studentinfo',{
            studentId:studentId
        })
        // .then(res=>{
        //     console.log(res.data)
        //     // setStudent(res.data)
        // })

        const data = await res.data;
        setStudent(data)
        console.log(student)
    }

    const handleModifyAttendance= async(e)=>{
        console.log(student.student.studentId);
        console.log(student.student.firstName);
        console.log(student.student.lastName);
        console.log(selectCourse);
        console.log(Date().toLocaleString());
        console.log(selectCourseId);
        // console.log(studentId);
        // console.log(studentId);

        e.preventDefault()
        const res = await axios.post("https://sdok7nl5h2.execute-api.ap-northeast-1.amazonaws.com/prod/attendance",{
            timeIn: Date().toLocaleString(),
            studentId: student.student.studentId,
            lastName: student.student.lastName,
            courseId: selectCourseId,
            classSection: student.student.classSection,
            firstName: student.student.firstName,
            courseName:  selectCourse
        }).then(console.log('attendance marked'))
    }

    console.log(student.student)


  return (
    <div className='main'>
        <div className='sub-main'>

            <h2 className='heading student-name'>{userData?.user.name}</h2>
            
            <div className='student-metadata'>
                
                <span>ID: {userData?.instructor.id}</span>
                <span>{selectCourse}</span>
            </div>

            
            <div className='boxes'> 
                
                <form onSubmit={handleModify}>
                    <label>Student Id</label>
                    <input 
                        placeholder='student id'
                        onChange={e=>{setStudentId(e.target.value)}}/>
                    <button>Search</button>
                    {/* <div>{student.firstName}</div> */}
                    
                </form>
                
                <form onSubmit={handleModifyAttendance}>
                    <button>Submit</button>
                </form>
            
                
            </div>
            

        </div>
    </div>  

  )
}
