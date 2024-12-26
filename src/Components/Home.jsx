import { Outlet } from 'react-router-dom'
import './CSS/Home.CSS'

function Home() {
  return (
    <div className="HomeBody">
    <h1 className="heading">QUICK-CHAT</h1>    
    <Outlet />
    </div>
  )
}

export default Home
