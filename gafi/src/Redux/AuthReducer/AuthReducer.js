import {createSlice} from "@reduxjs/toolkit"

const AuthReducer = createSlice({
    name:"AuthReducer",
    initialState:{
        token:null,
        info:null
    },
    reducers:{
        login:(state,action)=>{
            const {token, data} = JSON.parse(action.payload)
            state.token = token
            state.info = data
        },
        register:(state,action)=>{
            state.info = JSON.parse(action.payload)
        },
        followers:(state,action)=>{
             const {data} = JSON.parse(action.payload)
            state.info = {...state.info,followings:data.followings,followers:data.followers}
        }
    }
})

export const {login,register,followers} = AuthReducer.actions
export default AuthReducer.reducer