const mongoose=require("mongoose");

const dbConnect=()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.databaseUrl)
    .then((con)=>{
    console.log(`database connected at ${con.connection.host}`)})
    .catch((err)=>console.log(err));
    
}

module.exports=dbConnect
