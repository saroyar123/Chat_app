import { createReducer } from "@reduxjs/toolkit";
 
export const question=createReducer({
    loading:false,
    data:null
},
{
    getQuestionRequest:(state)=>{
       state.loading=true
    },

    getQuestionSuccess:(state,action)=>{
        state.loading=false,
        state.data=action.payload

     },

    getQuestionFailure:(state,action)=>{
        state.loading=false,
        state.data=action.payload
     }
})


export const similarQuestion=createReducer({
    loading:false,
    data:null
},{
    getSimilarQuestionRequest:(state)=>{
        state.loading=true
     },
 
     getSimilarQuestionSuccess:(state,action)=>{
         state.loading=false,
         state.data=action.payload
 
      },
 
     getSimilarQuestionFailure:(state,action)=>{
         state.loading=false,
         state.data=action.payload
      }
})