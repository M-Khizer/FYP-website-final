import React, { useEffect } from 'react'

export default function Courses({teacherCourses,userData,setTeacherCourses,nav,
    setSelectCourse,selectCourse}) {

    useEffect(() => {
        handleStudentCourses();   
       }, [userData])
       
       const handleStudentCourses=()=>{
           setTeacherCourses(userData?.instructor.teaching);
       }
       
       const handleCourse=(coursename)=>{
        setSelectCourse(coursename);
        nav('/teacherDashboard')
       }
    
    // console.log(teacherCourses)
  return (
    <div className='main'>
    <div className='sub-main'>

        <h2 className='heading student-name'>{userData?.user.name}</h2>
        
        <div className='student-metadata'>
            
            <span>ID: {userData?.instructor.id}</span>
            {/* <span>{userData?.student.program}</span> */}
        </div>

        
        <div className='boxes'>
        
            
        {
            teacherCourses.map(course=>(
                                   
                <div  className='box-container course 
                dashboard-sub-head' onClick={()=>{handleCourse(course.courseName)}}>
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
