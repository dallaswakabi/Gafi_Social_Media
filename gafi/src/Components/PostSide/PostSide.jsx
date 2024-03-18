import React from 'react'
import './PostSide.css'
import PostShare from '../SharePost/PostShare'
import Posts from '../Posts/Posts'
const PostSide = () => {
  return (
    <div className='postSide'>
     <PostShare/>
     <Posts/>
    </div>
  )
}

export default PostSide
