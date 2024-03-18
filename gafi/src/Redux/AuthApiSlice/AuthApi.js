import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const AuthApi = createApi({

  reducerPath:"authApi",
  baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:8000',
  }),
  tagTypes:["Admin","User"],
  endpoints:(builder)=>({
      signIn:builder.mutation({
          query:(credentials)=>({
              url:'/user/auth/login',
              method:'POST',
              body:{...credentials}
          })
      }),
      signUp:builder.mutation({
          query:(credentials)=>({
              url:'/user/auth/create',
              method:'POST',
              body:{...credentials}
          })
      }),
      uploadPost:builder.mutation({
        query:(credential)=>({
            url:'/user/auth/post',
            method:"POST",
            body:{...credential}
        })
    }),
    getTimeLine:builder.query({
        query:(credential)=>({
           url:'', 
           method:'GET',
           body:{...credential}
        })
    })
  })
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useUploadPostMutation
}=AuthApi