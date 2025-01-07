import { Route, Routes } from "react-router-dom"
import ChatUI from "./Components/ChatUI"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import UserContextProvider from "./Components/store/UserContextProvider"
import Admin from "./Components/Admin"
import { useEffect } from "react"
import axios from "axios"

function App() {

  useEffect( async ()=>{
    try {
      let res = await axios.get(`${import.meta.env.VITE_API_URL}`)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },[])

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/chat" element={<ChatUI />} />
      <Route path={`/${import.meta.env.VITE_ADMIN_URL}`} element={<Admin />} />
    </Routes>
    {/* <StartChat /> */}
    </UserContextProvider>
  )
}

export default App
