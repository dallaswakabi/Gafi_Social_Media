import React, { useState } from "react";
import "./Auth.css";
import logo from "../../img/logo.png";
import { useDispatch } from "react-redux";
import {login,register} from "../../Redux/AuthReducer/AuthReducer"
import {useSignInMutation,useSignUpMutation} from "../../Redux/AuthApiSlice/AuthApi"
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setSignup] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    confirmPass: "",
    password: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const [signIn,{isError}] = useSignInMutation()
  const [signUp] = useSignUpMutation()

  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
       e.preventDefault()
     if(isSignup){

      try {
        const response = await signUp({firstname:data.firstname,lastname:data.lastname,
           username:data.username,confirmPassword:data.confirmPass,password:data.password})
       if(response?.data){
         dispatch(register(JSON.stringify(response?.data?.data)))
       }else{
        setError(response?.error?.data?.message);
       }
      } catch (error) {
        console.log(error)
      }
     }else{

      try {
     const response = await signIn({username:data.username,password:data.password});
     if (response?.data) {
       dispatch(login(JSON.stringify(response?.data)));
       navigate("/home");
     } else {
       if (response?.error?.status === 400) {
         setError(response.error.data.message);
       }
     }
   } catch (error) {
       console.log(error)
   }
     }
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={logo} alt="" />
        <div className="webname">
          <h1>Gafi Chart</h1>
          <h6>Explore the idea Throughout the World</h6>
        </div>
      </div>
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignup ? "Sign Up" : "Login"}</h3>
          {isError ? (
            <span
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: "12px",
                alignSelf: "center",
                padding: "10px",
                width:"60%",
                height:'30%'
              }}
            >
              {error}
            </span>
          ) : (
            ""
          )}
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {isSignup && (
              <input
                type="password"
                className="infoInput"
                name="confirmPass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => setSignup((prev) => !prev)}
            >
              {isSignup
                ? "Already Have account. Login"
                : "Already Have account. SignUp"}
            </span>
          </div>
          <button className="button infoButton" type="submit" >
            { isSignup ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
