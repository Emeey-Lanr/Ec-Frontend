import "./login.css"
import { FaTimes, FaSpinner } from "react-icons/fa"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const OTP = () => {
    const [one, setOne] = useState(-1)
    const [two, setTwo] = useState(-1)
    const [three, setThree] = useState(-1)
    const [four, setFour] = useState(-1)
    const content = useRef(0)
    const check = () => {
        if (one === -1 || two === -1 || three === -1 || four === -1) {
            console.log(`no`)
        } else if (one > -1 && two > -1 && three > -1 && four - 1) {
            console.log(`yes`)
        }
    }
    const onebox = (e) => {
        setOne(e.target.value)
        check()
    }

    const twobox = (e) => {
        setTwo(e.target.value)
        check()

    }
    const threebox = (e) => {
        setThree(e.target.value)
        check()

    }
    const fourbox = (e) => {
        setFour(e.target.value)
        check()


    }
    let otpSchema = {
        one: one,
        two: two,
        three: three,
        four: four
    }
    const [ifInvalid, setifInvalid] = useState(false)
    const [onbtnClicked, setonbtnClicked] = useState(false)
    const otpVerificationEndPoint = 'http://localhost:5001/user/otpVerifaction'
    let navigate = useNavigate()
    const proceed = () => {
        setonbtnClicked(true)
        axios.post(otpVerificationEndPoint, otpSchema).then((result) => {
            if (result.data.status) {
                navigate('/chat')
            } else {
                setonbtnClicked(false)
                setifInvalid(true)
            }
        })
    }
    const resend = () => {

    }
    return (
        <div className="body-login">
            <div className="body-back">
                <div className="form-login">
                    <div className="login-form">
                        <p>An OTP has been sent to your mail, enter your OTP to proceed</p>
                        <div className="login-input">
                            <input type="text" ref={content} style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "500" }} onChange={(e) => onebox(e)} />
                            <input type="text" style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "500" }} onChange={(e) => twobox(e)} />
                            <input type="text" style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "500" }} onChange={(e) => threebox(e)} />
                            <input type="text" style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "500" }} onChange={(e) => fourbox(e)} />
                        </div>
                    </div>
                    {ifInvalid && <p style={{ textAlign: "center", color: "red", fontSize: "0.9rem" }}>Invalid Pin</p>}
                    <div className="login-btn" style={{ marginTop: "20px" }}>
                        <button onClick={() => proceed()}>Proceed  {onbtnClicked && <FaSpinner className="spin" style={{ color: "white" }} />}</button>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p style={{ color: '#acd4f7' }}> <span style={{ fontSize: '0.9rem' }}>Didn't get an otp code? </span> <button style={{ border: "none", background: 'none', borderBottom: "2px solid #acd4f7", color: '#acd4f7' }} onClick={() => resend()}>Resend</button></p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default OTP