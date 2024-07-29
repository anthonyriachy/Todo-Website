"use client";

 import React, { useEffect, useLayoutEffect } from "react";
import { useAppSelector } from "@/GlobalRedux/store";
import Header from "./components/Header";
import List from "./components/List";
import AddTodo from "./components/AddTodo";
import { redirect } from "next/navigation";

function Page():JSX.Element {
   const { accessToken } = useAppSelector(state => state.auth);

  useLayoutEffect(() => {
    if (!accessToken) {
      redirect("/register")
     }
  }, [accessToken]);

  return (
    <main>
       <List />
      <AddTodo />
    </main>
  );
}

export default Page;
