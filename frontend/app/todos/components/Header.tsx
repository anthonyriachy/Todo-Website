import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <header className="flex flex-col xs:flex-row  justify-between">
        {/* dont forget to change the number of completed to be fom db */}
        <div className=" flex bg-[#2E3239] justify-between  px-[24px] py-[12px] gap-[12px] rounded-[9px] w-fit xs:order-2 mb-[20px]  xs:mb-0">
            <Image src="hide.svg" alt="Eye" width={20} height={20}/>
            <span className="text-[#8C8E93]  ">Hide Completed</span>
        </div>
        <span className="text-[#8C8E93] xs:self-end xs:order-1">{3} completed</span>
        
    </header>
  )
}

export default Header