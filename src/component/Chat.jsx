import { useEffect, useState, useRef } from "react"
import chat from './chat.css'
import { FaTimes, FaAngleDoubleRight, FaCamera, FaArrowLeft, FaPen, FaPlus } from "react-icons/fa"
import { IoChatbubblesOutline } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { GiMeepleCircle } from "react-icons/gi"
import { BiSearchAlt } from "react-icons/bi"
import Logo from "./Logo"
import img from "../images/noimg.jpg"
import axios from "axios"
const Chat = ({ socket }) => {
    let userToken = localStorage.echatUserToken
    const [fS, setfS] = useState('friend-space-none')
    const [c, setc] = useState('usernone')
    const [pN, setPn] = useState("profile-space-none")
    const [chatNone, setchatnone] = useState("chat-space-none")
    const [chatSpace, setchatSpace] = useState(false)
    const [profileSpace, setProfileSpace] = useState(true)
    const [statusSpace, setStatusSpace] = useState(false)
    const [bringSearch, setbringSearch] = useState(false)
    const [userClass, setuserClass] = useState(true)
    const [chatClass, setChatClass] = useState(true)
    const [profileClass, setprofileClass] = useState(true)
    const [openchat, setOpenChaat] = useState(true)
    const [profileSect, setprofileset] = useState(true)
    const [friendSpace, setfrienSpace] = useState(false)
    const [friendSpaceStyleConditionally, setfiriendSpaceStyleC] = useState(true)

    ///userInfo
    const [userDetails, setUserDetails] = useState({})
    const [untiltrue, setUntillTrue] = useState(false)
    const userInfoEndpoint = `http://localhost:5001/user/userinfo`
    ///Suggested User INfo 
    const [sugestedUser, setSugestedUser] = useState([])
    const suggestedUserEnpoint = `http://localhost:5001/ user/allluser`
    const userInfo = () => {
        axios.get(suggestedUserEnpoint).then((result) => {
            if (result.data.status) {
                setSugestedUser(result.data.status)
            }
        })
        axios.get(userInfoEndpoint).then((result) => {
            if (result.data.status) {
                console.log(result)
                setUntillTrue(true)
                setUserDetails(result.data.result)
            }
        })

    }



    const jwtTokenEndPoint = `http://localhost:5001/user/jwtverification`

    useEffect(() => {
        userInfo()
        axios.get(jwtTokenEndPoint, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((result) => {

        })
        setuserClass(true)
        setc('')


    }, [])
    const chat = () => {
        if (untiltrue) {
            if (socket.current) {
                socket.current.on("user-id", (data) => {
                    socket.current.emit("userDetails", { username: userDetails.userName, userid: data.userid })
                })

            }
        }
    }
    useEffect(() => {

        chat()
    })


    ////Navigation Logic
    const openChat = () => {
        // setchatSpace(true)
        // setc("usernone")
        // setchatnone("")

    }
    const bringchat = () => {
        setchatSpace(true)
        setprofileset(false)
        setfrienSpace(false)
        setchatnone("")
        setc("usernone")
        setfS("friend-space-none")
        setPn("profile-space-none")

    }


    const checkprofile = () => {
        setprofileset(true)
        setchatSpace(false)
        setfrienSpace(false)
        setPn("")
        setc("usernone")
        setfS("friend-space-none")
        setchatnone("chat-space-none")

    }
    const friendList = () => {
        setfrienSpace(true)
        setchatSpace(false)
        setprofileset(false)
        setfS("")
        setc("usernone")
        setPn("profile-space-none")
        setchatnone("chat-space-none")
    }
    const bringsearch = () => {
        setbringSearch(true)
        setOpenChaat(false)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")


    }
    let m = [1, 2, 3, 4, 5, 6, 7]
    const goToChatList = () => {
        setbringSearch(false)
        setOpenChaat(true)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")

    }
    ///Allow u to search for user
    const lookforUser = (e) => {
        setSugestedUser(sugestedUser.filter((user, id) => {
            return (

                user.userName.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
            )


        }))
    }
    const addAsFriend = (mid, id) => {

    }
    const chatWithSuggestedFriend = (username) => {
        socket.current.emit('chat-suggested', { username: username })
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
                                <img src={userDetails.imgURL === "" ? img : ''} alt="" style={{ width: "40px", height: '40px', borderRadius: "40px" }} />
                                <p>{userDetails.username}</p>
                            </div>


                            <div className="icon-boxs">
                                <div className="icons">
                                    <span onClick={() => bringchat()}><IoChatbubblesOutline>26</IoChatbubblesOutline> </span> <button onClick={() => checkprofile()}><CgProfile /> </button><button onClick={() => friendList()}><GiMeepleCircle /> </button><button onClick={() => bringsearch()}><BiSearchAlt /> </button>
                                </div>

                            </div>

                        </div>
                        <div className="chat-div">
                            <div className={userClass ? `user ${c}` : "usernone"} id="userspace">
                                {bringSearch && <> < div className="user-search">
                                    <input type="text" onChange={(e) => lookforUser(e)} /> <button><FaTimes /> </button>
                                </div>
                                    <div className="friend-suggestion">
                                        <div style={{ display: 'flex', justifyContent: "right" }}>
                                            <button><FaTimes /></button>
                                        </div>
                                        <div className="suggested-Friends">
                                            {sugestedUser.map((users, id) => {
                                                return (
                                                    <div className="friendsToBeAdded">
                                                        <div className="suggested-friend-Img-box">
                                                            <img src={img} alt="" />
                                                        </div>
                                                        <p style={{ textAlign: 'center', padding: '10px 0' }}>{users.userName}</p>
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <button onClick={() => addAsFriend(users._id, id)}>Add as friend <FaPlus /> </button>
                                                            <button onClick={() => chatWithSuggestedFriend(users.userName)}><IoChatbubblesOutline /></button>
                                                        </div>
                                                    </div>
                                                )

                                            })
                                            }

                                        </div>

                                    </div> </>}

                                {openchat &&
                                    <div className="contact-space" id="get">
                                        <div className="contact-img">
                                            <img src={img} alt="" />
                                            <div className="number-message">
                                                <p>2</p>
                                            </div>
                                        </div>
                                        <div className="contact-name" onClick={() => openChat()}>
                                            <div className="username">
                                                <h2 className="username-text">Emmey</h2>
                                                <p className="username-message">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, voluptas!</p>
                                            </div>
                                            <div>
                                                <p>2.40pm</p>
                                            </div>
                                        </div>

                                    </div>}


                            </div>
                            <div className="chat-contents">
                                {chatSpace &&
                                    <div className={chatClass ? `chat-space ${chatNone}` : "chat-space-none"} id="chat">
                                        <div className="profile-side">
                                            <button onClick={() => goToChatList()}><FaArrowLeft /> </button><p>Emmanuel</p>
                                        </div>
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

                                    </div>}
                                {profileSect &&
                                    <div className={profileClass ? `profile-space ${pN}` : "profile-space-none"} id="profile">
                                        <div className="profile-side">
                                            <button><FaArrowLeft /> </button><p>Profile</p>
                                        </div>
                                        <div className="img-upload-div">
                                            <div className="img-square">
                                                <img src={img} alt="" />
                                                <label htmlFor="img-upload"><FaCamera />
                                                    <input type="file" hidden id="img-upload" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="about-me">
                                            <p style={{ textAlign: "center" }}>About Me</p>
                                            <div>
                                                <input type="text" />< FaPen className="about-me-pen" />
                                            </div>
                                        </div>
                                        <div className="profile-info">
                                            <p>Email</p>
                                            <input type="text" />
                                        </div>
                                        <div className="profile-info">
                                            <p>Username</p>
                                            <input type="text" />
                                        </div>
                                        <div className="profile-delete">
                                            <button>Delete Account</button>
                                        </div>


                                    </div>}
                                {friendSpace &&
                                    <div className={friendSpaceStyleConditionally ? `friend-space ${fS}` : `kkk`}>
                                        <div style={{ background: '#acd4f7', padding: '5px 0' }}>
                                            <p style={{ color: 'white' }}>Friend List</p>
                                        </div>
                                        <div className="user-search">
                                            <input type="text" placeholder="Search" />
                                        </div>
                                        <div className="friend-suggestion">
                                            <div className="suggested-Friends">
                                                <div className="friendsToBeAdded">
                                                    <div className="suggested-friend-Img-box">
                                                        <img src={img} alt="" />
                                                    </div>
                                                    <p style={{ textAlign: 'center', padding: '10px 0' }}>Emeey</p>
                                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                        <button><IoChatbubblesOutline /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                            </div>

                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Chat