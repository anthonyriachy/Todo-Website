import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
import { customRequest,CustomJwtPayload } from "../Types.ts";
import { generateAccessToken } from "../src/util.ts";
import RefreshToken from "../src/models/refreshToken.ts"

export default async (req:customRequest,res:Response,next:NextFunction)=>{
    console.log("hello from authorization")
    try {
        const authHeader=req.headers["authorization"];
        const token =authHeader?.split(" ")[1];

        //if the header doesn;t contain a token, or a authorization header
        if(!token ){
            return res.status(403).json({message:"Unauthorized"});
        }

        // validating the token
        const secret=process.env.ACCESS_SECRET
        if(!secret){
            console.log("error while fetching the secret from .env");
            return res.status(400).json({message:"error while fetching the secret from .env"})
        }

        let decoded:CustomJwtPayload;
        try {
            decoded=jwt.verify(token,secret) as CustomJwtPayload // if the token invalid the trycatch block will catch it   
        } catch (err) {
            const newToken=await renewToken(req, res)
            if (newToken) {
                req.headers["authorization"]=`Bearer ${newToken}`
                const newDecoded = jwt.decode(newToken) as CustomJwtPayload;
                req.userId = newDecoded.userId;
                next();
                return
            }
            return res.status(403).json({ valid: false, message: "Invalid Token" });
        }
        //i add the userId to the request so i can use it later. 
        req.userId=decoded.userId;
        next()
    

    } catch (error) {

    }
}

const renewToken=async(req:customRequest,res:Response)=>{
    console.log('renewing access token')
    //check if a refresh token for the user is available.
    const refreshToken= await RefreshToken.findOne({userId:req.userId});
    console.log(refreshToken)
    console.log(req.userId)
    if(!refreshToken?.token){
        console.log('no refresh tokens')
        return null    
    }
    const secret=process.env.REFRESH_SECRET;
    if(!secret){
        console.log("no refresh secret")
        return null
    }
    try {
        const decoded = jwt.verify(refreshToken.token, secret) as CustomJwtPayload;
        const newAccessToken = generateAccessToken(decoded.userId, decoded.email);
        return newAccessToken;
    } catch (err) {
        console.log("error in refresh token");
        return null
    }
}
