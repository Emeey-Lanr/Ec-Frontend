import "./landinpage.css"
import { Link, useNavigate } from "react-router-dom"
import { FaAlignRight, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaRegCopyright, FaSpinner, FaGithub } from "react-icons/fa"
import img from "../images/img.jpg"
import { useState } from "react"
import axios from "axios"

const LandingPage = () => {
    const [modal, setmodal] = useState(false)
    const [rotate, setrotate] = useState({})
    const openModal = () => {
        setrotate({
            transform: "rotate(45deg)",
            transition: "1s all ease-out"
        })
        setmodal(true)
    }
    const removemodal = () => {
        setrotate({})
        setmodal(false)
    }
    let navigate = useNavigate()
    const moveTo = () => {
        navigate('/signin')
    }
    const [con, setcon] = useState(false)
    const contact = () => {
        setcon(true)
    }
    const [info, setinfo] = useState("")
    const off = () => {
        setcon(false)
        setrotate({})
        setinfo('')
    }

    const offmodalBringMessage = () => {
        setmodal(false)
        setcon(true)
        setrotate({})

    }
    const [color, setcolor] = useState("")
    const [spin, setspin] = useState(false)
    const [name, setname] = useState("")
    const [message, setmessage] = useState("")
    const sendMessageEndpoint = "http://localhost:5001/user/sendmeMeassge"
    const sendMessage = () => {
        if (message === '' && name === '') {
            setcolor('red')
            setinfo('Empty Input, put in something')
        } else {
            setspin(true)
            axios.post(sendMessageEndpoint, { name: name, message: message }).then((result) => {
                if (result.data.status) {
                    setinfo(result.data.message)
                    setcolor('green')
                    setTimeout(() => {
                        setcon(false)
                    }, 1500)
                } else {
                    setinfo(result.data.message)
                    setcolor('red')
                    setTimeout(() => {
                        setcon(false)
                    }, 1500)
                }
            })
        }
    }
    return (
        <>
            <div className="header">
                <div className="ec-logo">
                    <div className="log1">
                        <div className="log2">
                            <div className="log3"></div>
                        </div>
                    </div>
                    <h2>Ec</h2>
                </div>
                <div className="linknone">
                    <Link to="/signup" className="link">Signup</Link>
                    <Link to="/login" className="link">Signin</Link>

                </div>
                <div className="linknone">
                    <button onClick={() => contact()}>Contact</button>
                </div>
                <div className="openit">
                    {!modal && <button onClick={() => openModal()} style={rotate}>< FaAlignRight /></button>}
                </div>
            </div>
            <div className="messagepaint"></div>
            <div className="message">

                <div className="messageWord">
                    <h1>Connect, grow and inspire<br /> with a click
                        <span>Connect with you people in real time, no friction</span>
                    </h1>

                </div>
                <div className="messageillustration">
                    <div className="chatlog1">
                        <img src={img} alt="" />
                        <div className="chatmessage1">
                            <span className="chat1">Hi</span>
                            <span className="chat2">How fa?</span>
                            <span className="chat3">How are you doing?</span>
                        </div>
                    </div>
                    <div className="chatlog2">
                        <div className="chatmessage1">
                            <span className="chat1">Hello Dear ❤</span>
                            <span className="chat2">Hello</span>
                            <span className="chat3">I'm good, you?</span>
                        </div>
                        <img src={img} alt="" />
                    </div>
                </div>
            </div>

            <div className="info">
                <div className="info1">
                    <h1>Notification</h1>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <p>
                        Ec always ring the bell for you to hear, if sent messages, friend Request and a lot more,
                        you dont't have to get lost on when it happen, why it has happened. You always get to know and see

                    </p>
                    <div className="btnspace">
                        <button onClick={() => moveTo()}>Explore</button>
                    </div>

                </div>
                <div className="info2">
                    <h1>Request</h1>
                    <p>
                        You get to send you loved ones friend request and they get to see it, Ec allows you to do that.

                    </p>
                    <div className="btnspace">
                        <button onClick={() => moveTo()}>Explore</button>
                    </div>
                </div>

            </div>
            <div>
                <hr />
                <div className="social">
                    <a href="https://twitter.com/Emeey_Lanr"><FaTwitter /> </a><a href="https://instagram.com/Emeey_Lanr"><FaInstagram /></a><a href="https://www.linkedin.com/in/emmanuel-oyelowo-b2363a23a"><FaLinkedinIn /></a><a href="https://github.com/Emeey-Lanr"><FaGithub /></a>
                </div>
                <div className="copyright">
                    <p>Ec </p><p><FaRegCopyright /></p><p> 2022 Oyelowo Emmanuel</p>
                </div>
            </div>
            {con && <div className="contact">
                <div className="contactbox">
                    <FaTimes className="times" onClick={() => off()} />
                    <input type="text" placeholder="Enter your Name" onChange={(e) => setname(e.target.value)} />
                    <p>Enter your message</p>
                    <textarea onChange={(e) => setmessage(e.target.value)} ></textarea>
                    <p style={{ fontSize: "0.9rem", textAlign: "center", color: `${color}` }}>{info}</p>
                    <button onClick={() => sendMessage()}>Send {spin && <FaSpinner className="spin" />}</button>
                </div>
            </div>}
            {
                modal && <> <div className="modal">


                </div>
                    <div className="modalside">
                        <div className="modalsidebtn">
                            <button onClick={() => removemodal()}><FaTimes /></button>
                        </div>
                        <div>

                            <Link to="/signup" className="link1">Signup</Link>
                            <Link to="/login" className="link1">Signin</Link>
                            <p to="/contact" onClick={() => offmodalBringMessage()} style={{ cursor: "pointer" }} className="link1">Contact</p>
                        </div>
                    </div>
                </>
            }

        </>
    )
}
export default LandingPage
