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


const PORT=process.env.PORT;
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const app=express();
if(isProduction){
    console.log("running in PRODUCTION")
    app.use(cors({
        origin:'https://todo-website-frontend.vercel.app', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, 
        optionsSuccessStatus: 200,
    }));
}else if(isDevelopment){
    console.log("running in DEVELOPMENT")
    app.use(cors({
        origin:'http://localhost:3000', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, 
        optionsSuccessStatus: 200,
    }));
}else{
    console.log("unkown enviroment");
}





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
app.listen(PORT||3080,()=>{
    console.log("app listing on port ",PORT)
})