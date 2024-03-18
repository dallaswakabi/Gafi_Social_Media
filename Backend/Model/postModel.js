import mongoose from "mongoose"


const postSchema = mongoose.Schema({
    userId:{type:String,required:true},
    desc:String,
    likes:[],
    image:{type:Object}
},{timestamps:true})

const Post = mongoose.model('post',postSchema)

export default Post