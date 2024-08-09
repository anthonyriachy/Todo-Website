import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/userRoute"
import todoRoute from "./routes/todoRoute"
import authMiddleware from '../config/authMiddleware'
import cookieParser from "cookie-parser"
import connect from '../config/db'

 dotenv.config();
//connect to database
connect();
//connect to redis
//const redisClient=redis.createClient();// using default settings. in production we need the url of the production instance of redis


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




app.get("/",(req,res)=>{
    console.log("test route")
    res.send("Hello from test route")
})

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