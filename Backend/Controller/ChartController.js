import Chat from "../Model/ChartModels.js";

export const createChat = async(req,res)=>{
    const {senderId,receivedId} = req.body
    try {
       const result = await Chat.create({members:[senderId,receivedId]})
       res.status(200).json(result) 
    } catch (error) {
        res.status(500).json(error)
    }
}

export const userChats = async(req,res)=>{
    const {userId} = req.params
    try {
        const result = await Chat.find({members:{$in:[userId]}})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const findChat = async(req,res)=>{
    const {firstId,secondId} = req.params
    try {
        const result = await Chat.findOne({members:{$all:[firstId,secondId]}})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }

}