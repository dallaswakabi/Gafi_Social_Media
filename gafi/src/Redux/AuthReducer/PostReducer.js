import {createSlice} from "@reduxjs/toolkit"


const PostReducer = createSlice({
    name:"PostReducer",
    initialState:{
        post:[]
    },
    reducers:{
        posts:(state,action)=>{
            let {data} = JSON.parse(action.payload)
             console.log({data})
            state.post.push({...data})
        }
    }
    })

    export const {posts} = PostReducer.actions
    export default PostReducer.reducer