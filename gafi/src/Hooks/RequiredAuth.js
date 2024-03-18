import useAuth from "./useAuth"
import {Navigate,useLocation} from "react-router-dom"


const RequiredAuth = ({children}) => {
     const location = useLocation()
     const {token} = useAuth()
     if(!token) return <Navigate to='/' state={{from:location}} replace/>
    
    return children
}

export default RequiredAuth
