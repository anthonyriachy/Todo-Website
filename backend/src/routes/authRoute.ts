import express from "express"
import {test} from "../controllers/authController.ts"
const route=express.Router();

route.get("/test",test);

export default route;

