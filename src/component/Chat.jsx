import { useEffect, useState } from "react"
import chat from './chat.css'
import { FaTimes, FaAngleDoubleRight } from "react-icons/fa"
import { IoChatbubblesOutline } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { GiMeepleCircle } from "react-icons/gi"
import { BiSearchAlt } from "react-icons/bi"
import Logo from "./Logo"
import img from "../images/noimg.jpg"
const Chat = ({ socket }) => {
    const [bringSearch, setbringSearch] = useState(false)
    const [searchistory, setsearchsi] = useState([])
    // const [name, setname] = useState('Emmanuel')
    // const [socketid, setsocketid] = useState('')
    // const chat = () => {

    //     if (socket.current) {
    //         socket.current.emit('sendName', { name: name })
    //         socket.current.on('message', (data) => {
    //             console.log(data)
    //             setsocketid(data.id)
    //         })
    //     }
    // }
    // useEffect(() => {

    //     chat()
    // })
    const bringsearch = () => {
        setbringSearch(true)
    }
    return (
        <>
            <div className="chat-nav">
                <div className="chat-dark">
                    <div className="chat">
                        <div className="chat-logo">
                            <Logo />
                        </div>
                        <div className="chat-icon">
                            <div className="user-img">
                                <img src={img} alt="" style={{ width: "40px", height: '40px', borderRadius: "40px" }} />
                                <p>Oyelowo Emmauel</p>
                            </div>


                            <div>
                                <div>
                                    <span><IoChatbubblesOutline>26</IoChatbubblesOutline> </span> <button><CgProfile /> </button><button><GiMeepleCircle /> </button><button onClick={() => bringsearch()}><BiSearchAlt /> </button>
                                </div>

                            </div>

                        </div>
                        <div className="chat-div">
                            <div className="user">
                                {bringSearch && < div className="user-search">
                                    <input type="text" /> <button><FaTimes /> </button>
                                </div>}
                                <div className="contact-space">
                                    <div className="contact-img">
                                        <img src={img} alt="" />
                                        <div className="number-message">
                                            <p>2</p>
                                        </div>
                                    </div>
                                    <div className="contact-name">
                                        <div className="username">
                                            <h2 className="username-text">Emmey</h2>
                                            <p className="username-message">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, voluptas!</p>
                                        </div>
                                        <div>
                                            <p>2.40pm</p>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="chat-contents">
                                <div className="chat-space">
                                    <div className="chat-a">
                                        <div>
                                            <p className="text">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique dicta nisi, quia aliquam ea esse aliquid eius explicabo commodi aspernatur?
                                            </p>
                                            <p className="date">2.30pm</p>
                                        </div>

                                    </div>

                                    <div className="send-chat">
                                        <textarea type="text" ></textarea > <button><FaAngleDoubleRight /> </button>
                                    </div>

                                </div>
                                <div className="profile-space">

                                </div>
                                <div className="status-space">

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Chat