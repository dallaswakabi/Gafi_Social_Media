import React,{useState,useRef} from 'react'
import './PostShare.css'
import ProfileImage from  '../../img/profileImg.jpg'
import {UilScenery, UilTimes} from "@iconscout/react-unicons"
import {UilPlayCircle} from "@iconscout/react-unicons"
import {UilLocationPoint} from "@iconscout/react-unicons"
import {UilSchedule} from "@iconscout/react-unicons"
//import { useSelector } from 'react-redux'
import {useUploadPostMutation} from "../../Redux/AuthApiSlice/PostSlice"
//import {useUploadPostMutation} from "../../Redux/AuthApiSlice/AuthApi"
//import {useDispatch} from "react-redux"
//import {posts} from '../../Redux/AuthReducer/PostReducer'
import useAuth from "../../Hooks/useAuth"
import { useSelector } from 'react-redux'
const PostShare = () => {
 const [image,setImage] = useState(null)
 const imageRef = useRef()
 const {id} = useAuth()
 const [desc, setDesc] = useState("")
 const [postImage,setPostImage] = useState("")

 const { info } = useSelector((state) => state.Auth);

//const dispatch = useDispatch()
//const [uploadImage] = useUploadImageMutation()
const [uploadPost,{isLoading}] = useUploadPostMutation()

   const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log({id,desc,postImage})
     try {
        const response = await uploadPost({userId:id,desc,image:postImage})
        if(response?.data){
          console.log("Post Created Well")
         // dispatch(posts(JSON.stringify(response?.data)))
         setImage(null)
          setDesc(" ")
       
          }else{
            console.log(response.error.data.message)
          }
     } catch (error) {
      console.log(error)
     }
   }
   const handleImage = (event)=>{
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      setImage(img)
      convertImage(img)
    }
   }
   const convertImage = (img)=>{
      const reader = new FileReader()
        if(img){
          reader.readAsDataURL(img)
          reader.onload = ()=>{
            setPostImage(reader.result)
          }
        }
   }
  return (
    <div className="PostShare">
       <img src={ProfileImage} alt=""/>
       <div>
        <input type="text" placeholder="What's Happening"
         onChange={(e)=>setDesc(e.target.value)}
        />
        <div className='postOptions'>
        <div className='option' style={
          {color:'var(--photo)'}
        }
        onClick={()=>imageRef.current.click()}
        >
          <UilScenery/>
          Photo
        </div>
        <div className='option'
          style={
            {color:'var(--video)'}
          }
        >
          <UilPlayCircle/>
          Video
        </div>
        <div className='option'
          style={
            {color:'var(--location)'}
          }
        >
          <UilLocationPoint/>
          Location
        </div>
        <div className='option'
          style={
            {color:'var(--shedule)'}
          }
        >
          <UilSchedule/>
          Schedule
        </div>
        <button className='button ps-button' onClick={handleSubmit} >
          {isLoading ? "Loading..." : "Share"}
         </button>
        <div style={{display:'none'}}>
         <input type="file" name='myImage' ref={imageRef}
         onChange={handleImage}/>
        </div>
       </div>
       {image && (
        <div className='previewImage'>
       <UilTimes onClick={()=>setImage(null)}/>
       <img src={URL.createObjectURL(image)} alt=''/>
        </div>
       )}
       </div>
       
    </div>
  )
}

export default PostShare
