import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import authRoute from "./src/routes/userRoute.ts"
import todoRoute from "./src/routes/todoRoute.ts"
import authMiddleware from './config/authMiddleware.ts'
import cookieParser from "cookie-parser"
import connect from './config/db.ts'

//connect to database.
dotenv.config();
connect();

const PORT=process.env.PORT;

const app=express();
app.use(cors({
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,
   credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); 
app.use('/user',authRoute);

app.use((req,res,next)=>{
    const publicPaths = ['/register', '/signin'];
    if (publicPaths.includes(req.path)) {
      return next();
    }
    authMiddleware(req,res,next);
})
app.use('/todo',todoRoute)
app.listen(PORT||3000,()=>{
    console.log("app listing on port ",PORT)
})