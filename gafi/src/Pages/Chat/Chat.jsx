import React,{useState,useEffect, useRef}from 'react'
import './Chat.css'
import LogoSearch from "../../Components/LogoSearch/LogoSearch"
import {useSelector} from "react-redux"
import { useGetChatQuery } from '../../Redux/AuthApiSlice/ChatApi'
import Conversation from "../../Components/Conversation/Conversation"
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import {UilSetting} from "@iconscout/react-unicons"
import {Link} from 'react-router-dom'
import ChatBox from '../../Components/ChatBox/ChatBox'
import {io} from "socket.io-client"
const Chat = () => {
  const {info} = useSelector((state)=>state.Auth)
   console.log(info)
   const [chats,setChats] = useState([])
   const [currentChat,setCurrentChat] = useState(null)
   const [onlineUsers,setOnlineUsers] = useState([])
   const [sendMessage,setSendMessage] = useState(null)
   const [recieveMessage,setRecieveMessage] = useState(null)
   const socket = useRef()

   const response = useGetChatQuery(info._id)

   useEffect(()=>{
       const GetChats = async()=>{
        setChats(response)
       }
       GetChats()
   },[setChats,response])
   
    useEffect(()=>{
      socket.current = io('http://localhost:8800')
      socket.current.emit("new-user-add",info?._id)
      socket.current.on('get-users',(users)=>{
        setOnlineUsers(users)
      })
    },[info])

   // send Message To Server Socket

    useEffect(()=>{
      if(sendMessage !== null){
        socket.current.emit('send-message',sendMessage)
      }
    },[sendMessage])

   // Recieved Message from Server Socket
  
  useEffect(()=>{
    socket.current.on("recieve-message",(data)=>{
     setRecieveMessage(data)
    })
  },[])

   const checkOnlineStatus = (chat)=>{
    const chatMember = chat.members.find((id)=> id !== info?._id)
    const online = onlineUsers.find((user)=>user.userId === chatMember)
    return online?true : false
   }

  return (
    <div className="Chat">
     {/* Left Side */}
     <div className='Left-side-chat'>
        <LogoSearch/>
        <div className='Chat-container'>
          <h2>Chats</h2>
         <div className='Chat-list'>
            {
              chats.map((chat)=>(
                <div onClick={()=>setCurrentChat(chat)}>
                  <Conversation data={chat} currentUserId={info._id} recieveMessage={recieveMessage} online={checkOnlineStatus(chat)}/>
                </div>
              ))
            }
         </div>
        </div>
       
     </div>
      {/* Right Side */}
      <div className='Right-side-chat'>
         <div style={{width:'20rem',alignSelf:'flex-end'}}>
         <div className='navIcons'>
         <Link to={"/home"}><img src={Home} alt=''/></Link> 
          <UilSetting/>
          <img src={Noti} alt=''/>
          <Link to='/chat'>
          <img src={Comment} alt=''/>
          </Link>
        </div> 
          {/* Chat Comments */}
          <ChatBox currentChat={currentChat} currentUserId={info._id} setSendMessage={setSendMessage}/>
         </div>
      </div>
    </div>
  )
}

export default Chat
