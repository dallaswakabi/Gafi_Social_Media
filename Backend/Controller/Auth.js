import bcrypt from 'bcrypt'
import User from '../Model/AuthModel.js'
import jwt from "jsonwebtoken"
//import Cloudinary from "../Config/Cloudinary.js"
//import Post from "../Model/postModel.js"

export const registerUser = async(req,res)=>{
   const {username,password, firstname,lastname} = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({username,password:hashedPassword,firstname,lastname})
      await newUser.save()

      res.status(200).json({data:newUser})        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
} 

export const Login = async(req,res)=>{
    const {username,password} = req.body

    try {
        const checkUser = await User.findOne({username})
        if(!checkUser) return res.status(400).json({message:"Email Not Found or Exist!"})
       const comparePass = await bcrypt.compare(password,checkUser.password)
    if(comparePass){
        const accessToken = await jwt.sign({
            "userInfo":{
                id:checkUser?._id,
            username:checkUser?.username,
            name:checkUser?.firstname + "" + checkUser?.lastname
            }},process.env.TOKEN_KEY || "dulla",{expiresIn:'1h'})
            
        res.status(200).json({data:checkUser,token:accessToken})
    }else{
        res.status(400).json({message:"Password doesn't Match!"})
    }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

