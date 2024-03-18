import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    members:{
        type:Array
    },
},{
    timeStamp:true
})

const Chat = mongoose.model("Chat",ChatSchema)

export default Chat
