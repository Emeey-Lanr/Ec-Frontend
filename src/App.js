import Socket from "socket.io-client"
import { Route, Routes } from "react-router-dom"
import { useRef, useEffect } from "react"
import Login from "./component/Login"
import Chat from "./component/Chat"
import OTP from "./component/OTP"
import Register from "./component/Register"
import LandingPage from "./component/LandingPage"
const App = () => {

  const socketenpoint = "https://ec-chat.herokuapp.com/"
  let socket = useRef()
  useEffect(() => {
    socket.current = Socket(socketenpoint)
  }, [])
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/otpverification" element={<OTP />} />
      <Route path="/chat" element={<Chat socket={socket} />} />
    </Routes>
  )

}
export default App