import express from "express"
import {signup,login,refreshToken} from "../controllers/userController.ts"
const route=express.Router();

route.post('/refreshToken',refreshToken)
route.post("/signup",signup);
route.post("/login",login);

export default route;

