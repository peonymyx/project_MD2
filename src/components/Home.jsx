import React from 'react'
import { useEffect } from "react"
import jwt from "../service/jwt"
import { userAction } from "../store/slice/user.slice"
import { useSelector, useDispatch } from "react-redux"
export default function Home() {
  const dispatch = useDispatch();
  const userStore = useSelector(store => store.userStore);
  useEffect(() => {

    if (localStorage.getItem("token")) {
      const user = jwt.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY)
      if (user) {
        dispatch(userAction.setData(user))
      }
      else {
        localStorage.clear("token");
        window.location.reload()
      }
    }
    console.log(userStore.data);
  }, [])
  return (
    <div id='main'>
      <div className='Home'>
        
      </div>
    </div>
  )
}
