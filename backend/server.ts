import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import authRoute from "./src/routes/userRoute.ts"
import todoRoute from "./src/routes/todoRoute.ts"


import connect from './config/db.ts'

//connect to database.
dotenv.config();
connect();

const PORT=process.env.PORT;

const app=express();
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use('/user',authRoute);


app.use('/todos',todoRoute)
app.listen(PORT,()=>{
    console.log("app listing on port ",PORT)
})