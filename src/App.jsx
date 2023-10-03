import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./components/Home"
import Admin from "./pages/Admin"
import { Route, Routes } from 'react-router-dom'
import './main.scss'
import { useEffect } from "react"
import jwt from "./service/jwt"
import { api } from "./service/apis"
import { userAction } from "./store/slice/user.slice"
import { useSelector, useDispatch } from "react-redux"
import { productAction } from "./store/slice/product.slice"
import Personal from "./pages/Personal"
function App() {
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
  }, [])
  useEffect(() => {
    api.productApi.findAll()
    .then(res => {
      dispatch(productAction.setProduct(res.data))
    })
  }, [])
  return (
    <div id="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Information" element={<Personal/>}></Route>
        <Route path='/Login' element={<Login />}> Login </Route>
        <Route path='/Register' element={<Register />}> Register </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
