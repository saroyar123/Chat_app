
const express =require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const dbConnect = require("./config/dbconnect");
const questionRouter=require("./router/questionRouter")
dotenv.config();
dbConnect();

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1",questionRouter)

app.get("/",(req,res)=>{
    res.json({
        message:"hello"
    })
})


app.listen(process.env.port,()=>{
    console.log("server is runing")
})

