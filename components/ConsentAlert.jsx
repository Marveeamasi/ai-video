'use client'

import { useState } from "react";

const ConsentAlert = () => {
  const [value, setValue] = useState('');

  return (
    <div className="bg-[#140926] max-sm:w-full max-sm:h-auto w-[710px] h-[130px] rounded-[16px] p-[20px] flex justify-center items-center gap-[11px] flex-col">
       <div className="font-[300] text-center text-[#8C8C8C] text-[12px]">To complete the training, we need to make sure that you're the person in the video. Record or upload a video of you saying the following sentence:</div>
       <div className="w-full"><hr className="w-full text-[#F1F1F11A]"/></div>
       <div className="font-[700] text-[16px] text-center space-x-1"><span>I,</span><input type="text" placeholder="Full Name" value={value} size={Math.max(value.length, 4)} className={`outline-none border-b-[#fff] border-b-2 min-w-[50px]`} onChange={(e)=> setValue(e.target.value)}/> <span>, authorize Argil to use the footage of me to build my avatar.</span></div>
    </div>
  )
}

export default ConsentAlert;