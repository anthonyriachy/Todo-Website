'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import SignUp from '../login/page';

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
        <h1 className='opacity-50 font-400 text-[40px] mb-[75px] mt-[30px]'>Register</h1>
        <form onSubmit={handleRegister} className='flex flex-col w-[100%] md:w-[50%]'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=' w-[100%]  bg-[#2E3239] h-[80px] mb-[50px] px-[30px]'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-[100%]  bg-[#2E3239] h-[80px] px-[30px] mb-[50px]'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-[100%]  bg-[#2E3239] h-[80px] px-[30px]'
          />
          <p className='text-[#F4F6FA] text-[16px] opacity-50 my-[30px]'>
            Already have an account? 
            <Link href='/Login' className='underline'>Login</Link>
          </p>
          <button type='submit' className='bg-[#F4F6FA] w-[200px] sm:w-[300px] h-[50px] rounded-[9px] text-black mx-auto'>
            Register
          </button>
        </form>
      </main>
    </main>
  );
}

export default Page;
