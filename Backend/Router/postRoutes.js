import express from "express";
import {createPost,getPost,updatePost,deletePost,likePost,getTimeLine} from "../Controller/PostController.js"



const postRoutes = express.Router();

postRoutes.post('/post/create',createPost);
postRoutes.get('/post/get-post/:id',getPost);
postRoutes.put('/post/update-post/:id',updatePost)
postRoutes.delete('/post/delete-post/:id',deletePost)
postRoutes.put('/post/likes-post/:id',likePost)
postRoutes.get('/post/:id/timeline',getTimeLine)

export default postRoutes;







