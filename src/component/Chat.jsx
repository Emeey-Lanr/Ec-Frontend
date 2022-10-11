import { useEffect, useState, useRef } from "react"
import chat from './chat.css'
import { FaTimes, FaAngleDoubleRight, FaCamera, FaArrowLeft, FaPen, FaPlus, FaBell, FaSpinner } from "react-icons/fa"
import { IoChatbubblesOutline } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { GiMeepleCircle } from "react-icons/gi"
import { BiSearchAlt } from "react-icons/bi"
import Logo from "./Logo"
import img from "../images/noimg.jpg"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import not from "../images/not.png"
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
    const getMyFriendEndpoint = "https://ec-chat.herokuapp.com/user/getMyFriend"
    const [myFriend, setMyFriend] = useState([])
    ///userInfo
    const [changeAboutMeWords, setChangeAboutMeWords] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const [untiltrue, setUntillTrue] = useState(false)
    const userInfoEndpoint = `https://ec-chat.herokuapp.com/user/userinfo`
    ///Suggested User INfo 

    const [sugestedUser, setSugestedUser] = useState([])
    const [sugested2, setsugested2] = useState([])
    const suggestedUserEnpoint = `https://ec-chat.herokuapp.com/user/allluser`

    const peoplchattedwithList = () => {
        setbringSearch(false)
        setnotification(false)
        setOpenChaat(true)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")
    }
    const suggestedUser = () => {
        setbringSearch(true)
        setOpenChaat(false)
        setnotification(false)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")
    }

    const userDetailsFunctionOnly = () => {
        axios.get(userInfoEndpoint).then((result) => {
            if (result.data.status) {
                setUntillTrue(true)
                setUserDetails(result.data.result)
                setChangeAboutMeWords(result.data.result.aboutMe)
            }
        })
    }
    const userDetailsInfo = () => {
        axios.get(userInfoEndpoint).then((result) => {
            if (result.data.status) {
                setUntillTrue(true)
                setUserDetails(result.data.result)
                setChangeAboutMeWords(result.data.result.aboutMe)


                socket.current.emit("userDetails", { username: result.data.result.userName, userid: socket.current.id })
                socket.current.on('info', (data) => {

                })
                socket.current.emit('chatList', { user: result.data.result.userName })


                suggestedUser()



            }
        })
    }
    const [freinds, setFriends] = useState([])
    const friendInfo = () => {

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
                setFriends(result.data.myFriend)
            }
        })


    }

    //////////nOTIFICATION
    const [notifications, setNotifications] = useState([])
    const [notificationNumber, setNotificationNumber] = useState(0)
    const notificationEndpoint = "https://ec-chat.herokuapp.com/user/notification"
    const getNotification = () => {
        axios.get(notificationEndpoint).then((result) => {
            let m = result.data.info.reverse()
            setNotifications(m)
            setNotificationNumber(result.data.notificationpoints)
            console.log(result.data.info.reverse())
        })
    }

    const jwtTokenEndPoint = `https://ec-chat.herokuapp.com/user/jwtverification`
    let navigate = useNavigate()
    useEffect(() => {

        axios.get(jwtTokenEndPoint, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((result) => {
            if (result.data.status) {
                userDetailsInfo()
                getNotification()
                friendInfo()
            } else {
                navigate('/login')
            }
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
        borderRadius: '5px 5px 0 5px',
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
        borderRadius: '5px 5px 5px 0',
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
    ///Takes you to the chat list
    const chatlistt = () => {
        peoplchattedwithList()
        socket.current.emit('chatList', { user: userDetails.userName })
        chatListt()
    }
    ////Navigation Logic
    const [pairId, setPairId] = useState('')
    const [reverserPairId, setReversePairId] = useState('')
    const openChat = (user) => {
        setPairId(userDetails.userName + user)
        setReversePairId(user + userDetails.userName)
        setfriendToChatWith(user)
        let uniqueId = user + userDetails.userName
        socket.current.emit('createdChat', { uniqueId: uniqueId, removenumberID: userDetails.userName + user })
        messageTracked()
        bringUserChat()

    }

    const bringchat = () => {
        chatlistt()

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
    const [searchOff, setsearchOff] = useState(true)
    const bringsearch = () => {
        suggestedUser()
        setsearchOff(true)


    }
    ///Take user back to chat list form their chat room
    const goToChatList = () => {
        chatlistt()

    }

    ///Shows the notifaction page
    const readNotificationEndpoint = "https://ec-chat.herokuapp.com/user/readNotification"
    const notificationbtn = () => {
        setbringSearch(false)
        setOpenChaat(false)
        setnotification(true)
        setc("")
        setPn("profile-space-none")
        setfS("friend-space-none")
        setchatnone("chat-space-none")
        axios.post(readNotificationEndpoint, { notNumber: notificationNumber, userDetails: userDetails.Email }).then((result) => {
            if (result.data.status) {
                getNotification()
                friendInfo()
            } else {
                getNotification()
            }
        })



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

    let addAsFriendEndpoint = "https://ec-chat.herokuapp.com/user/friendRequest"
    const [toKnowIfAdded, settoKnowIfAdded] = useState(true)
    const [numbid, setnumbid] = useState(-1)
    const addAsFriend = (mdId, id, username) => {
        setnumbid(id)
        settoKnowIfAdded(false)
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
            if (result.data.status) {
                setnumbid(-1)
                friendInfo()
                settoKnowIfAdded(true)
            } else {
                friendInfo()
                setnumbid(-1)
            }
        })

    }
    ///DeletE Friend Request
    const deleteEndpoint = "https://ec-chat.herokuapp.com/user/delFriendNotification"
    const [deletId, setdeletId] = useState(-1)
    const deleteNotification = (infoname, id) => {
        setdeletId(id)
        axios.post(deleteEndpoint, { name: infoname }).then((result) => {
            if (result.data.status) {
                getNotification()
                setdeletId(-1)
            } else {
                setdeletId(-1)
            }
        })
    }
    ///Allow you to chat with sugested User
    const [friendToChatWith, setfriendToChatWith] = useState('')
    const chatWithSuggestedFriend = (suggestedUsername, imgUrl) => {
        bringUserChat()
        setfriendToChatWith(suggestedUsername)
        setPairId(userDetails.userName + suggestedUsername)
        setReversePairId(suggestedUsername + userDetails.userName)
        let pairId = userDetails.userName + suggestedUsername
        let userMessageScema = {
            user: userDetails.userName,
            talkingTo: suggestedUsername,
            uniqueId: pairId,
            imgUrl: imgUrl,
            messages: [],
            messagesNumber: 0
        }
        let reverseMessage = {
            user: suggestedUsername,
            talkingTo: userDetails.userName,
            uniqueId: suggestedUsername + userDetails.userName,
            imgUrl: userDetails.imgURL,
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
        setmessages("")
    }
    //create a connection with a friend
    const chatWithAFriend = (suggestedUsername, img) => {
        bringUserChat()
        setfriendToChatWith(suggestedUsername)
        setPairId(userDetails.userName + suggestedUsername)
        setReversePairId(suggestedUsername + userDetails.userName)
        let pairId = userDetails.userName + suggestedUsername
        let userMessageScema = {
            user: userDetails.userName,
            talkingTo: suggestedUsername,
            uniqueId: pairId,
            imgUrl: img,
            messages: [],
            messagesNumber: 0
        }
        let reverseMessage = {
            user: suggestedUsername,
            talkingTo: userDetails.userName,
            uniqueId: suggestedUsername + userDetails.userName,
            imgUrl: userDetails.imgURL,
            messages: [],
            messagesNumber: 0,
        }
        socket.current.emit('userSchema', { one: userMessageScema, two: reverseMessage })
    }
    ///Accept friend request sent
    const acceptFriendEndpoint = "https://ec-chat.herokuapp.com/user/friendRequestAccepted"
    const [accept, setAccept] = useState(false)
    const [acceptid, setacceptid] = useState(-1)
    const acceptFriend = (name, id) => {
        setacceptid(id)
        setAccept(true)
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
        axios.post(acceptFriendEndpoint, { notificationSent: notificationSent, theAcceptedFriend: theAcceptedFriend, userDetails: userDetails.Email }).then((result) => {
            if (result.data.status) {
                getNotification()
                setnumbid(-1)
            } else {
                setnumbid(-1)

            }
        })

    }
    ///Changing Profile
    const [changeAboutMe, setChangeAboutMe] = useState(true)


    //Img Update 
    const [roll, setroll] = useState(false)
    const ImgUpdate = "https://ec-chat.herokuapp.com/user/uploadImg"
    const uploadImg = (e) => {
        setroll(true)
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            axios.post(ImgUpdate, { imgUrl: reader.result }).then((result) => {
                if (result.data.status) {
                    userDetailsFunctionOnly()
                    setroll(false)
                    socket.current.emit("imgUpload", { imgUrl: result.data.imgURL, userDetails: userDetails.userName })
                } else {
                    setroll(false)

                }

            })
        }

    }
    const penWrite = () => {
        setChangeAboutMe(false)
    }
    const cancelAboutMe = () => {
        setChangeAboutMe(true)
        setChangeAboutMeWords(userDetails.aboutMe)
    }

    ///Delete Account
    const [deleteAccModal, setdeleteAccModal] = useState(false)
    const delAccEndpoint = "https://ec-chat.herokuapp.com/user/deleteAccount"
    const deleteAccount = () => {
        setdeleteAccModal(true)

    }
    const removeModal = () => {
        setdeleteAccModal(false)
    }
    const [delMessage, setDelMessage] = useState("")
    let Navigate = useNavigate()
    const [password, setPassword] = useState("")
    const deleteAcc = () => {
        setAccept(true)
        axios.post(delAccEndpoint, { password: password }).then((result) => {
            if (result.data.status) {
                setDelMessage(result.data.message)
                localStorage.removeItem("echatUserToken")
                setTimeout(() => {
                    Navigate("/login")
                }, 1500)
            } else {
                setDelMessage(result.data.message)
                setTimeout(() => {
                    setAccept(false)
                    setDelMessage("")
                    setdeleteAccModal(false)
                }, 1000)
            }

        })
    }
    //upadete yor about me words
    const [spinSave, setSpinSave] = useState(false)
    const aboutMeEndpoint = "https://ec-chat.herokuapp.com/user/aboutMe"
    const updateAboutMeWords = () => {
        setSpinSave(true)
        axios.post(aboutMeEndpoint, { aboutMe: changeAboutMeWords }).then((result) => {
            if (result.data.status) {
                userDetailsFunctionOnly()
                setSpinSave(false)
                setChangeAboutMe(true)
            } else {
                changeAboutMeWords(userDetails.aboutMe)
                setChangeAboutMe(false)
            }

        })
    }
    const searchFriend = (e) => {
        setMyFriend(freinds.filter((friend, id) => {
            if (friend.userName.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
                return friend
            }
        }))
    }

    const offSearch = () => {
        setsearchOff(false)
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
                                <img src={userDetails.imgURL === "" ? not : userDetails.imgURL} alt="" style={{ width: "40px", height: '40px', borderRadius: "40px" }} />
                                <p>{userDetails.userName}</p>
                            </div>


                            <div className="icon-boxs">
                                <div className="icons">
                                    <button onClick={() => bringsearch()}><BiSearchAlt /> </button>
                                    <span onClick={() => bringchat()}><IoChatbubblesOutline></IoChatbubblesOutline> </span>
                                    <button onClick={() => notificationbtn()} style={{ position: "relative" }}><FaBell /> {notificationNumber !== 0 && <sup><span style={{ fontSize: "0.7rem" }}>{notificationNumber}</span></sup>}</button>
                                    <button onClick={() => friendList()}><GiMeepleCircle /> </button>
                                    <button onClick={() => checkprofile()}><CgProfile /> </button>

                                </div>

                            </div>

                        </div>
                        <div className="chat-div">
                            <div className={userClass ? `user ${c}` : "usernone"} id="userspace">
                                {bringSearch && <> {searchOff && < div className="user-search">
                                    <input type="text" onChange={(e) => lookforUser(e)} /> <button onClick={() => offSearch()}><FaTimes /> </button>
                                </div>}
                                    <div className="friend-suggestion">
                                        {/* <div style={{ display: 'flex', justifyContent: "right" }}>
                                            <button><FaTimes /> </button>
                                        </div> */}
                                        <div className="suggested-Friends">
                                            {sugestedUser.map((users, id) => {
                                                return (
                                                    <div className="friendsToBeAdded" key={id}>
                                                        <div className="suggested-friend-Img-box">
                                                            <img src={users.imgURL === "" ? not : users.imgURL} alt="" />
                                                        </div>
                                                        <p style={{ textAlign: 'center', padding: '10px 0' }}>{users.userName}</p>
                                                        {users.aboutMe !== "" ? <p style={{ textAlign: 'center', padding: '10px 0' }}>{users.aboutMe}</p> : <p></p>}
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            {users.status === '' ? < button onClick={() => addAsFriend(users._id, id, users.userName)}>Add as friend {id === numbid ? <FaSpinner className="spin" /> : <FaPlus />}</button> : <></>}
                                                            {users.status === 'b' && < button> pending </button>}
                                                            {users.status === 'a' && < button > Friend</button>}
                                                            <button onClick={() => chatWithSuggestedFriend(users.userName, users.imgURL)}><IoChatbubblesOutline /></button>
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
                                            <div className="contact-space" id="get" key={id}>
                                                <div className="contact-img">
                                                    <img src={user.imgUrl === "" ? not : user.imgUrl} alt="" />
                                                    {user.messagesNumber !== 0 && <div className="number-message">
                                                        <p>{user.messagesNumber}</p>
                                                    </div>}
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
                                        < div className="notification-space" style={{ boxShadow: "none" }} id="get" key={id}>

                                            <div className="notification-info">
                                                <h2 className="notification-heading">Hey {userDetails.userName}</h2>
                                                <p className="notification-rInfo">{info.message}</p>
                                                <p className="notification-rInfo">{info.time}</p>
                                            </div>
                                            <div className="notification-action">
                                                {!info.status && <><button onClick={() => acceptFriend(info.name, id)}>Accept  {id === acceptid && <FaSpinner className="spin" />}</button><button onClick={() => deleteNotification(info.name, id)}>Delete {id === deletId && <FaSpinner className="spin" />}</button></>}
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
                                                <div className="chat-a" key={id} style={info.recieverName !== userDetails.userName ? senderStyle[0] : recieverStyle[0]}>
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
                                            <div className="img-square" style={{ postion: "relative" }}>
                                                <img src={userDetails.imgURL === "" ? not : userDetails.imgURL} alt="" style={{ postion: "absolute", width: "100%", objectFit: "cover" }} />
                                                <label htmlFor="img-upload"><FaCamera />
                                                    {roll && <FaSpinner className="spin" style={{ positon: "absolute", top: "40px", left: "90px", color: "#acd4ff" }} />}
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
                                                        <button onClick={() => updateAboutMeWords()} style={{ border: 'none', background: 'none', color: '#acd4f7', fontSize: "1.1rem", padding: "0 0 0 20px", }}>save {spinSave && <FaSpinner className="spin" />}</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="profile-info">
                                            <p>Email</p>
                                            <input type="text" disabled={true} value={userDetails.Email} />
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
                                            <input type="text" placeholder="Search" onChange={(e) => searchFriend(e)} />
                                        </div>
                                        <div className="friend-suggestion">
                                            <div className="suggested-Friends">
                                                {myFriend.length > 0 ? myFriend.map((freind, id) => (
                                                    <div className="friendsToBeAdded" key={id}>
                                                        <div className="suggested-friend-Img-box">
                                                            <img src={freind.imgURL === "" ? not : freind.imgURL} alt="" />
                                                        </div>
                                                        <p style={{ textAlign: 'center', padding: '10px 0' }}>{freind.userName}</p>
                                                        <p style={{ textAlign: 'center', padding: '5px 0' }}>{freind.aboutMe}</p>
                                                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                            <button onClick={() => chatWithAFriend(freind.userName, freind.imgURL)}><IoChatbubblesOutline /></button>
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
            ///modal
            {deleteAccModal && <div className="delmodal" style={{ width: "100%", height: "100%", position: "fixed", top: "0", background: "#0000008e", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="divmo">
                    <div>
                        < FaTimes style={{ color: "#00000086" }} onClick={() => removeModal()} />
                    </div>
                    <p>Enter your password to delete Account</p>
                    <div className="divinput">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <p style={{ color: 'red', fontSize: "0.9rem", textAlign: 'center' }}>{delMessage}</p>
                    <div className="divbutton">
                        <button onClick={() => deleteAcc()}>Delete{accept && <FaSpinner className="spin" />}</button>
                    </div>
                </div>

            </div>}
        </>
    )
}

export default Chat