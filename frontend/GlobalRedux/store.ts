"use client"; //redux toolkit needs to be in a client,
            //server wont woork
import {configureStore} from "@reduxjs/toolkit"
import TodosSlice from './Features/Todos/TodoSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./Features/authSlice";
import ThemeSlice from "./Features/ThemeSlice";

export const store =configureStore({
    reducer:{
        Todos:TodosSlice,
        auth: authSlice,
        Theme:ThemeSlice
    }
})

export type RootState=ReturnType<typeof store.getState>;    
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
export const useAppDispatch:()=>typeof store.dispatch=useDispatch;

