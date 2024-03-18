import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
//import {Followers} from "../../Data/FollowersData"
import { useGetAllUserQuery,useGetFollowerQuery} from '../../Redux/AuthApiSlice/PostSlice'
import useAuth from "../../Hooks/useAuth"
import { useSelector } from 'react-redux'

const FollowersCard = () => {
    const [persons,setPersons] = useState([])
    const response = useGetAllUserQuery()
    const [Follower_id,setFollower_id,] = useState("")

 

    const {id} = useAuth()
    const { info } = useSelector((state) => state.Auth);
      console.log(info)
    useEffect(()=>{
       const fetchFollower = async()=>{
        console.log(response?.data?.data)
       setPersons(response?.data?.data)
       }
       fetchFollower()
       console.log(info)
     },[response,info])

  const HandleFollower = async(_id)=>{
    console.log(_id)
      setFollower_id(_id) 
  }
  const responsed = useGetFollowerQuery({Follower_id,info})

  console.log(Follower_id)

  return (
    <div className='FollowersCard'>
      <h3>People You May Know</h3>
       {
        persons?.map((follower,ids)=>{
            if(follower._id !== id){
                return(
                    <div className='follower' key={ids}>
                        <div>
                            <img src={follower.img} alt=''
                             className='followerImage'/>
                             <div className='name'>
                                <span>{follower.firstname}</span> 
                                <span>@{follower.username}</span>
                            </div>  
                        </div>
                        <button className='button fc-button' onClick={()=>HandleFollower(follower._id)}>
                            Follow
                        </button>
                    </div>   
                )
            }
        })
       }
    </div>
  )
}

export default FollowersCard
