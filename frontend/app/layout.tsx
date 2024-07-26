import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import {Providers} from '../GlobalRedux/provider';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { //this is from next
  title: "Todo App",
  description: "Stop Procrastinating, Start Organizing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='px-[20px] py-[32px] md:px-[80px] md:py-[67px]' >
      <header className='flex  justify-between'>
            <section>
                <h1 className=' text-[24px] md:text-[26px] font-bold '>TO DO APP</h1>    
                <p className='text-[12px] text-[#F4F6FA] opacity-70'>Stop Procrastinating, Start Organizing </p>        
            </section>
            <section className='flex'>
                <button type='button' aria-label="dark/light mode"  className="xs:inline hidden"> 
                {/* the aria-label is for is for screenreader because i dont have text inside the button  */}
                    <Image src="mode.svg" alt="dark/light mode" width={30} height={30}className='mx-2.5'/>
                </button>
                <button type='button' aria-label="dark/light mode">
                <Image src="user.svg" alt="dark/light mode" width={50} height={50}className='mx-2.5'/>

                </button>
            </section>
        </header>
        <div className='w-[100%] h-[1px] bg-white opacity-40 my-[20PX]'></div>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  );
}
