import { Request, Response } from "express";
import { Error, isValidObjectId } from "mongoose";
import Todo from "../models/todo";
import { customRequest } from "../../Types";
import {client} from "../../config/redis"


const GetTodos=async(req:customRequest,res:Response)=>{
try {
    const page= parseInt(req.query.page as string) || 1;
    const limit= parseInt(req.query.limit as string) ||10;
    console.log("page and limit"+page+ " "+limit)    
    const skip = (page-1)*limit; // the limit is how many documents should be in one page, 
                                // the number of pages-1 is how many pages we skip over 
    console.log("hello")
    const cachedTodos=await client.get(`todos:${req.userId}`)
    if(cachedTodos?.length){
        console.log("todos found in cache");
        const totalPages=Math.ceil(await cachedTodos.length/limit   );
        return res.status(200).json({
            code:200,
            message:"Found the requested todos from the selected page",
            data:{
                page:page,
                limit:limit,
                totalPages,
                todos:JSON.parse(cachedTodos)
            }
        });
    }
    console.log("todos from mongodb")
    const todos=await Todo.find({userId:req.userId}).skip(skip).limit(limit).sort({date:-1});
    if(todos.length==0){
        console.log("No todos found");
        return res.status(200).json({message:"No todos found"});
    }
    const totalPages=Math.ceil(await Todo.countDocuments()/limit); //retrun the biggest int closest to the answer, 2.5 -> 3
    await client.set(`todos:${req.userId}`,JSON.stringify(todos));
    res.status(200).json(
        {
            code:200,
            message:"Found the requested todos from the selected page",
            data:{
                page:page,
                limit:limit,
                totalPages,
                todos:todos
            }
        });
} catch (error) {
    console.log('error while getting todos '+error);
    return res.status(500).json({message:'Error while getting todos '+error});
}
}
const create = async(req:customRequest,res:Response)=>{
    try {
        const {message}=req.body;
        console.log("edited the backend and checking if it cchanged using the volumes")
        if(!message){
            return res.status(401).json({message:"text is required"})
        }
        const todo=new Todo({message:message,userId:req.userId})   
        const result=await todo.save();
        if(!result._id){
            console.log("todo not added");
            res.status(400).json({message:"todo not added"})
        }
        //todo in cash
        const cachedTodos = await client.get(`todos:${req.userId}`);
        if (cachedTodos?.length) {
          const todos = JSON.parse(cachedTodos);
          todos.unshift(todo);//add in the start
          await client.set(`todos:${req.userId}`, JSON.stringify(todos));
        } else {
          await client.set(`todos:${req.userId}`, JSON.stringify([todo])); //create the list with one todo
        }

        console.log({code:200,message:message,data:todo})
        res.status(200).json({code:200,message:message,data:todo})
    } catch (error) {
        console.log("error while adding the todo"+ error);
        return  res.status(500).json({message:"error while adding the todo "+error})
    }
}

const deleteTodo=async(req:customRequest,res:Response)=>{
    try {
        const {itemId}=req.params;
        if(!isValidObjectId(itemId)){
            console.log("unvalid item id ")
            return res.status(400).json({message:"unvalid item id "})
        }
        const todo=await Todo.findById(itemId);
        if(!todo){
            console.log("todo not found");
            return res.status(404).json({message:"todo not found"})
        }
        const result=await Todo.deleteOne({_id:itemId});
        if(result.deletedCount===0){
            console.log("todo not deleted");
            return res.status(404).json({message:"todo not deleted"})
        }
        return res.status(200).json({code:200,message:"Successfully deleted the required todo item."})
    } catch (error) {
        console.log("error while deleting the user "+error);
        return res.status(401).json({message:"error while deleting the todo: "+error})
    }
}

const updateTodo=async(req:customRequest,res:Response)=>{
    try {
        //validate item id
        const {itemId}=req.params;
        if(!isValidObjectId(itemId)){
            console.log("unvalid item id");
            return res.json({message:"unvalid item id"})
        }
        //check if item exists
        const todo=await Todo.findById(itemId);
        if(!todo){
            console.log("todo not found");
            return res.status(404).json({message:"todo not found"})
        }
        //check if completed is in the body
        const {completed}=req.body;
        if(completed===null || completed===undefined || typeof(completed) !== "boolean" ){
            console.log("completed in body required");
            return res.status(400).json({message:"completed in body is required and should be a boolean"})
        }
        //edit the todo and check
        const newTodo=await Todo.findByIdAndUpdate(itemId,{completed:completed},{new:true});
        if(!newTodo){
            console.log("todo not updated");
            return res.status(400).json({message:"todo not updated"});
        }
        return res.status(200).json({code:200,message:"Successfully updated the required todo item.",data:newTodo})
    } catch (error) {
        console.log('error while updating the todo'+error);
        return res.status(400).json({message:'error while updating the todo '+error});
    }
}



export{create,GetTodos,deleteTodo,updateTodo}
