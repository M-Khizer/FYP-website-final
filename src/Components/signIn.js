import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { logDOM } from '@testing-library/react';
export default function SignIn({username,password,nav,setPassword,setUsername,
  userData,setUserData,
}) {
  
  const [error,setError]=useState(false);
    
  
 
  
  const handleSignIn= async (e)=>{
    e.preventDefault();
    
    const res = await axios.post('https://sdok7nl5h2.execute-api.ap-northeast-1.amazonaws.com/prod/logininstructor',{
      username,
      password
    }).catch(error=>{
      showErrorMessage(error.message);
    })
    setUsername('');
    setPassword('');
    const data =  await res.data;
    // console.log(data)
    await setUserData(data);
    localStorage.setItem('token',JSON.stringify(res.data.token));
    // // console.log(data.user.name)

     // console.log(userData);

    nav('/courses');
  }
  
const showErrorMessage = (error) => {
  toast.error("Invalid username or password", {
      position: toast.POSITION.TOP_RIGHT
  });
};
  // console.log(username,password)
  return (
    <div className='main'>
      <div className='sub-main'>
        <h1 className='heading'>Sign In</h1>
        <form className='signin-form' onSubmit={handleSignIn}>

          <div className='email-container' >
            <input type="email" placeholder='Username or email' 
              onChange={(e=>{setUsername(e.target.value)})}
              value={username} required/>
          </div>

          <div className='password-container'>
            <input type="password" placeholder='Password' 
             onChange={(e=>{setPassword(e.target.value)})}
             value={password} required/>
          </div>
          {/* <div className="checkbox-container">
            <input type="checkbox" />
            <label>Keep me signed in</label>
          </div> */}
          <button className='sign-in-btn btn'>Sign In</button>
        </form>
          <ToastContainer/>
      </div>
    </div>
  
  )
}
