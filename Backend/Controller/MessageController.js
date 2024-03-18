import Message from "../Model/MessageModel.js";

export const addMessage = async(req,res)=>{
    const {senderId,chatId,text} = req.body
    try {
        const result = await Message.create({
            senderId,chatId,text
        })
        res.status(200).json(result)
    } catch (error) { 
        res.status(500).json(error)
    }
}

export const getMessage = async(req,res)=>{
    const {chatId} = req.params
    try {
        const result = await Message.find({chatId})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}