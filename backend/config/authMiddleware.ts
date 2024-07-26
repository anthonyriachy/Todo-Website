import { NextFunction } from "express"
import jwt from "jsonwebtoken"

const auth=(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers["authorization"]?.split(" ")[1]||req.cookies?.token;

    } catch (error) {

    }
}