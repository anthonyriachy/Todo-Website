"use client";

 import React, { useEffect, useLayoutEffect } from "react";
import { useAppSelector } from "@/GlobalRedux/store";
import Header from "./components/Header";
import List from "./components/List";
import AddTodo from "./components/AddTodo";
import { redirect } from "next/navigation";
import Image from "next/image";

function Page():JSX.Element {
   const { accessToken } = useAppSelector(state => state.auth);
  useEffect(() => {
    if (!accessToken) {
      redirect("/register")
     }
  }, [accessToken]);
  const darkMode=useAppSelector(state=>state.Theme.darkMode); 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
      <main className={"bg-white dark:bg-[#23262C] px-[20px] py-[32px] md:px-[80px] md:py-[40px] min-h-screen"}>
       <List />
      <AddTodo />
    </main>
  );
}

export default Page;
