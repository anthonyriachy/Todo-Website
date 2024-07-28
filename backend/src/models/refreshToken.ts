import mongoose, { Schema, Types } from "mongoose";

const refreshTokenSchema=new mongoose.Schema({
    userId:{
        type:Types.ObjectId,
        ref:"User", 
        required:true,
        unique:true,
    },
    token:{
        type:String,
        required:true,
        unique:true,
    }
})

export default mongoose.model("RefreshToken",refreshTokenSchema);