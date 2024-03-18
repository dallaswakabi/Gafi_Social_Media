import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    senderId:{
        type:String
    },
    chatId:{
        type:String
    },
    text:{
        type:String
    }
},{
    timeStamp:true
})

const Message = mongoose.model("Message",MessageSchema)
export default Message