import { useState } from "react"
import Logo from "./Logo"
import { FaTimes, FaSpinner } from "react-icons/fa"
import axios from "axios"
import { useFormik } from "formik"
const Register = () => {
    const [whenClicked, setwhenClicked] = useState(false)
    const [one, setOne] = useState(Math.trunc(Math.random() * 9))
    const [two, setTwo] = useState(Math.trunc(Math.random() * 9))
    const [three, setThree] = useState(Math.trunc(Math.random() * 9))
    const [four, setFour] = useState(Math.trunc(Math.random() * 9))
    const [otp, setOTP] = useState(String(one) + String(two) + String(three) + String(four))
    const signupEndpoint = `http://localhost:5001/user/signup`
    ///form validation
    const [ifValid, setIfValid] = useState()
    const passreqg = /^[\w]{6,}$/
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        onSubmit(values) {
            console.log(values)
            setwhenClicked(true)
        },
        validateOnBlur(values) {
            if (values.email === '' || values.username === '' === values.password === "") {

            }
            if (!passreqg.test(values.password)) {

            }
        }

    })
    let userSchema = {
        Email: formik.values.email,
        userName: formik.values.username,
        password: formik.values.password,
        tokenValidation: false,
        friendList: [],
    }
    let otpSchema = {
        one: one,
        two: two,
        three: three,
        four: four
    }
    const login = () => {

        axios.post(signupEndpoint, { userSchema: userSchema, otpSchema: otpSchema }).then((result) => {

        })

    }

    return (
        <div className="body-login">
            <div className="body-back">
                <form className="form-login" onSubmit={formik.handleSubmit}>
                    <div className="login-form" >
                        <div className="login-input" style={{ marginBottom: "20px" }}>
                            <Logo />
                        </div>

                        <div className="login-input" style={{ marginBottom: "10px" }} >
                            <input type="text" placeholder="Enter your Email" onChange={formik.handleChange} name="email" onBlur={formik.handleBlur} />
                        </div>
                        <div className="login-input" style={{ marginBottom: '10px' }}>
                            <input type="text" placeholder="Enter a username" onChange={formik.handleChange} name="username" />
                        </div>
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