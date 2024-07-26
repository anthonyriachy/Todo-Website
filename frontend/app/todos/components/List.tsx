"use client"
import { setLoading, setTodos } from '@/GlobalRedux/Features/Todos/TodoSlice'
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/store'
import Image from 'next/image'
import React, { useEffect } from 'react'

function List() {
    const todos=useAppSelector(state=>state.Todos.todos)
    const loading=useAppSelector(state=>state.Todos.loading)
    const dispatch=useAppDispatch()
    useEffect(()=>{
        const fetchTodos = async () => {
            dispatch(setLoading());
            try {
                 const response = await fetch('http://localhost:8080/todos',{
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log("fetched data ",data)
                dispatch(setTodos(data));
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    },[dispatch])
   
    if(loading){
        return <p>Loading...</p>
    }
  return (
    <ul className='mt-[30px] mb-[60px]'>
        {todos.map((item,index)=>(
            <li key={index} className='py-2 flex justify-between mb-[20px]'>
                <section className='flex gap-[12px] items-center'>
                    {item.completed?
                        <button onClick={()=>{console.log('clicke')}} title='check'>
                            <Image src="checkboxCompleted.svg" alt="checkbox" width={24} height={24}/>
                        </button>

                        :
                        <Image src="checkboxEmpty.svg" alt="checkbox" width={24} height={24}/>
                    }
                    <p className={`ml-2 ${item.completed?"line-through":""} text[#F4F6FA]`}>{item.text}</p>

                </section>
                <section className='hidden xs:block '>
                    <Image src="trash.svg" alt='delete' width={30} height={33}></Image>
                </section>
            </li>
            ))
        }
        
    </ul>
  )
}

export default List