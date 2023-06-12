import React from 'react'

export default function Delete({nav}) {
    
    const deleteToken=()=>{
        localStorage.removeItem('userData');
        console.log('deleted')
        nav('/');
      }

  return (
    
    <div className='delete'>
        <button onClick={deleteToken} className='dlt-btn' >Log out</button>
    </div>
  
  )
}
