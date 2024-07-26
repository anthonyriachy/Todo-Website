'use client';
import { addTodo } from '@/GlobalRedux/Features/Todos/TodoSlice';
import { useAppDispatch } from '@/GlobalRedux/store';
 import React, { useState } from 'react'

function AddTodo() {
    const [text,setText]=useState<string>("");
    const [message,setMessage]=useState<string>("");
    const dispatch=useAppDispatch()
    const handleAdd=async()=>{
        try {
          console.log('trying to add from frontend');
            const response=await fetch('http://localhost:8080/todos',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    text
                })
            })        
            if(!response.ok){
              console.log("error in response "+response.status);  
              const result=await response.json();
              setMessage(result.message);
              return 
            }
            const result=await response.json();
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