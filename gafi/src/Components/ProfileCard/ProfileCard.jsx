import React from "react";
//import Cover from '../../img/cover.jpg'
//import Profile from '../../img/profileImg.jpg'
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth"

const ProfileCard = ({location}) => {
  const {id} = useAuth()

  const { info } = useSelector((state) => state.Auth);
  const post = useSelector((state)=>state?.Post.post)
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={info.coverPicture ? info.coverPicture : "images/cover.jpg"} alt="" />
        <img
          src={info.profilePicture ? info.profilePicture : "images/DefaultProfile.png"}
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>{info.firstname + " " + info.lastname}</span>
        <span>{info.desc}</span>
      </div>
      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{info.followings.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{info.followers.length}</span>
            <span>Followers</span>
          </div>
          {location === "ProfilePages" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{post.filter((post)=>post.userId === id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "ProfilePages" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${info._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
