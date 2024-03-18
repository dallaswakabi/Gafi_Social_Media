import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const ChatApi = createApi({
     reducerPath:"ChatApi",
     baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000',
     }),
     tagTypes:["User"],
     endpoints:(builder)=>({
        getChat:builder.query({
           query:(id)=>({
            url:`/user/chat/${id}`,
            method:"GET",
           }),
           async onQueryStarted(args,{dispatch,queryFulfilled}){
            try {
                const response = await queryFulfilled
                console.log(args)
                return response?.data
                
                
            } catch (error) {
                console.log(error);
            }
        },
          transformResponse:(response)=>{
           // console.log(response?.data);
            return response?.data;
          }
        }),
        getMessage:builder.query({
          query:(chatId)=>({
            url:`/user/get-message/${chatId}`,
            method:'GET'
          }),
          transformResponse:(response)=>{
            // console.log(response?.data);
             return response?.data;
           }
        }),
        addMessage:builder.mutation({
          query:(credential)=>({
            url:'/user/create-message',
            method:'POST',
            body:{...credential}
          })
        })
     })
})

export const {useGetChatQuery,useGetMessageQuery,useAddMessageMutation} = ChatApi