import mongoose from "mongoose"
import dotenv from 'dotenv'


dotenv.config();


export default ()=>{
    const dbUri=process.env.MONGODB_URI;
    if(!dbUri){
        throw new Error("MONGODB_URI is not defined")
    }
    mongoose.connect(dbUri).then(()=>{
        console.log("connected to database!")
    }).catch(error=>{
        console.log('error while connecting to database',error);
    })
}