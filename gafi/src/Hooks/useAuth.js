import {useSelector} from "react-redux"
import { jwtDecode } from "jwt-decode";


const useAuth = () => {
   const {token} = useSelector((state)=>state.Auth)
 let jwt = jwtDecode
if(token){
  let decoded = jwt(token)
    //console.log(decoded);
  const {name,username,id} = decoded?.userInfo
  return {name,username,id,token}
   }else{
      return{username:"",token:""}
   }
}

export default useAuth
