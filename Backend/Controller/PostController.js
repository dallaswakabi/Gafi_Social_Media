import Post from "../Model/postModel.js"
import User from "../Model/AuthModel.js"
import mongoose from "mongoose"
import Cloudinary from "../Config/Cloudinary.js"
// Create New Post 


export const createPost = async(req,res)=>{
    const {userId,desc,image} = req.body
      console.log({userId,desc,image})
  try {
      
       const cloudinaResult = await Cloudinary.uploader.upload(image,{
          upload_preset:"Samakiba"
       })
       const newPost = await Post.create({userId,desc,image:cloudinaResult})
       console.log(newPost)
    res.status(200).json({message:'Post created',data:newPost})    
  } catch (error) {
      res.status(500).json({message:error.message})
  }

 }

// Get Post

export const getPost = async(req,res)=>{
    const id = req.params.id
       
      try {
        const post = await  Post.findOne({userId:id})
         res.status(200).json({data:post,message:"Post Fetched Well"})
      } catch (error) {
        res.status(500).json({message:error.message})
      }

}

export const updatePost = async(req,res)=>{
    const postId = req.params.id
    const {userId} = req.body
    try {
     const post = await Post.findById(postId)
     if(post.userId === userId){
        await post.updateOne({$set:req.body})
        res.status(200).json({message:'Post Update'})
     }else{
        res.status(403).json({message:"Action forbidden"})
     }        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Delete a post

export const deletePost = async(req,res)=>{
    const id = req.params.id
    const {userId} = req.body
    try {
        const post = await Post.findById(id)
        if(post.userId){
            await post.deleteOne()
            res.status(200).json({message:"post deleted successfully"})
        }else{
            res.status(403).json({message:'Action forbidden'})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// Like Post And Dislike
export const likePost = async(req,res)=>{
    const id = req.params.id
    const {_id} = req.body
     console.log({id,_id})
    try { 
        const post = await Post.findOne({userId:id})
        if(!post.likes.includes(_id)){
            const likepost = await post.updateOne({$push:{likes:_id}},{
                new:true,
                useUnified:false,
                runValidators:true
             })
             console.log(likepost)
            res.status(200).json({message:'Post Liked'})
        }else{
            await post.updateOne({$pull:{likes:_id}})
            res.status(200).json({message:'Post disLiked'})  
        }
    } catch (error) {
        
    }
}
// Get TimeLine Post 
export const getTimeLine = async(req,res)=>{
    const userId = req.params.id
     console.log(req.params.id)
    try {
        const currentUserPosts = await Post.find({userId:userId})
        const followingPosts = await User.aggregate([
            {
                $match:{_id:new mongoose.Types.ObjectId(userId)}
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"userId",
                    as:"followingPosts"
                }
            },{
                $project:{
                    followingPosts:1,
                    _id:0
                }
            }
        ])
        res.status(200).json({data:currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b)=>(
            b.createdAt - a.createdAt
        ))})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}