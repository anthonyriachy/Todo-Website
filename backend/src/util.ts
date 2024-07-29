import { Types } from "mongoose";
import jwt from 'jsonwebtoken'

const generateAccessToken=(userId:Types.ObjectId)=>{
    const secret=process.env.ACCESS_SECRET
      if(!secret){
        throw new Error("token secret cannot be found");
      }
      return jwt.sign({userId},secret,{subject:"access token",expiresIn:"30m"});
}
export {generateAccessToken}