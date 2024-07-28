import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import authRoute from "./src/routes/userRoute.ts"
import todoRoute from "./src/routes/todoRoute.ts"
import authMiddleware from './config/authMiddleware.ts'

import connect from './config/db.ts'

//connect to database.
dotenv.config();
connect();

const PORT=process.env.PORT;

const app=express();
app.use(cors({
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,
//    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use('/user',authRoute);

app.use(authMiddleware)
app.use('/todo',todoRoute)
app.listen(PORT||3000,()=>{
    console.log("app listing on port ",PORT)
})