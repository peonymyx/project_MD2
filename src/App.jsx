import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./components/Home"
import Admin from "./pages/Admin"
import { Route, Routes } from 'react-router-dom'
import './main.scss'
function App() {

  return (
    <div  id="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Admin" element={<Admin/>}></Route>
        <Route path='/Login' element={<Login />}> Login </Route>
        <Route path='/Register' element={<Register />}> Register </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
