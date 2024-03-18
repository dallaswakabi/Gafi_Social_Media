import User from '../Model/AuthModel.js'
import bcrypt from 'bcrypt'



// Get All Users

export const getAllUser = async(req,res)=>{
  try {
    let users = await User.find()
     console.log(users)
    users = users.map((user)=>{
      const {password,...otherDetails} = user._doc
       console.log(otherDetails)
      return otherDetails
    })
    res.status(200).json({data:users})
  } catch (error) {
    res.status(500).json(error)
  }
    
}

//get a User

export const getUser = async(req,res)=>{
    const userId = req.params.id
    try {
      const user = await User.findById(userId)
      if(user){
        const {password,...otherDetails} = user._doc
        res.status(200).json(otherDetails)
      }else{
        res.status(400).json({message:'No such user exists'})
      }  
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const updateUser = async(req,res)=>{
    const id = req.params.id
    const {currentUserId,currentUserAdminState,password} = req.body
    if(id === currentUserId || currentUserAdminState){
      try {
        if(password){
            const salt =await  bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(password,salt) 
        }
        const user = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }  
    }else{
        res.status(403).json({message:'Access Denied'})
    }
    
}
export const deleteUser = async(req,res)=>{
    const id = req.params.id
    const {currentUserId,currentUserAdminState,password} = req.body
    if(id === currentUserId || currentUserAdminState){
      try {
        const user = await User.findByIdAndDelete(id)
        res.status(200).json("user Deleted SuccessFully")
    } catch (error) {
        res.status(500).json({message:error.message})
    }  
    }else{
        res.status(403).json({message:'Access Denied'})
    }
    
}
export const followUser = async(req,res)=>{
  const id = req.params.id
  const {_id} = req.body
   console.log({id,_id})
  if(_id === id){
    res.status(403).json({message:'Access forbidden'})
   }else{
    try {
      const followUser =  await User.findById(id)
      const followingUser = await User.findById(_id)
      if(!followUser.followers.includes(_id)){
          await followUser.updateOne({$push:{followers:_id}})
          await followingUser.updateOne({$push:{followings:id}})
          res.status(200).json({message:"User Followed"})
      }else{
        res.status(403).json({message:"User is Already followed"})
      }
    } catch (error) {
      res.status(500).json({message:error.message})
    }
   
   }
  
}

// UnFollower 

export const unFollowUser = async(req,res)=>{
  const id = req.params.id
  const {currentUserId} = req.body

  if(currentUserId === id){
    res.status(403).json({message:'Access forbidden'})
   }else{
    try {
      const followUser =  await User.findById(id)
      const followingUser = await User.findById(currentUserId)
      if(followUser.followers.includes(currentUserId)){
          await followUser.updateOne({$pull:{followers:currentUserId}})
          await followingUser.updateOne({$pull:{followings:id}})
          res.status(200).json({message:"User unFollowed"})
      }else{
        res.status(403).json({message:"User is not followed"})
      }
    } catch (error) {
      res.status(500).json({message:error.message})
    }
   
   }
  
}


