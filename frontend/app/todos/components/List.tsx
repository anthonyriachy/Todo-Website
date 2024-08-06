"use client";
import fetchWithAuth from "@/fetchwrapper";
import {
    deleteTodo,
    setLoading,
    setTodos,
    updateTodo,
} from "@/GlobalRedux/Features/Todos/TodoSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// interface TodoListResponse{

// }


const URL = process.env.NEXT_PUBLIC_URL;
function List() {
    const todos = useAppSelector((state) => state.Todos.todos);
    const loading = useAppSelector((state) => state.Todos.loading);
    const dispatch = useAppDispatch();

    const completed = useAppSelector((state) => state.Todos.todos).filter(
        (todo) => todo.completed
    ).length;

    const darkMode = useAppSelector((state) => state.Theme.darkMode);
    const [showCompleted, setShowCompleted] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            dispatch(setLoading(true));
            try {
                const response = await fetchWithAuth(`${URL}/todo`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                 if (!response.ok) {
                    console.log("error while fetching todos" + response.status);
                    setMessage("error while fetching todos" + response.status);
                    return;
                }

                const data = await response.json();
                console.log("fetched data ", data.data.todos);
                if (data.data.todos.length) {
                    dispatch(setTodos(data.data.todos));
                } else {
                    dispatch(setTodos([]));
                }
            } catch (error) {
                setMessage("Error fetching todos:" + error);
                console.error("Error fetching todos:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchTodos();
    }, [dispatch]);

    const handleDelete = async (todoId: string) => {
        try {
            const response = await fetchWithAuth(`${URL}/todo/${todoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                console.log(
                    "error in repsonse while delelting the todo " + response.statusText
                );
                return;
            }
            const data = await response.json();
            console.log("todoid: " + todoId);

            dispatch(deleteTodo(todoId));
        } catch (error) {
            console.log("error while deleting todo: " + error);
        }
    };
    const handleCheck = async (todoId: string, check: boolean) => {
        try {
            const response = await fetchWithAuth(`${URL}/todo/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: check,
                }),
                credentials: "include",
            });
            if (!response.ok) {
                console.log(
                    "error in repsonse while updating the todo " + response.statusText
                );
                return;
            }
            const data = await response.json();
            console.log("todoid: " + todoId);

            dispatch(updateTodo(todoId));
        } catch (error) {
            console.log("error while deleting todo: " + error);
        }
    };

    if (loading) {
        return <p className="mx-auto">Loading...</p>;
    }

    const toggleShowCompleted = () => {
        setShowCompleted((prev) => !prev);
    };

    //fiter todos
    const visibleTodos = showCompleted? todos: todos.filter((todo) => !todo.completed);

    return (
        <>
            <header className="flex flex-col xs:flex-row  justify-between  ">
                <button
                    onClick={toggleShowCompleted}
                    className=" flex bg-[#B4B4B4] dark:bg-[#2E3239] justify-between items-center px-[24px] py-[12px] gap-[12px] rounded-[9px] w-fit xs:order-2 mb-[20px]  xs:mb-0"
                >
                    {darkMode ? (
                        <Image src="hide.svg" alt="Eye" width={20} height={20} />
                    ) : (
                        <Image src="hideLight.svg" alt="Eye" width={20} height={20} />
                    )}
                    <span className="text-[#23262C] dark:text-[#8C8E93]">
                        Hide Completed
                    </span>
                </button>
                <span className="text-[#8C8E93] xs:self-end xs:order-1">
                    {completed} completed
                </span>
            </header>
            {message && <h1>${message}</h1>}
            {visibleTodos.length ? (
                <ul className="mt-[30px] mb-[60px]">
                    {visibleTodos.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between mb-[20px]">
                            <section className="flex gap-[12px] items-center">
                                {item.completed ? (
                                    <button
                                        onClick={() => handleCheck(item._id, false)}
                                        title="check"
                                    >
                                        <Image
                                            src="checkboxCompleted.svg"
                                            alt="checkbox"
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleCheck(item._id, true)}
                                        title="check"
                                    >
                                        <Image
                                            src="checkboxEmpty.svg"
                                            alt="checkbox"
                                            width={24}
                                            height={24}
                                        />
                                    </button>
                                )}
                                <p
                                    className={`ml-2 ${item.completed ? "line-through" : ""
                                        } text:text-[black] dark:text-[#F4F6FA]`}
                                >
                                    {item.message}
                                </p>
                            </section>
                            <button
                                className="hidden xs:block "
                                onClick={() => handleDelete(item._id)}
                                title="delete"
                            >
                                <Image
                                    src="trash.svg"
                                    alt="delete"
                                    width={30}
                                    height={33}
                                ></Image>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <h1 className="dark:text-white my-[16px]">No Todo Found</h1>
            )}
        </>
    );
}

export default List;
