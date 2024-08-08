'use client'
import { setTokens } from '@/GlobalRedux/Features/authSlice';
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
 import React, { useEffect, useState } from 'react';


const URL=process.env.NEXT_PUBLIC_URL
function Page():React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useAppDispatch();
  const router=useRouter();

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
    try {
      const response = await fetch(`${URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials:'include'
      });
      if (!response.ok) {
        console.log('response not ok: ' + response.status);
        return;
      }
      const result = await response.json();
      dispatch(setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
      router.push('/');  

      console.log(result);
    } catch (error) {
      console.log('error while registering: ' + error);
    }
  };

  return (
      <main className='flex flex-col min-h-screen items-center bg-white dark:bg-[#23262C]'>
      <h1 className='opacity-50 font-400 text-[40px] mb-[75px] mt-[30px] dark:text-[#FFFFFF]'>Login</h1>
      <form onSubmit={handleRegister} className='flex flex-col  w-[100%] md:w-[50%]'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-[100%] bg-[#DADADA] dark:bg-[#2E3239] h-[80px] mb-[50px] px-[30px]  dark:text-white'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-[100%] bg-[#DADADA] dark:bg-[#2E3239] h-[80px] px-[30px]  dark:text-white'
        />
        <p className='text-black dark:text-[#F4F6FA] text-[16px] opacity-50 my-[30px]'>
          Don&apos;t have an account yet? 
          <Link href='/register' className='underline'> SignUp</Link>
        </p>
        <button type='submit' className='bg-[#F4F6FA] w-[200px] sm:w-[300px] h-[50px] rounded-[9px] text-black mx-auto'>
          Login
        </button>
      </form>
    </main>
   );
}

export default Page;
