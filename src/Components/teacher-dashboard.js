import React from 'react'
import { useState,useEffect } from 'react';
// import { useEffect } from 'react';

export default function TeacherDashboard({userData,setUserData,nav,setStartScan,
                                            setSelectCourse,selectCourse})
    {
    
    const handleWebcam=()=>{
        setStartScan(true);
        console.log('webcam function clicked');
        nav('/webcam');
    }

    const navToStudentAttendance=()=>{
        console.log('student attendance clicked');
        nav('/attendance');
    }
    console.log(userData)

    const navtoModify=()=>{
        nav('/modify')
    }

  return (
<div className='main'>
        <div className='sub-main'>

            <h2 className='heading student-name'>{userData?.user.name}</h2>
            
            <div className='student-metadata'>
                
                <span>ID: {userData?.instructor.id}</span>
                <span>{selectCourse}</span>
            </div>

            
            <div className='boxes'> 
                
            {
           
                (
                <>
                <button className='box-container'  onClick={e=>{handleWebcam()}}>
                    <div className='dashboard-sub-head' 
                       
                    >Create new attendance</div>

                    <div className='dashboard-btn'>Create</div>
                </button>

                <button className='box-container' onClick={e=>{navToStudentAttendance()}}>
                    <div className='dashboard-sub-head'
                        >Student Attendance</div>
                    <div className='dashboard-btn'>View</div>
                </button>
                <button className='box-container' onClick={e=>{navtoModify()}}>
                    <div className='dashboard-sub-head'
                        >Modify Attendance</div>
                    <div className='dashboard-btn'>View</div>
                </button>
                </>
                
                )
                }
                

                <div>

                
                </div>

            </div>
            

        </div>
    </div>  
    
    )
}
