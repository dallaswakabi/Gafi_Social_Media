import React, { useEffect, useRef, useState } from "react";
import { useGetUserQuery } from "../../Redux/AuthApiSlice/PostSlice";
import { useAddMessageMutation, useGetMessageQuery } from "../../Redux/AuthApiSlice/ChatApi";
import {format} from "timeago.js"
import InputEmoji from "react-input-emoji"


const ChatBox = ({ currentChat, currentUserId,setSendMessage,recieveMessage}) => {
  const [userData, setUserData] = useState(null);
  const [Message, setMessage] = useState([]);
  const [newMessage,setNewMessage] = useState("")
  const scroll = useRef()

  const [getUser] = useGetUserQuery();
  const [getMessage] = useGetMessageQuery();
  const [addMessage] = useAddMessageMutation()

 useEffect(()=>{
    if(recieveMessage !== null && recieveMessage?.chatId === currentChat?._id){
      setMessage([...Message,recieveMessage])
    }
 },[recieveMessage])

  // Fetch User Data
  useEffect(() => {
    const userId = currentChat?.members?.filter((id) => id !== currentUserId);
    const FetchUser = async () => {
      try {
        const response = await getUser(userId);
        setUserData(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat !== null) FetchUser();
  }, [currentChat, currentUserId, getUser]);

  // Fetch User Message

  useEffect(() => {
    const FetchMessage = async () => {
      try {
        const response = await getMessage(currentChat._id);
        setMessage(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat !== null) FetchMessage();
  }, [currentChat, getMessage]);

  const handleChange = (newMessage)=>{
    setNewMessage(newMessage)
  }

  const handleSend = async(e)=>{
    e.preventDefault()
    const message = {
      senderId:currentUserId,
      text:newMessage,
      chatId:currentChat._id
    }
    try{
      const {data} = await addMessage(message)
      setMessage([...message,data])
      setNewMessage("")
    }catch(error){
      console.log(error)
    }

     //Send Message To socket Server

     const receiverId = currentChat.members.find((id)=>id!==currentUserId)
        setSendMessage({...message,receiverId})
  }
 
  useEffect(()=>{
    scroll.current?.scrollInterView({behavior:"smooth"})
  },[Message])

  return (
    <>
      <div className="ChatBox-container">
       {currentChat ? (
         <>
         <div className="chat-header">
           <div className="follower">
             <div>
               <img
                 src=""
                 alt=""
                 className="followerImage"
                 style={{ width: "50px", height: "50px" }}
               />
               <div className="name" style={{ fontSize: "0.8rem" }}>
                 <span>
                   {userData?.firstname} {userData?.lastname}
                 </span>
               </div>
             </div>
           </div>
           <hr style={{ width: "85%", border: "0.1px solid #ececec" }}></hr>
         </div>
         {/* ChatBox Message */}
         <div className="chat-body">
           {Message?.map((message) => (
             <>
               <div ref={scroll}
                 className={
                   message?.senderId === currentUserId
                     ? "message own"
                     : "message"
                 }
               >
                 <span>{message?.text}</span>
                 <span>{format(message?.createdAt)}</span>
               </div>
             </>
           ))}
         </div>
         {/* Chat Sender */}
          <div className="chat-sender">
              <div>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>Send</div>
          </div>
       </>
       ) : (
        <span className="chatbox-empty-message">Tap on a Chat to start Conversation</span>
       )}
      </div>
    </>
  );
};

export default ChatBox;
