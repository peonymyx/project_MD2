import React from 'react'
import jwt from '../service/jwt'
import { api } from '../service/apis';
import { useEffect } from 'react';
export default function Login() {
  useEffect(() => {
    if(localStorage.getItem("token")) {
      alert("You are signed in!")
      window.location.href = "/"
    }
  }, [])
  function checkEmail() {
    var email = document.getElementById('mail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
      alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
      email.focus;
      return false;
    }
    else {
      return true;
    }
  }

  async function handleLogin() {
  
    let data = {
      email: document.getElementById("mail").value,
      password: document.getElementById("password").value
    }
    await api.userApi.findByEmail(data.email)
    .then(res => {
      if(res.data.length != 0) {
        
        if(data.password != jwt.verifyToken(res.data[0].password, import.meta.env.VITE_PRIVATE_KEY)) {
          alert("Mật khẩu sai!")
          return
        }
        let token = jwt.createToken(res.data[0])
        localStorage.setItem("token", token)
        window.location.href = "/"
      }else {
        alert("Tài khoản không tồn tai!")
      }
    })
  }

  return (
    <div id='main'>
      <div className='Login'>
        <div id='form'>
          <form id='form_content' >
            <h2 className='form_name'>Đăng Nhập</h2>
            <input type="text" id='mail' placeholder='email' required />

            <input type="password" id='password' placeholder='password' required />

            <button type='submit' onClick={(e) => {
              e.preventDefault();
              if (checkEmail()) {
                handleLogin()
              }

            }}>Đăng nhập</button>
          </form>
        </div>

      </div>
    </div>
  )
}
