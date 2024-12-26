import { Route, Routes } from "react-router-dom"
import ChatUI from "./Components/ChatUI"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import StartChat from "./Components/StartChat"

function App() {

  return (
    <>
    {/* <Routes>
      <Route path="/" element={<Home />} >
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/chat" element={<ChatUI />} />
    </Routes> */}
    <StartChat />
    </>
  )
}

export default App
