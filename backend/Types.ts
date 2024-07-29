import { Request } from "express"
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface customRequest extends Request{
    userId?:Types.ObjectId,
}
export interface CustomJwtPayload extends JwtPayload {
    userId: Types.ObjectId;
    email: string;
}