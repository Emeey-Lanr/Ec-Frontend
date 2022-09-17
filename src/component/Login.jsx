import "./login.css"
import { useState } from "react"
import { FaTimes } from "react-icons/fa"
const Login = ({ socket }) => {
    const [ifvalid, setifvalid] = useState(true)
    const [search, setsearch] = useState(0)
    const [username, setusername] = useState('')
    const check = /^[\d]{11,14}$/
    const proceed = () => {
        if (check.test(search)) {
            setifvalid(false)
        } else {

        }
    }
    const join = () => {
    }
    return (
        <>
            {ifvalid && <div className="body-login">
                <div className="body-back">
                    <div className="form-login">
                        <div className="login-form">
                            <p>Enter Your Phone Number</p>
                            <div className="login-input">
                                <input type="number" onChange={(e) => setsearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="login-btn">
                            <button onClick={() => proceed()}>Proceed</button>
                        </div>

                    </div>
                </div>
            </div>}
            {!ifvalid && <div className="body-login">
                <div className="body-back">
                    <div className="form-login">
                        <div className="login-form">
                            <p>Pick a UserName</p>
                            <div className="login-input">
                                <input type="text" onChange={(e) => setusername(e.target.value)} />
                            </div>
                        </div>
                        <div className="login-btn">
                            <button onClick={() => join()}>Join</button>
                        </div>

                    </div>
                </div>
            </div>}
        </>
    )

}
export default Login 