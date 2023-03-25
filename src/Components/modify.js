import axios from 'axios'
    import React, { useState } from 'react'
import Delete from '../delete';

export default function Modify({user,nav,selectCourse,selectCourseId,setSelectCourse,setSelectCourseId}) {

    const [studentId,setStudentId]=useState('');
    const [student,setStudent]=useState({});
    const [studentFirstName,setStudentFirstName]=useState('');
    const [studentLastName,setStudentLastName]=useState('');
    const [studentID,setStudentID]=useState();
    const [date,setDate]=useState();
    
    console.log(date)
    console.log(selectCourse)

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
        setStudentFirstName(data.student.firstName);
        setStudentLastName(data.student.lastName);
        setStudentID(data.student.studentId)
        console.log(student)

        setSelectCourse(JSON.parse(localStorage.getItem('selectCourse')));

        setSelectCourseId(JSON.parse(localStorage.getItem('selectCourseId')));


    }

    const handleModifyAttendance= async(e)=>{
        console.log(student.student.studentId);
        console.log(student.student.firstName)  ;
        console.log(student.student.lastName);
        console.log(selectCourse);
        // console.log(Date().toLocaleString());
        console.log(selectCourseId);
        console.log(date)
        console.log("attendance marked");
        
        console.log(studentId);

        e.preventDefault()
        const res = await axios.post("https://sdok7nl5h2.execute-api.ap-northeast-1.amazonaws.com/prod/attendance",{
            timeIn: date,
            studentId: student.student.studentId,
            lastName: student.student.lastName,
            courseId: selectCourseId,
            classSection: student.student.classSection,
            firstName: student.student.firstName,
            courseName:  selectCourse
        }).then(()=>{
        })
    }

    console.log(user)


  return (
    <div className='main'>
        <div className='sub-main'>
         <Delete nav={nav} />

            <h2 className='heading student-name'>{user?.user.name}</h2>
            
            <div className='student-metadata'>
                
                <span>ID: {JSON.parse(localStorage.getItem('selectCourseId'))}</span>
                <span>{JSON.parse(localStorage.getItem('selectCourse'))}</span>
            </div>  

            
            <div className='boxes'> 
                
                <form onSubmit={handleModify} className='std-search' >
                    <label>Student Id</label>
                    <input 
                        placeholder='student id'
                        onChange={e=>{setStudentId(e.target.value)}}/>
                    <button>Enter</button>
                    {/* <div>{student.firstName}</div> */}
                    
                </form>
                
                <form onSubmit={handleModifyAttendance} className='std-atd-mod'>
                    <button>Submit</button>
                </form>
            
            <div className='student-data-modify'>
                
                <div>Student ID: {studentID}</div>
                <div>First Name: {studentFirstName}</div>
                <div>Last Name: {studentLastName}</div>
                <input type={'date'} onChange={(e)=>{setDate(e.target.value)}}></input>
            </div>
                
            </div>
            

        </div>
    </div>  

  )
}
