import React from 'react';

const AlertBox = ({handleUndo, heading, message, Icon}) => {
  return (
    <div onClick={handleUndo} className='z-50 w-screen h-screen fixed left-0 top-0 backdrop-blur-[2px] bg-[#0000000c] flex justify-center items-center'>
      <div onClick={(e)=> e.stopPropagation()} className='w-[410px] max-sm:w-full rounded-[16px] flex flex-col gap-3 p-5 items-center bg-[#140926]'>
         <Icon className='text-[50px]'/>
         <h3 className='font-[500] text-[20px]'>{heading}</h3>
         <p className='text-[#8C8C8C] text-sm font-[500]'>{message}</p>
      </div>
    </div>
  )
}

export default AlertBox