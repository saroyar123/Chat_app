import axios from 'axios'
import React, { useState } from 'react'

const QuesAns = ({question,id}) => {
    const [ans,setAns]=useState("")
  const  submithandler=async(e)=>{
    e.preventDefault();
    axios.post("http://localhost:4000/api/v1/question",{answer:ans,id})
  }
  return (
    <div>
        <h1>{question}</h1>
        <form onSubmit={submithandler}>
            <input type='text' placeholder='give the ans' value={ans} onChange={(e)=>setAns(e.target.value)}/>
            <button type='submit'>submit</button>
        </form>
    </div>

  )
}

export default QuesAns