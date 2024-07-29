import { Error, Types } from "mongoose";
import User from "../models/user.ts";
import RefreshToken from "../models/refreshToken.ts";
import { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();



import { generateAccessToken } from "../util.ts";
import { CustomJwtPayload, customRequest } from "../../Types.ts";

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Email address already exists" });
      return;
    }

    const newUser = new User({ email, password });
    const savedUser = await newUser.save();

    const accessToken = generateAccessToken(savedUser._id);
    const refreshToken = jwt.sign({ userId: savedUser._id, email: savedUser.email }, process.env.REFRESH_SECRET!, { expiresIn: "7d" });

    const newRefreshToken = new RefreshToken({ userId: savedUser._id, token: refreshToken });
    await newRefreshToken.save();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      
    });

    res.status(200).json({ user: savedUser, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Error creating user " + error });
  }
};


const login=async(req:Request,res:Response)=>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Incorrect email" });
      return;
    }
    if(password!=user.password){
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
    

    const accessToken = generateAccessToken(user._id);
    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, process.env.REFRESH_SECRET!, { expiresIn: "7d" });

    const changeToken = await RefreshToken.updateMany({userId:user._id},{$set:{token:refreshToken}})
    if(changeToken.modifiedCount==0){
      const newRefreshToken = new RefreshToken({ userId: user._id, token: refreshToken });
      await newRefreshToken.save();
    }
    console.log("log in changing refresh token",changeToken)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      
    });

    res.status(200).json({ user: user, accessToken, refreshToken });
  } catch (error) {
    console.log("error while login in"+error)
    return res.status(500).json({message:"error while sigin in "+error})
  }
}



const refreshToken=async(req:Request,res:Response)=>{
  try {
    const refreshToken=req.cookies.refreshToken; 
    if(!refreshToken){ 
      console.log("Unauthorized, no refresh token");
      return res.status(403).json({message:"Unauthorized, no refresh token"})
    }

    const refreshSecret=process.env.REFRESH_SECRET;
    if(!refreshSecret){
      console.log("Unauthorized, no refresh secret found");
      return res.status(403).json({message:"Unauthorized, no refresh secret found"})
    }

    //check if refresh token is valid
    const decoded=jwt.verify(refreshToken,refreshSecret) as CustomJwtPayload;

    //check if refresh token exists in my database
    const exists=await RefreshToken.findOne({token:refreshToken,userId:decoded.userId})
    if(!exists){
      return res.status(403).json({message:"Unauthorized, refresh token invalid or expired"})
    }

    //delete the old refresh token
    console.log(exists._id)
    console.log(await RefreshToken.deleteOne({_id:exists._id}))
    //generate the access token, expires in 15s
    const accessToken=generateAccessToken(decoded.userId)

    //generate the refresh token, expires in 7d
    const newRefreshToken=jwt.sign({userId:decoded.userId},refreshSecret,{expiresIn:"7d"});

    //save the refresh token to mongodb
    const insertedefreshToken=new RefreshToken({
      userId:decoded.userId,
      token:newRefreshToken
    })
    await insertedefreshToken.save();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      
    });
    res.status(201).json({refreshToken:newRefreshToken,accessToken}); // Respond with the created user

  } catch (error) {
    if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError){
      return res.status(403).json({message:"Unauthorized, refresh token invalid or expired"})
    }
    return res.status(500).json({message:"error while sigin in "+error})
  }

}
const logout=async(req:customRequest,res:Response)=>{ //delete refresh tokens
  try {
    await RefreshToken.deleteMany({userId:req.userId})
    return res.status(200).json({message:'log out succesful '})
  } catch (error) {
    return res.status(500).json({message:"error while login out  "+error})
  } 
}
export { signup,login,refreshToken };
