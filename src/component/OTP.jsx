import "./login.css"
import { FaTimes, FaSpinner } from "react-icons/fa"
import { useRef, useState } from "react"
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
                    <div className="login-btn">
                        {/* <button >Proceed</button> */}
                        <FaSpinner className="spin" style={{ color: "#acd4f7" }} />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default OTP