"use client";
import fetchWithAuth from '@/fetchwrapper';
import { addTodo } from '@/GlobalRedux/Features/Todos/TodoSlice';
import { useAppDispatch } from '@/GlobalRedux/store';
import React, { useState } from 'react'

 interface AddTodoResponse { // add things like this to other request
  code: number;
  message: string;
  data: {
      userId:string;
      message: string;
      completed: boolean;
      _id: string;
      date:Date;
  };
}

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
              setText("")
              return 
            }
            const result:AddTodoResponse=await response.json();
            console.log("added todo: "+result)
            dispatch(addTodo(result.data))
            
        } catch (error) {
            console.log("error while adding the todo : "+ error);
        } finally{
          setText("")
        }
    }

  return (
    <footer className='flex justify-between py-4 px-[30px] rounded-[10px] bg-[#DADADA] dark:bg-[#2E3239]'>
        <input type="text" placeholder='New Note' value={text} onChange={(e)=>setText(e.target.value)} className=' bg-[#DADADA] dark:bg-[#2E3239] dark:text-[#DADADA] text-black flex-1'/>
        <button className='hidden xs:inline bg-[#F4F6FA] py-3 px-6 rounded-[9px] text-[#2E3239]' onClick={handleAdd}>Add New Note</button>
    </footer>
  )
}

export default AddTodo