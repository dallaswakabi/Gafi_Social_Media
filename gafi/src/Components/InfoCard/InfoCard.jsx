import React, { useState,useEffect} from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModel from "../ProfileModel/ProfileModel";
import { useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth"
import {useParams} from "react-router-dom"
import {useGetPostQuery} from '../../Redux/AuthApiSlice/PostSlice'

const InfoCard = () => {
  const [modelOpened, setModelOpened] = useState(false)
  const [ProfileUser,setProfileUser] = useState({})
  const params = useParams()

  const ProfileUserId = params.id 

  const { info } = useSelector((state) => state.Auth);

  const {id} = useAuth()
  const [getPost] = useGetPostQuery()

// const { info } = useSelector((state) => state.Auth)
  
 useEffect(()=>{
  const fetchProfileUser = async()=>{
    if(ProfileUserId === id){
      setProfileUser(info)
   }else{
   const profileUser =  await getPost(ProfileUserId)
   setProfileUser(profileUser)
   console.log(profileUser)
   }
  }
  fetchProfileUser()
    console.log(ProfileUser)
 },[info,id,getPost,ProfileUserId])  

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {id === ProfileUserId ? (
          <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModelOpened(true)}
          />
          <ProfileModel modelOpened={modelOpened}
          setModelOpened={setModelOpened} data={info}/>
        </div>
        ) : ""}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{ProfileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{ProfileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{ProfileUser.worksAt}</span>
      </div>
      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
