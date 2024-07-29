"use client";
import fetchWithAuth from '@/fetchwrapper';
import { addTodo } from '@/GlobalRedux/Features/Todos/TodoSlice';
import { useAppDispatch } from '@/GlobalRedux/store';
 import React, { useState } from 'react'

function AddTodo() {
    const [text,setText]=useState<string>("");
    const [message,setMessage]=useState<string>("");
    const dispatch=useAppDispatch()
    const handleAdd=async()=>{
        try {
          console.log('trying to add from frontend'+text);
            const response=await fetchWithAuth(`${process.env.NEXT_PUBLIC_URL}/todo/create`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    message:text
                })
            })        
            if(!response.ok){
              console.log("error in response "+response.status);  
              const result=await response.json();
              setMessage(result.message);
              return 
            }
            const result=await response.json();
            console.log("result "+result)
            dispatch(addTodo(result))
        } catch (error) {
            
        }
    }

  return (
    <footer className='flex justify-between py-4 px-[30px] bg-[#2E3239] rounded-[10px]'>
        <input type="text" placeholder='New Note' value={text} onChange={(e)=>setText(e.target.value)} className='bg-[#2E3239]  flex-1'/>
        <button className='hidden xs:inline bg-[#F4F6FA] py-3 px-6 rounded-[9px] text-[#2E3239]' onClick={handleAdd}>Add New Note</button>
    </footer>
  )
}

export default AddTodo