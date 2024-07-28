import { Types } from "mongoose";
import jwt from 'jsonwebtoken'

const generateAccessToken=(userId:Types.ObjectId,email:string)=>{
    const secret=process.env.ACCESS_SECRET
      if(!secret){
        throw new Error("token secret cannot be found");
      }
      return jwt.sign({userId,email},secret,{subject:"access token",expiresIn:"10s"});
}
export {generateAccessToken}