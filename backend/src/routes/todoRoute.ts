import express from "express"
import {AddTodo,GetTodos} from '../controllers/todoController'
const route=express.Router();

route.post('/',AddTodo)
route.get('/',GetTodos)
route.put('/',)
export default route