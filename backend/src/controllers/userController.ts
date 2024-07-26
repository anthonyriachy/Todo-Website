import { Error } from "mongoose";
import User from "../models/user.ts";
import { Request, Response } from "express";

const signup = async (req: Request, res: Response): Promise<void> => {
  console.log("hello from backend");

  try {
    const {email,password} = req.body;
    
    if ( !email || !password) {
      res.status(401).json({ message: "all feilds are required" });
      return;
    }
    // Create a new user
    const newUser = new User({
      email,
      password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Respond with the created user
  } catch (error) {
    res.status(500).json({ message: "Error creating user" + error });
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
