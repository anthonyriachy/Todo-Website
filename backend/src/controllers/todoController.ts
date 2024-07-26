import { Request, Response } from "express";
import { Error } from "mongoose";
import Todo from "../models/todo";

const AddTodo = async(req:Request,res:Response)=>{
    try {
        const {text}=req.body;
        
        if(!text){
            return res.status(401).json({meesage:"text is required"})
        }
        const todo=new Todo({text:text})   
        const result=await todo.save();
        if(!result._id){
            console.log("todo not added");
            res.status(400).json({message:"todo not added"})
        }
        res.status(201).json(todo)
    } catch (error) {
        console.log("error while adding the todo"+ error);
        return  res.status(500).json({message:"error while adding the todo "+error})
    }
}

const GetTodos=async(req:Request,res:Response)=>{
try {
    const todos=await  Todo.find();
    if(todos.length==0){
        console.log("No todos found");
        return res.status(404).json({message:"No todos found"});
    }
    res.json(todos);
} catch (error) {
    console.log('error while getting todos '+error);
    return res.status(500).json({message:'Error while getting todos '+error});
}
}


export{AddTodo,GetTodos}