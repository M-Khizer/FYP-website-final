import axios from 'axios'
import React, { useState } from 'react'

export default function Modify({userData,selectCourse}) {

    const [studentId,setStudentId]=useState('');
    const [student,setStudent]=useState({});

    const handleModify= async(e)=>{
        e.preventDefault();
        const res = await axios.post('https://sdok7nl5h2.execute-api.ap-northeast-1.amazonaws.com/prod/studentinfo',{
            studentId:studentId
        }).then(res=>{
            console.log(res.data)
        })

        // const data = (await res).data;
        // console.log(data)
        
        // setStudent(data)

         if(student.length>0){
            console.log(student.firstName)
         }else{
            console.log('student not found')
         }
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
                
                <form onSubmit={handleModify}>
                    <label>Student Id</label>
                    <input 
                        placeholder='student id'
                        onChange={e=>{setStudentId(e.target.value)}}/>
                    <button>Search</button>
                    <div>{studentId}</div>
                </form>
                
                <div>
                    {/* {student.map(item=>(<h3>{item.firstName}</h3>))} */}
                </div>
            
                
            </div>
            

        </div>
    </div>  

  )
}
