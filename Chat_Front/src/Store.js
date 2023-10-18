import { configureStore } from "@reduxjs/toolkit";
import { userInfo } from "./Reducer/userReducer";
import { question, similarQuestion } from "./Reducer/questionResucer";

const store=configureStore({
    reducer:{
       user:userInfo,
       question:question,
       similarQuestion:similarQuestion
    }
})

export default store;