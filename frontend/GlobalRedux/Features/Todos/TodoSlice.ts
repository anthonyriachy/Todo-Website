"use client"
import { createSlice,nanoid, PayloadAction } from "@reduxjs/toolkit"
import { Fascinate } from "next/font/google";

export interface Todo{
    _id:string,
    message:string,
    completed:boolean
}
interface TodoState{
    todos:Todo[];
    loading: boolean;

}

const initialState:TodoState={
    todos:[],
    loading: false

}

const TodosSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{
        setLoading:(state)=>{
            state.loading=true
        },
        setTodos:(state,action:PayloadAction<Todo[]>)=>{
            state.todos=action.payload;
            state.loading=false
        },
        addTodo:(state,action:PayloadAction<Todo>)=>{
            state.todos.push(action.payload);
        },
        deleteTodo:(state,action:PayloadAction<string>)=>{
            state.todos=state.todos.filter((todo)=>todo._id!==action.payload)
        },
        updateTodo:(state,action:PayloadAction<string>)=>{
            const todo=state.todos.findIndex(x=>x._id===action.payload);
            if(todo!=-1){
                state.todos[todo].completed=!state.todos[todo].completed;
            }
        },
    }
});

export default TodosSlice.reducer;
export const {addTodo,setTodos,deleteTodo,updateTodo,setLoading} =TodosSlice.actions;

