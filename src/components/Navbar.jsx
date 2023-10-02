import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate= useNavigate()
  return (
    <div id='Navbar'>
      <div className='Navbar-content'>
        <div className='Navbar_left--content'>
          <div className='content'>
            <div id='header_Logo'>
              <span onClick={() =>{
                navigate('/')
              }}>Wibu</span>
            </div>
              
        </div>
        </div>
        
        <div className='Navbar_mid--content'>
        
        </div>
        <div className='Navbar_right--content'>
          <button onClick={() => {
            navigate('/Login')
          }}>Login</button>
          <button onClick={()=>{
            navigate('/Register')
          }}>Register</button>
        </div>
      </div>
    </div>
  )
}
