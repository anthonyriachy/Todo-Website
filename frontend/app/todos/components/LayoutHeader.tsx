"use client"
import React from 'react'
import ToggleBtn from './ToggleBtn'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/store';
import { toggleDarkMode } from '@/GlobalRedux/Features/ThemeSlice';

function LayoutHeader() {
    const darkMode=useAppSelector(state=>state.Theme.darkMode);
    const dispatch=useAppDispatch();
  return (
    <section  className='bg-white dark:bg-[#23262C] px-[20px] pt-[32px] md:px-[80px] md:pt-[67px]'>
        <header className='flex  justify-between mb-[20px]'>
            <section>
                <h1 className=' text-[24px] md:text-[26px] font-bold text-[#23262C]  dark:text-[white] '>TO DO APP</h1>    
                <p className='text-[12px] text-[#23262C] dark:text-[#F4F6FA] opacity-70'>Stop Procrastinating, Start Organizing </p>        
            </section>
            <section className='flex'>
                <button type='button' aria-label="dark/light mode"  className="xs:inline hidden" onClick={()=>dispatch(toggleDarkMode())}> 
                {/* the aria-label is for is for screenreader because i dont have text inside the button  */}
                    {darkMode?<Image src="mode.svg" alt="dark/light mode" width={30} height={30}className='mx-2.5'/>:
                    <Image src="modeAtLight.svg" alt="dark/light mode" width={30} height={30}className='mx-2.5'/>
                    }
                </button>
                <button type='button' aria-label="user">
                <Image src="user.svg" alt="user" width={50} height={50}className='mx-2.5'/>

                </button>
            </section>
        </header>
        <div className='w-[100%] h-[1px] bg-red opacity-40 bg-[#000000] dark:bg-[#F4F6FA]'></div>
    </section>
  )
}

export default LayoutHeader