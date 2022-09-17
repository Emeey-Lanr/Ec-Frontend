import Socket from "socket.io-client"
import { Route, Routes } from "react-router-dom"
import { useRef, useEffect } from "react"
import Login from "./component/Login"
const App = () => {
  let socket = useRef()
  const socketendpoint = "http://localhost:500/"
  // useEffect(() => {
  //   socket.current = Socket(socketendpoint)
  // }, [])
  return (
    <Routes>
      <Route path="/login" element={<Login socket={socket} />} />
    </Routes>
  )

}
export default App