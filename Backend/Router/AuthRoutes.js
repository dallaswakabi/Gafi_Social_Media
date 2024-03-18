import express from "express";
import {registerUser,Login} from "../Controller/Auth.js"


const AuthRoutes = express.Router();

AuthRoutes.post("/auth/create", registerUser);
AuthRoutes.post("/auth/login", Login);
//AuthRoutes.post("/auth/post",createPost)
export default AuthRoutes;
