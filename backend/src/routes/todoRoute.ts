import express from "express"
import {create,GetTodos,deleteTodo,updateTodo} from '../controllers/todoController'
const route=express.Router();

route.get('/',GetTodos)
route.post('/create',create)
route.delete('/:itemId',deleteTodo)
route.put('/:itemId',updateTodo)
export default route