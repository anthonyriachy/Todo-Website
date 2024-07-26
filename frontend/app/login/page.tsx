'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';



function Page():React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/test', {
        method: 'GET',
      });
      if (!response.ok) {
        console.log('response not ok: ' + response.status);
        return;
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('error while registering: ' + error);
    }
  };

  return (
    <main className=''>
      <main className='flex flex-col items-center'>
        <h1 className='opacity-50 font-400 text-[40px] mb-[75px] mt-[30px]'>Login</h1>
        <form onSubmit={handleRegister} className='flex flex-col  w-[100%] md:w-[50%]'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-[100%] bg-[#2E3239] h-[80px] mb-[50px] px-[30px]'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-[100%] bg-[#2E3239] h-[80px] px-[30px] mb-[50px]'
          />
          <p className='text-[#F4F6FA] text-[16px] opacity-50 my-[30px]'>
            Don&apos;t have an account yet? 
            <Link href='/register' className='underline'>SignUp</Link>
          </p>
          <button type='submit' className='bg-[#F4F6FA] w-[200px] sm:w-[300px] h-[50px] rounded-[9px] text-black mx-auto'>
            Login
          </button>
        </form>
      </main>
    </main>
  );
}

export default Page;
