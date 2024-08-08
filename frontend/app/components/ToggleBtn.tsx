"use client"
import { useAppSelector } from "@/GlobalRedux/store";
import Image from "next/image";
import React from "react";

function ToggleBtn() {
  const darkMode=useAppSelector(state=>state.Theme.darkMode);

  return (
    <button type='button' aria-label="dark/light mode"  className="xs:inline hidden"> 
                {/* the aria-label is for is for screenreader because i dont have text inside the button  */}
                    {darkMode?<Image src="mode.svg" alt="dark/light mode" width={30} height={30}className='mx-2.5'/>:
                    <Image src="modeAtLight.svg" alt="dark/light mode" width={30} height={30}className='mx-2.5'/>
                    }
                </button>
  );
}

export default ToggleBtn;
