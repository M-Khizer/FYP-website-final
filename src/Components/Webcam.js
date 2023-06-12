import React from 'react'
import { useState,useRef } from "react";
import {QrReader} from "react-qr-reader";
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Delete from '../delete';


export default function Webcam({startScan,userData,selectCourse,nav,setSelectCourse,setSelectCourseId}) {
  
  setSelectCourse(JSON.parse(localStorage.getItem('selectCourse')));

  setSelectCourseId(JSON.parse(localStorage.getItem('selectCourseId')));
  
  const [loadingScan, setLoadingScan] = useState(false);
    // const [data, setData] = useState([]);
    let [lat1,setLat1]=useState(0);
    let [lon1,setLon1]=useState(0);
    // let [alt1,setAlt1]=useState(0);
    
    const [radius,setRadius]=useState(0);
    // const[studentFullName,setStudentFullName]=useState('');
    const[studentFirstName,setStundentFirstName]=useState([]);
    const [studentName,setStudentName]=useState([]);
    const [studentLastName,setStudentLastName]=useState([]);
    const ref= useRef(null)


    const [lat2, setLat2] = useState(0)
        
    const [lon2, setLon2] = useState(0)
    
    
    const [qrClassSection, setQrClassSection] = useState('')
    
    
    const [qrCourseId, setQrCourseId] = useState('')
    
   
    
    const [qrCourseName, setQrCourseName] = useState('')
    
    
    const [qrFirstName, setQrFirstName] = useState('')
    
    const [qrLastName, setQrLastName] = useState('');
    
    const [qrStudentId, setQrStudentId] = useState('');
    
    
    const [qrAltitude, setQrAltitude] = useState(0);
    const [qrTimeIn, setQrTimeIn] = useState('')

    const [stdId,setStdId]=useState([]);

    useEffect(() => {
      
      navigator.geolocation.getCurrentPosition(pos=>{
          console.log("lat1",lat1);
          console.log("lon1",lon1);
          console.log('radius',radius);
          console.log("lat2",lat2);
          console.log("lon2",lon2);
          
          setLat1(pos.coords.latitude);
          setLon1(pos.coords.longitude);
      
          console.log(stdId)

          if(stdId.includes(qrStudentId) === false){
            distance(lat1,lat2,lon1,lon2);
          }
          else{
            showAttendanceError('Attendance has already been marked')
          }
      })
      }, [qrTimeIn]);
      
      
      
      function distance(lat1,lat2, lon1, lon2)
  {
  
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 =  lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;
  
  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.pow(Math.sin(dlon / 2),2);
    
  let c = 2 * Math.asin(Math.sqrt(a));
  
  let r = 6371;
  const rad=(c*r);
  setRadius(rad);
  console.log('distance ',rad);
  if(rad<=1){
    handleAttendance();
  }
  else{
    showAttendanceError('Out of Radius');
  }
  
  }

  const attendance = {
      "classSection": qrClassSection,
      "courseId": qrCourseId,
      "courseName": qrCourseName,
      "firstName": qrFirstName,
      "lastName": qrLastName,
      "studentId": qrStudentId,
      "timeIn": qrTimeIn
  }
  
  const showAttendanceError = (error) => {
    toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
    });
  };
  
  
  const handleAttendance= async()=>{
    console.log(qrStudentId)
      if (qrStudentId){
     
      if(selectCourse.toString() === qrCourseName.toString()){
        
        console.log("Post request hit");

        const res = await axios.post('https://sdok7nl5h2.execute-api.ap-northeast-1.amazonaws.com/prod/attendance',
        attendance).then((data)=>{
          console.log(data.data.attendance.studentId)
          
          setStdId(prev=>[...prev,data.data.attendance.studentId])
          console.log(stdId);

          setStudentName(prev=>[...prev,data.data.attendance.firstName])
          showSuccessMessage();
          
        })
        .catch(e=>{
          showErrorMessage();        
        })
      }

      else{
        showAttendanceError('Wrong Course')    
      }
      }

      else{
        console.log('qr filled null');
      }
      }
      
      const showSuccessMessage = () => {
        toast.success('Attendance marked', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showErrorMessage = (error) => {
      toast.error("Invalid username or password", {
          position: toast.POSITION.BOTTOM_LEFT
      });
    };
  return (
    
    <div className='main'>  
        <div className='sub-main web'>
          <Delete nav={nav} />
        
        <div className='cam-display-container'>
          
        {startScan && (
            <QrReader
                
                onResult={(result, error) => {
                if (result) {
                // console.log(result)
                // setData(prev=>[...prev,result?.text])
               const parseData1 = JSON.parse(result)
               setQrAltitude(parseData1?.altitude);
               setQrClassSection(parseData1?.classSection);
               setQrCourseId(parseData1?.courseId);
               setQrCourseName(parseData1?.courseName);
               setQrFirstName(parseData1?.firstName);
               setQrLastName(parseData1?.lastName);
               setQrStudentId(parseData1?.studentId);
               setQrTimeIn(parseData1?.timeIn);
               setLat2(parseData1?.latitude);
               setLon2(parseData1?.longitude);
               console.log('qr was scanned');
               
              }

        // if (error) {
        //   console.info(error);
        // }
      }}
        // style={{ border:'1px solid orange' }}
        ref={ref}
        
        className='cam-display'
    />
      )}           

        <div className='student-list'>
          <div className='student-names'>
          <h3 className='student'>{studentName.map(name=>(<div>{name}</div>))}</h3>
          <span className='student'>{studentLastName.map(name=>(<span>{name}</span>))}</span>
          <h3></h3>
          </div>
          
        </div>

    </div>
    <ToastContainer/>
{/*         
        <div>
            <button className='btn'>Back</button>
            <button className='btn'>Submit</button>
        </div> */}
    </div>
        
    {/* <button
      onClick={() => {
        setStartScan(!startScan);
      }}
    >
      {startScan ? "Stop Scan" : "Start Scan"}
    </button> */}   
    {/* {console.log(startScan)} */}
        {loadingScan && <p>Loading</p>}
    {/* {data !== "" && <p>{data.map(res=>{
      <li>{res}</li>
    })}</p>} */}
    

   </div>

  )
}

