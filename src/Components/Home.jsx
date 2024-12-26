import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import './CSS/Home.CSS'

function Home() {
  return (
    <div className="home-container">
    <h1 className="heading">QUICK-CHAT</h1>    
    
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default Home
