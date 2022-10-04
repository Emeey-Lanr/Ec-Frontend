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

    ///FriendsInfo 
    const getMyFriendEndpoint = "http://localhost:5001/user/getMyFriend"
    const [myFriend, setMyFriend] = useState([])
    ///userInfo
    const [userDetails, setUserDetails] = useState({})
    const [untiltrue, setUntillTrue] = useState(false)
    const userInfoEndpoint = `http://localhost:5001/user/userinfo`
    ///Suggested User INfo 

    const [sugestedUser, setSugestedUser] = useState([])
    const [sugested2, setsugested2] = useState([])
    const suggestedUserEnpoint = `http://localhost:5001/user/allluser`

    const userInfo = () => {

        axios.get(suggestedUserEnpoint).then((result) => {
            if (result.data.status) {
                setSugestedUser(result.data.result)
                setsugested2(result.data.result)
            }
        })
        ///get friend info
        axios.get(getMyFriendEndpoint).then((result) => {
            if (result.data.status) {
                setMyFriend(result.data.myFriend)
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

    //////////nOTIFICATION
    const [notifications, setNotifications] = useState([])
    const [notificationNumber, setNotificationNumber] = useState(0)
    const notificationEndpoint = "http://localhost:5001/user/notification"
    const getNotification = () => {
        axios.get(notificationEndpoint).then((result) => {
            setNotifications(result.data.info)

            setNotificationNumber(result.data.notificationpoints)
            console.log(result.data.notificationpoints.reverse())
        })
    }

    const jwtTokenEndPoint = `http://localhost:5001/user/jwtverification`

    useEffect(() => {
        getNotification()
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
    const messageTracked = () => {
        if (socket.current) {
            socket.current.on("userTracked", (info) => {
                setMessageRecieved(info)
            })
        }
    }
    useEffect(() => {
        // getNotification()
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
        setfriendToChatWith(user)
        let uniqueId = user + userDetails.userName
        socket.current.emit('createdChat', { uniqueId: uniqueId })
        messageTracked()
        bringUserChat()



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
    let date = new Date()
    let currentime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    let addAsFriendEndpoint = "http://localhost:5001/user//friendRequest"

    const addAsFriend = (mdId, id, username) => {
        console.log(username)
        let moreinfo = {
            userId: mdId,
            userUserName: username
        }
        let notificationSent = {
            name: userDetails.userName,
            time: currentime,
            message: `${userDetails.userName} sent you a friend request`,
            status: false
        }
        axios.post(addAsFriendEndpoint, { notificationSent: notificationSent, moreinfo: moreinfo, userId: id }).then((result) => {

        })

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
            messages: [],
            messagesNumber: 0
        }
        let reverseMessage = {
            user: suggestedUsername,
            talkingTo: userDetails.userName,
            uniqueId: suggestedUsername + userDetails.userName,
            messages: [],
            messagesNumber: 0,
        }
        socket.current.emit('userSchema', { one: userMessageScema, two: reverseMessage })

    }


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

        socket.current.emit('chatWith', chatInfoToBePassed)
        messageSentRecieved()
    }
    //create a connection with a friend
    const chatWithAFriend = (suggestedUsername) => {
        bringUserChat()
        setfriendToChatWith(suggestedUsername)
        setPairId(userDetails.userName + suggestedUsername)
        setReversePairId(suggestedUsername + userDetails.userName)
        let pairId = userDetails.userName + suggestedUsername
        let userMessageScema = {
            user: userDetails.userName,
            talkingTo: suggestedUsername,
            uniqueId: pairId,
            messages: [],
            messagesNumber: 0
        }
        let reverseMessage = {
            user: suggestedUsername,
            talkingTo: userDetails.userName,
            uniqueId: suggestedUsername + userDetails.userName,
            messages: [],
            messagesNumber: 0,
        }
        socket.current.emit('userSchema', { one: userMessageScema, two: reverseMessage })
    }
    ///Accept friend request sent
    const acceptFriendEndpoint = "http://localhost:5001/user/friendRequestAccepted"
    const acceptFriend = (name) => {
        let theAcceptedFriend = {
            name: name,
            userRequestingTo: userDetails.userName
        }
        let notificationSent = {
            name: name,
            time: currentime,
            message: `${userDetails.userName} accepted your friend request`,
            status: true
        }
        axios.post(acceptFriendEndpoint, { notificationSent: notificationSent, theAcceptedFriend: theAcceptedFriend }).then((result) => {

        })

    }
    ///Changing Profile
    const [changeAboutMe, setChangeAboutMe] = useState(true)

    const [changeAboutMeWords, setChangeAboutMeWords] = useState(userDetails.aboutMe)
    //Img Update 
    const ImgUpdate = "http://localhost:5001/user/uploadImg"
    const uploadImg = (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            axios.post(ImgUpdate, { imgUrl: reader.result }).then((result) => {
                console.log(result)
            })
        }

    }
    const penWrite = () => {
        setChangeAboutMe(false)
    }
    const cancelAboutMe = () => {
        setChangeAboutMe(true)
    }
    const deleteAccount = () => {

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
                                    <button onClick={() => notificationbtn()}><FaBell /> <span></span></button>
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
                                            <button><FaTimes /> </button>
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
                                                            {users.status === '' ? < button onClick={() => addAsFriend(users._id, id, users.userName)}>Add as friend <FaPlus /> </button> : <></>}
                                                            {users.status === 'b' && < button> pending </button>}
                                                            {users.status === 'a' && < button > Friend</button>}
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
                                                        <p>{user.messagesNumber}</p>
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
                                    notifications.map((info, id) => (
                                        < div className="notification-space" style={{ boxShadow: "none" }} id="get">

                                            <div className="notification-info">
                                                <h2 className="notification-heading">Hey {userDetails.userName}</h2>
                                                <p className="notification-rInfo">{info.message}</p>
                                                <p className="notification-rInfo">{info.time}</p>
                                            </div>
                                            <div className="notification-action">
                                                {!info.status && <><button onClick={() => acceptFriend(info.name)}>Accept</button><button>Delete</button></>}
                                            </div>
                                        </div>
                                    ))
                                }


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
                                                <input type="text" value={changeAboutMeWords} onChange={(e) => setChangeAboutMeWords(e.target.value)} disabled={changeAboutMe} />
                                                {changeAboutMe ?
                                                    < FaPen onClick={() => penWrite()} className="about-me-pen" style={{ color: '#acd4f7' }} />
                                                    :
                                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <button onClick={() => cancelAboutMe()} style={{ border: 'none', background: 'none', color: '#acd4f7', padding: "0 20px 0 20px", fontSize: "1.1rem", borderRight: "1px solid ash" }}>Cancel</button>
                                                        <button style={{ border: 'none', background: 'none', color: '#acd4f7', fontSize: "1.1rem", padding: "0 0 0 20px", }}>save</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="profile-info">
                                            <p>Email</p>
                                            <input type="text" disabled={true} placholder={userDetails.Email} />
                                        </div>
                                        <div className="profile-info">
                                            <p>Username</p>
                                            <input type="text" disabled={true} placeholder={userDetails.userName} />

                                        </div>
                                        <div className="profile-delete">
                                            <button onClick={() => deleteAccount()}>Delete Account</button>
                                        </div>


                                    </div>}
                                {friendSpace &&

                                    < div className={friendSpaceStyleConditionally ? `friend-space ${fS}` : `kkk`}>
                                        <div style={{ background: '#acd4f7', padding: '5px 0' }}>
                                            <p style={{ color: 'white' }}>Friend List</p>
                                        </div>
                                        <div className="user-search">
                                            <input type="text" placeholder="Search" />
                                        </div>
                                        <div className="friend-suggestion">
                                            <div className="suggested-Friends">
                                                {myFriend.length > 0 ? myFriend.map((freind, id) => (
                                                    <div className="friendsToBeAdded">
                                                        <div className="suggested-friend-Img-box">
                                                            <img src={img} alt="" />
                                                        </div>
                                                        <p style={{ textAlign: 'center', padding: '10px 0' }}>{freind.userName}</p>
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <button onClick={() => chatWithAFriend(freind.userName)}><IoChatbubblesOutline /></button>
                                                        </div>
                                                    </div>
                                                )) : <div>
                                                    <p>Currently don't have a friend</p>
                                                </div>
                                                }

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