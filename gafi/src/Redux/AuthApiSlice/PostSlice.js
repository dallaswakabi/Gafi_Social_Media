import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {posts} from "../AuthReducer/PostReducer"
import { followers } from "../AuthReducer/AuthReducer"

export const postApi = createApi({

  reducerPath:"postApi",
  baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:8000',
  }),
  tagTypes:["Admin","User"],
  endpoints:(builder)=>({
      uploadPost:builder.mutation({
        query:(credential)=>({
            url:'/user/post/create',
            method:"POST",
            body:{...credential}
        })
    }),
    getTimeLine:builder.query({
        query:(id)=>({
           url:`/user/post/${id}/timeline`, 
           method:'GET',
        }),
        async onQueryStarted(args,{dispatch,queryFulfilled}){
          try {
              const response = await queryFulfilled
               if(response?.data){
                dispatch(posts(JSON.stringify(response?.data)))
               }else{
                console.log(response?.error)
               }
              
          } catch (error) {
              console.log(error);
          }
      },
        transformResponse:(response)=>{
         // console.log(response?.data);
          return response;
        }
    }),
    postLiked:builder.mutation({
      query:({_id,id})=>({
       url:`/user/post/likes-post/${id}`,
       method:'PUT',
       body:{_id}
      })
    }),
    getPost:builder.query({
      query:({id})=>({
        url:`/user/post/get-post/${id}`,
        method:'GET',
      }),
      transformResponse:(response)=>{
        console.log(response?.data)
        return response
      }
    }),
    getAllUser:builder.query({
      query:()=>({
        url:`/user/get-all-user/`,
        method:'GET',
      }),
      transformResponse:(response)=>{
        console.log(response?.data)
        return response
      }
    }),
    getUser:builder.query({
      query:(userId)=>({
        url:`/user/get-user/${userId}`,
        method:'GET',
      }),
      transformResponse:(response)=>{
        console.log(response?.data)
        return response?.data
      }
    }),
    getFollower:builder.query({
      query:({Follower_id,info})=>({
         url:`/user/info/${Follower_id}/follow`, 
         method:'PUT',
         body:{...info}
      }),
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
            const response = await queryFulfilled
            if(response?.data){
              dispatch(followers(JSON.stringify(response?.data)))
             }else{
              console.log(response?.error)
             }
            
        } catch (error) {
            console.log(error);
        }
    },
      transformResponse:(response)=>{
        console.log(response?.data);
        return response;
      }
  }),
  })
})

export const {
  useGetTimeLineQuery,
  useUploadPostMutation,
  usePostLikedMutation,
  useGetPostQuery,
  useGetAllUserQuery,
  useGetUserQuery,
  useGetFollowerQuery
}=postApi