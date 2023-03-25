import React, { useEffect } from 'react'
import Delete from '../delete';

export default function Courses({teacherCourses,userData,setTeacherCourses,nav,
    setSelectCourse,selectCourse,setSelectCourseId, user}) {

        console.log(user);

    useEffect(() => {
        handleStudentCourses();   
        // localStorage.setItem('token', JSON.stringify(userData.token));
       }, [user])
       
       const handleStudentCourses=()=>{
           setTeacherCourses(user?.instructor.teaching);
       }
       
       const handleCourse=(coursename,courseId)=>{
        setSelectCourse(coursename);
        localStorage.setItem('selectCourse',JSON.stringify(coursename))
        localStorage.setItem('selectCourseId',JSON.stringify(courseId))
        nav('/teacherDashboard')
       }
    
    // console.log(teacherCourses)
  return (
    <div className='main'>
    <div className='sub-main'>
        <Delete nav={nav} />
        <h2 className='heading student-name'>{user?.user.name}</h2>
        
        <div className='student-metadata'>
            
            <span>ID: {user?.instructor.id}</span>
            {/* <span>{userData?.student.program}</span> */}
        </div>

        
        <div className='boxes'>

        {
            teacherCourses.map(course=>(
                                   
                <div  className='box-container course 
                dashboard-sub-head' onClick={()=>{handleCourse(course.courseName,course.courseId)}}>
                        ({course.courseId}) {course.courseName} 
                    <div className='dashboard-btn'>View</div>
                </div>
                                
            ))
            
        }
            

            <div>

            
            </div>

        </div>
        

    </div>
</div>  

  )
}
