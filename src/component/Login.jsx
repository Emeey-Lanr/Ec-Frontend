import "./login.css"
import { useState } from "react"
import { FaTimes, FaSpinner } from "react-icons/fa"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Logo from "../component/Logo"
const Login = ({ socket }) => {
    const [onclick, setonClick] = useState(false)
    const [nodemailer, setnodemailer] = useState(false)
    const [ifvalid, setifvalid] = useState(true)
    const [proceedto, setproceed] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setusername] = useState('')
    const check = /^[\d]{11,14}$/
    const emailValidationEndpoint = `http://localhost:5001/user/emailVerification`
    let navigate = useNavigate()
    const proceed = () => {
        setonClick(true)
        axios.post(emailValidationEndpoint, { OTP: `EC` + Math.trunc(Math.random() * 1000) + '1', email: email }).then((result) => {
            console.log(result)
            if (result.data.status) {

                navigate('/otpverification')
            } else {
                setonClick(false)
                setifvalid(true)
            }
        })
    }
    const join = () => {
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
                            <p style={{ textAlign: 'left' }}>Enter Your Email</p>
                            <div className="login-input" >
                                <input type="text" disabled={onclick} onChange={(e) => setEmail(e.target.value)} />

                            </div>
                            <p style={{ textAlign: 'left' }}>Enter Password</p>
                            <div className="login-input " style={{ marginBottom: '10px' }} >
                                <input type="text" style={{ borderRadius: 'none' }} disabled={onclick} onChange={(e) => setEmail(e.target.value)} />

                            </div>
                        </div>
                        <div className="login-btn">
                            <button disabled={onclick} onClick={() => proceed()}>Login</button>{onclick && <span className="spin"><FaSpinner className="spin" /></span>}
                        </div>

                    </div>
                </div>
            </div>}




        </>
    )

}
export default Login 