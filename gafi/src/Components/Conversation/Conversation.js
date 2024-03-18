import React, { useEffect, useState } from 'react'
import { useGetUserQuery } from '../../Redux/AuthApiSlice/PostSlice'

const Conversation = ({data,currentUserId,online}) => {
    const [userData,setUserData] = useState(null)

    const userId = data?.members?.filter((id)=>id !== currentUserId)
    const response = useGetUserQuery(userId)
    useEffect(()=>{
      setUserData(response)
    },[response])
  return (
    <>
    <div className='follower conversation'>
       <div>
        {online && <div className='online-dot'></div>}
        
          <img src='' alt='' className='followerImage' style={{width:'50px',height:"50px"}}/>
          <div className='name' style={{fontSize:"0.8rem"}}>
             <span>{userData?.firstname} {userData?.lastname}</span>
             <span>{online ? "Online" : ""}</span>
          </div>
       </div>
    </div>
    <hr style={{width:'85%',border:'0.1px solid #ececec'}}></hr>
    </>

  )
}

export default Conversation