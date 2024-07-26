"use client";
//this file is because in NEXTjs we cannot wrap the entry point of the website, 
//which is layout.tsx because it is a server side, and redux lives in client side
import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({children}){
    return <Provider store={store}>
                {children}
            </Provider>
}