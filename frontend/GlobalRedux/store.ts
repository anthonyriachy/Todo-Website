"use client"; //redux toolkit needs to be in a client,
            //server wont woork
import {configureStore} from "@reduxjs/toolkit"
import TodosReducer from './Features/Todos/TodoSlice.ts'

export const store =configureStore({
    reducer:{
        Todos:TodosReducer
    }
})

export type RootState=ReturnType<typeof store.getState>;    
export type AppDispatch=typeof store.dispatch;

