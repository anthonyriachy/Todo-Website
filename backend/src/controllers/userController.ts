import { Error, Types } from "mongoose";
import User from "../models/user.ts";
import RefreshToken from "../models/refreshToken.ts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();



import { generateAccessToken } from "../util.ts";

// const refreshToken=async(req:Request,res:Response)=>{
//   const token=req.body.token;   

// }
const logout=async()=>{ //delete refresh tokens

}
const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email,password} = req.body;
    
    if ( !email || !password) {
      res.status(401).json({ message: "all feilds are required" });
      return;
    }
    //check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "email address exists" });
      return;
    }

    //hash and salt the password before saving it.
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password,
    });
    // Save the user to the database
    const savedUser = await newUser.save();

    //generate the access token, expires in 15s
    const accessToken=generateAccessToken(savedUser._id,savedUser.email)

    //generate the refresh token, expires in 7d
    const secret=process.env.REFRESH_SECRET
    if(!secret){
      throw new Error("token secret cannot be found");
    }

    const refreshToken=jwt.sign({userId:savedUser._id,email:savedUser.email},secret,{expiresIn:"7d"});
    //save the refresh token to mongodb
    const newRefreshToken=new RefreshToken({
      userId:savedUser._id,
      token:refreshToken
    })
    await newRefreshToken.save();

    //send the access token to the client
    res.status(201).json({user:savedUser,token:accessToken}); // Respond with the created user
  } catch (error) {
    res.status(500).json({ message: "Error creating user " + error });
  }
};

const signin=async(req:Request,res:Response)=>{
  try {
    
  } catch (error) {
    console.log("error while sigin in"+error)
    return res.status(401).json({message:"error while sigin in "+error})
  }
}
export { signup,signin };
