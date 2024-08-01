'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SignUp from '../login/page';
import { useDispatch } from 'react-redux';
import { setTokens } from '@/GlobalRedux/Features/authSlice';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/store';
import { useRouter } from 'next/navigation';


function Page():React.ReactElement {
  const URL=process.env.NEXT_PUBLIC_URL;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message,setMessage]=useState("");
  const router=useRouter();

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const refreshToken = useAppSelector(state => state.auth.refreshToken);
  console.log("oooooooooooooooooooooooooooooooo"+accessToken);
  console.log(refreshToken);
  
  const darkMode=useAppSelector(state=>state.Theme.darkMode); 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);



  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if(password!=confirmPassword){
      setMessage("Passwords do not match");
      return;
    } 
    if(!email || !password){
      setMessage("Email and Password required");
      return
    }
    try {
      const response = await fetch(`${URL}/user/signup`, {
        method: 'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password,
        }),
        credentials:'include'
      });

      if (!response.ok) {
        console.log('response not ok: ' + response.status);
        return;
      }
      const result = await response.json();
      dispatch(setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
      router.push('/todos'); 
    } catch (error) {
      console.log('error while registering: ' + error);
    }
  };

  return (
    
      <main className='bg-white dark:bg-[#23262C] flex flex-col items-center min-h-screen'>
        <h1 className='opacity-50 font-400 text-[40px] mb-[75px] mt-[30px] dark:text-[#FFFFFF]'>Register</h1>
        <form onSubmit={handleRegister} className='flex flex-col w-[100%] md:w-[50%]'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=' w-[100%] bg-[#DADADA] dark:bg-[#2E3239] h-[80px] mb-[50px] px-[30px]  dark:text-white'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-[100%] bg-[#DADADA] dark:bg-[#2E3239] h-[80px] px-[30px] mb-[50px]  dark:text-white'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-[100%] bg-[#DADADA] dark:bg-[#2E3239] h-[80px] px-[30px]  dark:text-white'
          />
          <p className='text-black dark:text-[#F4F6FA] text-[16px] opacity-50 my-[30px]'>
            Already have an account? 
            <Link href='/login' className='underline'> Login</Link>
          </p>
          <button type='submit' className='bg-[#F4F6FA] w-[200px] sm:w-[300px] h-[50px] rounded-[9px] text-black mx-auto'>
            Register
          </button>
        </form>
      </main>
   
  );
}

export default Page;
