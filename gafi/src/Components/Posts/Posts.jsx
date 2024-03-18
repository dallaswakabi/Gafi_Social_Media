import React from 'react'
import './Posts.css'
import {useSelector} from "react-redux"
//import {PostData} from '../../Data/PostData'
import Post from '../Post/Post'
import useAuth from "../../Hooks/useAuth"
import { useGetTimeLineQuery } from '../../Redux/AuthApiSlice/PostSlice'

const Posts = () => {
   const post = useSelector((state)=>state?.Post.post)
      console.log(post)
  //const dispatch = useDispatch()
  
  const {id} = useAuth()
  const {data} = useGetTimeLineQuery(id)
  
      return (
        <div className="Posts">
          { data?.data?.map((post,id)=>{
            return <Post data={post} id={id}/>
          }) }
        </div>
      )
}

export default Posts
