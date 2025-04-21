import React from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Prompt = ({handleAction, handleUndo, message, action='Delete'}) => {
  return (
    <div onClick={handleUndo} className='z-50 w-screen h-screen fixed left-0 top-0 backdrop-blur-[2px] bg-[#0000000c] flex justify-center items-center'>
      <div onClick={(e)=> e.stopPropagation()} className='w-[504px] max-sm:w-full rounded-[16px] flex flex-col gap-3 p-5 items-center bg-[#140926]'>
         <HiOutlineExclamationCircle className='text-[50px]'/>
         <h3 className='font-[500] text-[20px]'>Are You Sure?</h3>
         <p className='text-[#8C8C8C] text-sm font-[500]'>{message}</p>
         <div className='grid grid-cols-2 gap-3 text-[15px] font-[500] w-full'>
            <button onClick={handleUndo} className='rounded-[4px] h-[44px] w-full border border-[#261148] cursor-pointer text-[#8C8C8C]'>Cancel</button>
            <button onClick={handleAction} className='rounded-[4px] h-[44px] w-full bg-[#CF36E9] cursor-pointer'>{action}</button>
         </div>
      </div>
    </div>
  )
}

export default Prompt