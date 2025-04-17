'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import VFWidgetI from './VFWidgetI';

const Header = () => {
    const router = useRouter();

  return (
    <div className='flex flex-col z-1 relative pb-40 transition-all duration-300 ease-in-out'>
        <div className='flex justify-center items-center relative py-10'>
            <span onClick={()=> router.back()} className='absolute text-[#8C8C8C] font-[500] text-[14px] left-10 max-sm:top-5 cursor-pointer hover:text-white'>Back</span>
            <div className='flex flex-col items-center'>
            <h1 className='text-[32px] font-[600]'>Choose Options</h1>
            <p className='text-[#8C8C8C] text-[14px] font-[400]'>Choose your settings, we'll handle the editing</p>
            </div>
        </div>
       <VFWidgetI/>
    </div>
  )
}

export default Header
