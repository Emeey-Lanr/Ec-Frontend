import { useEffect, useState, useRef } from "react"
import chat from './chat.css'
import { FaTimes, FaAngleDoubleRight, FaCamera, FaArrowLeft, FaPen, FaPlus, FaBell } from "react-icons/fa"
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
    const [notification, setnotification] = useState(false)


    ///userInfo
    const [userDetails, setUserDetails] = useState({})
    const [untiltrue, setUntillTrue] = useState(false)
    const userInfoEndpoint = `http://localhost:5001/user/userinfo`
    ///Suggested User INfo 

    const [sugestedUser, setSugestedUser] = useState([])
    const [sugested2, setsugested2] = useState([])
    const suggestedUserEnpoint = `http://localhost:5001/user/allluser`
    const chatEndPoint = "http://localhost:5001/chat/saveChatDetails"
    const [data, setdata] = useState('')
    let m = ''
    let suggestedUserInfo = []
    const userInfo = () => {

        axios.get(suggestedUserEnpoint).then((result) => {
            if (result.data.status) {
                setSugestedUser(result.data.result)
                setsugested2(result.data.result)
            }
        })

        axios.get(userInfoEndpoint).then((result) => {
            if (result.data.status) {
                console.log(result)
                setUntillTrue(true)
                setUserDetails(result.data.result)
                console.log(socket.current.id)

                socket.current.emit("userDetails", { username: result.data.result.userName, userid: socket.current.id })
                socket.current.on('info', (data) => {
                    console.log(data)
                })


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

        return (() => {

        })
    }, [])
    //messageToBeRecieved
    const [messageRecieved, setMessageRecieved] = useState({
        user: '',
        uniqueId: '',
        messages: []
    })
    const [senderStyle, setSenderStyle] = useState([{
        width: '60%',
        borderRadius: '60px',
        padding: '10px 5px',
        color: 'white',
        margin: '0 0 0 auto',
    },
    {
        backgroundColor: '#acd4f7',
        borderRadius: '20px',
        paddingRight: '20px',
        paddingLeft: '20px',
    }
    ])
    const [chatList, setChatList] = useState([])
    const [recieverStyle, setRecieverStyle] = useState([{
        width: '60%',
        borderRadius: '60px',
        padding: '10px 5px',
        color: '#acd4f7',
        margin: '0 auto 0 0',
    },
    {
        backgroundColor: 'white',
        borderRadius: '20px',
        paddingRight: '20px',
        paddingLeft: '20px',
    }
    ])
    const chat = () => {

        if (socket.current) {

            socket.current.on('messageSent', (info) => {
                setMessageRecieved(info)
            })

        }

    }
    const chatListt = () => {
        if (socket.current) {
            socket.current.on('chatListList', (info) => {
                setChatList(info)
            })
        }
    }
    const messageSentRecieved = () => {
        if (socket.current) {
            socket.current.on('messageSentRecieved', (info) => {
                setMessageRecieved(info)
            })
        }
    }
    useEffect(() => {

        chat()
    })


    //Responsible for the chat section
    const bringUserChat = () => {
        setchatSpace(true)
        setprofileset(false)
        setfrienSpace(false)
        setchatnone("")
        setc("usernone")
        setfS("friend-space-none")
        setPn("profile-space-none")

    }
    ////Navigation Logic
    const openChat = (user) => {
        let userMessageScema = userDetails.username + user
        let reverseMessage = user + userDetails
        socket.current.emit('userSchema', { one: userMessageScema, two: reverseMessage })



    }

    const bringchat = () => {
        bringUserChat()

    }

    //Allows users to check profile
    const checkprofile = () => {
        setprofileset(true)
        setchatSpace(false)
        setfrienSpace(false)
        setPn("")
        setc("usernone")
        setfS("friend-space-none")
        setchatnone("chat-space-none")

    }

    //Brings out user friend list
    const friendList = () => {
        setfrienSpace(true)
        setchatSpace(false)
        setprofileset(false)
        setfS("")
        setc("usernone")
        setPn("profile-space-none")
        setchatnone("chat-space-none")
    }

    //Bring out the search box

    const bringsearch = () => {
        setbringSearch(true)
        setOpenChaat(false)
        setnotification(false)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")


    }
    ///Take user back to chat list form their chat room
    const goToChatList = () => {
        setbringSearch(false)
        setnotification(false)
        setOpenChaat(true)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")
        socket.current.emit('chatList', { user: userDetails.userName })
        chatListt()

    }

    ///Shows the notifaction page
    const notificationbtn = () => {
        setbringSearch(false)
        setOpenChaat(false)
        setnotification(true)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")


    }
    ///Allow u to search for user
    const lookforUser = (e) => {

        setSugestedUser(sugested2.filter((user, id) => {


            if (user.userName.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
                return user
            }



        }))


    }

    const addAsFriend = (mid, id) => {

    }
    ///Allow you to chat with sugested User
    const [friendToChatWith, setfriendToChatWith] = useState('')
    const [pairId, setPairId] = useState('')
    const [reverserPairId, setReversePairId] = useState('')
    const chatWithSuggestedFriend = (suggestedUsername) => {
        bringUserChat()
        setfriendToChatWith(suggestedUsername)
        setPairId(userDetails.userName + suggestedUsername)
        setReversePairId(suggestedUsername + userDetails.userName)
        let pairId = userDetails.userName + suggestedUsername
        let userMessageScema = {
            user: userDetails.userName,
            talkingTo: suggestedUsername,
            uniqueId: pairId,
            messages: []
        }
        let reverseMessage = {
            user: suggestedUsername,
            talkingTo: userDetails.userName,
            uniqueId: suggestedUsername + userDetails.userName,
            messages: []
        }
        socket.current.emit('userSchema', { one: userMessageScema, two: reverseMessage })

    }
    let date = new Date()
    let currentime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const [messages, setmessages] = useState('')
    const chatWith = () => {
        let chatInfoToBePassed = {
            senderInfo: userDetails.userName,
            recieverInfo: friendToChatWith,
            message: messages,
            pairId: pairId,
            reversepairId: reverserPairId,
            time: currentime

        }

        // messageRecieved.uniqueId = userDetails.userName + friendToChatWith
        // messageRecieved.messages.push({ recieverName: friendToChatWith, message: messages, time: currentime })
        // setMessageRecieved(messageRecieved)
        socket.current.emit('chatWith', chatInfoToBePassed)
        messageSentRecieved()
    }
    const uploadImg = (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
        }

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
                                <p>{userDetails.userName}</p>
                            </div>


                            <div className="icon-boxs">
                                <div className="icons">
                                    <button onClick={() => bringsearch()}><BiSearchAlt /> </button>
                                    <span onClick={() => bringchat()}><IoChatbubblesOutline>26</IoChatbubblesOutline> </span>
                                    <button onClick={() => notificationbtn()}><FaBell /></button>
                                    <button onClick={() => friendList()}><GiMeepleCircle /> </button>
                                    <button onClick={() => checkprofile()}><CgProfile /> </button>

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
                                                        {users.aboutMe !== "" ? <p style={{ textAlign: 'center', padding: '10px 0' }}>{users.aboutMe}</p> : <p></p>}
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

                                    chatList.map((user, id) => {
                                        return (
                                            <div className="contact-space" id="get">
                                                <div className="contact-img">
                                                    <img src={img} alt="" />
                                                    <div className="number-message">
                                                        <p>2</p>
                                                    </div>
                                                </div>
                                                <div className="contact-name" onClick={() => openChat(user.talkingTo)}>
                                                    <div className="username">
                                                        <h2 className="username-text">{user.talkingTo}</h2>
                                                        <p className="username-message">{user.messages[user.messages.length - 1].message}</p>
                                                    </div>
                                                    <div>
                                                        <p>{user.messages[user.messages.length - 1].time}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        )

                                    })
                                }
                                {notification &&
                                    <div className="notification-space" style={{ boxShadow: "none" }} id="get">

                                        <div className="notification-info">
                                            <h2 className="notification-heading">Hey Emmey</h2>
                                            <p className="notification-rInfo">Ayo sent you a firend request</p>
                                        </div>
                                        <div className="notification-action">
                                            <button>Accept</button><button>Delete</button>
                                        </div>
                                    </div>}


                            </div>
                            <div className="chat-contents">
                                {chatSpace &&
                                    <div className={chatClass ? `chat-space ${chatNone}` : "chat-space-none"} id="chat">
                                        <div className="profile-side">
                                            <button onClick={() => goToChatList()}><FaArrowLeft /> </button><p>{friendToChatWith}</p>
                                        </div>
                                        {messageRecieved.messages.map((info, id) => {
                                            return (
                                                <div className="chat-a" style={info.recieverName !== userDetails.userName ? senderStyle[0] : recieverStyle[0]}>
                                                    <div style={info.recieverName !== userDetails.userName ? senderStyle[1] : recieverStyle[1]}>
                                                        <p className="text">
                                                            {info.message}
                                                        </p>
                                                        <p className="date">
                                                            {info.time}
                                                        </p>
                                                    </div>

                                                </div>
                                            )
                                        })}


                                        <div className="send-chat">
                                            <textarea type="text" onChange={(e) => setmessages(e.target.value)}></textarea > <button onClick={() => chatWith()}><FaAngleDoubleRight /> </button>
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
                                                    <input type="file" hidden id="img-upload" onChange={(e) => uploadImg(e)} />
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