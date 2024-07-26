import express from "express"
import dotenv from "dotenv"
import authRoute from "./src/routes/authRoute.ts"
import connect from './config/db.ts'

//connect to database.
connect();
dotenv.config();

const PORT=process.env.PORT;

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use('/auth',authRoute);

app.listen(PORT,()=>{
    console.log("app listing on port ",PORT)
})