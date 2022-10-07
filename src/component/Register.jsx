import { useState } from "react"
import Logo from "./Logo"
import { FaTimes, FaSpinner } from "react-icons/fa"
import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const [whenClicked, setwhenClicked] = useState(false)
    const [one, setOne] = useState(Math.trunc(Math.random() * 9))
    const [two, setTwo] = useState(Math.trunc(Math.random() * 9))
    const [three, setThree] = useState(Math.trunc(Math.random() * 9))
    const [four, setFour] = useState(Math.trunc(Math.random() * 9))
    const [otp, setOTP] = useState(String(one) + String(two) + String(three) + String(four))
    const signupEndpoint = `http://localhost:5001/user/signup`
    ///form validation
    const [emailValidation, setemailValidation] = useState(false)
    const [duplicateEmail, setduplicateEmail] = useState(false)
    const [userNameValidation, setuserNameValidation] = useState(false)
    const [passwordValidation, setpasswordValidation] = useState(false)
    const [duplicateUserName, setduplicateUserName] = useState(false)
    const [emailUsernameMessage, setemailUsernameMessage] = useState('')

    const [ifValid, setIfValid] = useState()
    const passwordRegex = /^[\w]{6,20}$/
    const emailRegex = /^([\w]+)\@([\w]{5,9})\.([\w]{3,})$/
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        onSubmit(values) {
            console.log(values)

        },
        validate(values) {
            if (!emailRegex.test(values.email)) {
                setemailValidation(true)
            } else {
                setemailValidation(false)
            }
            if (!passwordRegex.test(values.password)) {
                setpasswordValidation(true)
            } else {
                setpasswordValidation(false)
            }
            if (values.username === '') {
                setuserNameValidation(true)
            } else {
                setuserNameValidation(false)
            }
        }

    })
    let userSchema = {
        Email: formik.values.email,
        userName: formik.values.username,
        password: formik.values.password,
        imgURL: "",
        aboutMe: "",
        ecIdentifier: "EC_Certified_User",
        tokenValidation: false,
        friendList: [],
        notificationNumber: [0, 0],
        notification: [],
        status: '',
    }
    let otpSchema = {
        one: one,
        two: two,
        three: three,
        four: four
    }
    const setwhenClickedTo = () => {
        setwhenClicked(false)
    }
    let navigate = useNavigate()
    const otpendpoint = 'http://localhost:5001/user/message'
    const login = () => {
        console.log(formik.values)
        if (emailRegex.test(formik.values.email) && passwordRegex.test(formik.values.password) && formik.values.username !== '') {
            setwhenClicked(true)
            axios.post(signupEndpoint, { userSchema: userSchema, otpSchema: otpSchema }).then((result) => {
                if (result.data.status) {
                    localStorage.echatUserToken = result.data.token
                    axios.get(otpendpoint, { otp: true }).then((result) => {
                        console.log(result)
                        if (result.data.status) {
                            navigate("/otpverification")
                            setwhenClickedTo()

                        } else {
                            navigate("/chat")
                            setwhenClickedTo()
                        }
                    })
                } else {
                    if (result.data.duplicateEmail) {
                        setduplicateEmail(true)
                        setemailUsernameMessage(result.data.message)
                        setwhenClickedTo()
                    } else if (result.data.duplicateUserName) {
                        setduplicateUserName(true)
                        setemailUsernameMessage(result.data.message)
                        setwhenClickedTo()
                    }
                }

            })
        }


    }

    return (
        <div className="body-login">
            <div className="body-back">
                <form className="form-login" onSubmit={formik.handleSubmit}>
                    <div className="login-form" >
                        <div className="login-input" style={{ marginBottom: "20px" }}>
                            <Logo />
                        </div>
                        {emailValidation && <p style={{ color: "#ff4141", fontSize: '0.9rem', textAlign: "left", fontWeight: "600" }}>Invalid Email</p>}
                        {duplicateEmail && <p style={{ color: "#ff4141", fontSize: '0.9rem', textAlign: "left" }}>{emailUsernameMessage}</p>}
                        <div className="login-input" style={{ marginBottom: "10px" }} >
                            <input type="text" placeholder="Enter your Email" onChange={formik.handleChange} name="email" onBlur={formik.handleBlur} />
                        </div>
                        {userNameValidation && <p style={{ color: "#ff4141", fontSize: '0.9rem', textAlign: "left", fontWeight: "600" }}>This field is required</p>}
                        {duplicateUserName && <p style={{ color: "#ff4141", fontSize: '0.9rem', textAlign: "left", fontWeight: "600" }}>{emailUsernameMessage}</p>}
                        <div className="login-input" style={{ marginBottom: '10px' }}>
                            <input type="text" placeholder="Enter a username" onChange={formik.handleChange} name="username" />
                        </div>
                        {passwordValidation && <p style={{ color: "#ff4141", fontSize: '0.9rem', textAlign: "left", fontWeight: "600" }}>Password must be aleast 6 characters</p>}
                        <div className="login-input" style={{ marginBottom: '10px' }}>
                            <input type="text" placeholder="Enter your password" onChange={formik.handleChange} name="password" onBlur={formik.handleBlur} />
                        </div>

                    </div>
                    <div className="login-btn">
                        <button onClick={() => login()}>Signup   {whenClicked && <FaSpinner style={{ color: "white" }} className="spin" />}</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register