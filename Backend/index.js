import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoutes from './Router/AuthRoutes.js'
//import userRoutes from './Router/userRoutes.js'
//import postRoutes from './Router/postRoutes.js'
//import UploadRoutes from './Router/UploadRoutes.js'
import cors from "cors"
import CorsOption  from './Cors/CorsOption.js'
import { createPost, deletePost, getPost, getTimeLine, likePost, updatePost } from './Controller/PostController.js'
import { followUser, getAllUser, getUser } from './Controller/userController.js'
import { userChats } from './Controller/ChartController.js'
import { addMessage, getMessage } from './Controller/MessageController.js'

dotenv.config()

const app = express()
app.use(cors(CorsOption))
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))



const Port = process.env.PORT || 8000
const DB_URL = process.env.DB_URL

// endpoints of Post 
 
app.post('/user/post/create',createPost)
app.get('/user/post/get-post/:id',getPost);
app.put('/user/post/update-post/:id',updatePost)
app.delete('/user/post/delete-post/:id',deletePost)
app.put('/user/post/likes-post/:id',likePost)
app.get('/user/post/:id/timeline',getTimeLine)
app.get('/user/get-all-user/',getAllUser)
app.get('/user/get-user/:id',getUser)
app.put('/user/info/:id/follow',followUser)
app.get('/user/chat/:id',userChats)
app.get('/user/get-message/:id',getMessage)
app.get('/user/create-message',addMessage)
app.listen(Port,async()=>{
    try {
      const db  = await mongoose.connect(DB_URL,
         {useNewUrlParser:true},
        { useUnifiedTopology: true },
        {useFindAndModify:false},
        {useCreateIndex:true})
      if(db){
        console.log("Database Connected Successfully!")
        console.log(`server is listening on port of ${Port}`)
      }else{
        console.log("Database Failed To Connected")
      }
    } catch (error) {
      console.log(error)
    }
  })

// Usage oF ROUTES

app.use('/user',AuthRoutes)

// end of usage of routes



//app.use('/user',userRoutes)
//app.use('/user',postRoutes)
//app.use('/upload',UploadRoutes)
