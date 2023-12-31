import axios from "axios"

export const getQuestionAction=(domain)=>async(dispatch)=>{
    try {

        dispatch({
            type:"getQuestionRequest"
        })

        const {data}= await axios.get(`https://chat-app-backend-k0z2.onrender.com/api/v1/quesFilter/${domain}`);
        dispatch({
            type:"getQuestionSuccess",
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:"getQuestionFailure",
            payload:error.response.data
        })
    }
}

export const similarQuestionAction=(askQuestion)=>async(dispatch)=>{
    try {
        dispatch({
            type:"getSimilarQuestionRequest"
        })

        const {data}=await axios.post("https://chat-app-backend-k0z2.onrender.com/api/v1/similarQuestion",{askQuestion:askQuestion})
        console.log(data)
        dispatch({
            type:"getSimilarQuestionSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:"getSimilarQuestionFailure",
            payload:error.response.data
        })
    }
}