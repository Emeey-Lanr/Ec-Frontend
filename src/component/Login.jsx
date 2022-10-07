import "./login.css"
import { useState } from "react"
import { FaTimes, FaSpinner } from "react-icons/fa"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Logo from "../component/Logo"
const Login = ({ socket }) => {
    const [onclick, setonClick] = useState(false)
    const [ifvalid, setifvalid] = useState(true)
    const [response, setresponse] = useState(false)
    const [message, setMessage] = useState('')

    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [one, setOne] = useState(Math.trunc(Math.random() * 9))
    const [two, setTwo] = useState(Math.trunc(Math.random() * 9))
    const [three, setThree] = useState(Math.trunc(Math.random() * 9))
    const [four, setFour] = useState(Math.trunc(Math.random() * 9))
    const check = /^[\d]{11,14}$/
    const signinEndpoint = `http://localhost:5001/user/login`
    let navigate = useNavigate()
    let userSchema = {
        username: username,
        password: password
    }
    let otpSchema = {
        one: one,
        two: two,
        three: three,
        four: four
    }
    const otpendpoint = 'http://localhost:5001/user/message'
    const proceed = () => {
        setonClick(true)
        axios.post(signinEndpoint, { userSchema: userSchema, otpSchema: otpSchema }).then((result) => {
            if (result.data.status === false) {
                setMessage(result.data.message)
                setresponse(true)
                setonClick(false)
            } else {
                if (result.data.tokenverification) {
                    setresponse(false)
                    localStorage.echatUserToken = result.data.token
                    navigate('/chat')
                } else {
                    axios.get(otpendpoint).then((result) => {
                        if (result.data.status) {
                            navigate('/otpverification')
                        } else {

                        }
                    })
                }
            }

        })
    }

    return (
        <>
            {ifvalid && <div className="body-login">
                <div className="body-back">
                    <div className="form-login">
                        <div className="login-form">
                            <div style={{ display: "flex", justifyContent: 'center' }}>
                                <Logo />
                            </div>

                            <p style={{ textAlign: 'left', marginTop: "10px" }}>Enter Your Username</p>
                            <div className="login-input">
                                <input type="text" disabled={onclick} onChange={(e) => setusername(e.target.value)} />

                            </div>
                            <p style={{ textAlign: 'left' }}>Enter Password</p>
                            <div className="login-input " style={{ marginBottom: '15px' }} >
                                <input type="text" style={{ borderRadius: 'none' }} disabled={onclick} onChange={(e) => setPassword(e.target.value)} />

                            </div>
                            {response && <div style={{ background: "#fd5454e1", padding: "2px 0" }}>
                                <p style={{ color: 'white', textAlign: "center", fontWeight: "0.9rem" }}>{message}</p>
                            </div>}
                        </div>

                        <div className="login-btn">
                            <button disabled={onclick} onClick={() => proceed()}>Login{onclick && <FaSpinner className="spin" />}</button>
                        </div>


                    </div>
                </div>
            </div>}




        </>
    )

}
export default Login 