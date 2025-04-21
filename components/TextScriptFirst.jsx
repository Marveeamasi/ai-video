import Image from 'next/image'
import React from 'react'

const TextScriptFirst = ({setIsLong, isLong, scriptText, handleTextScript}) => {
  return (
    <div className="flex flex-col w-full gap-[6px]">
                    <div className="flex items-center gap-3">
                    <Image src='/pencil-edit.png' alt="text icon" width={16} height={16} className='w-[16px] h-[16px] text-[12.51px] font-[700]'/>
                    Enter Text
                    </div>
                    <textarea value={scriptText}
                    onChange={handleTextScript} className="min-h-[95px] w-full rounded-[4px] p-[5px] bg-[#261148] outline-none font-[400] text-[12px] placeholder:text-[#dbdbdb] placeholder:font-[400] resize-none" placeholder="Write a short to medium length sentence, Separated by lines breaks for new ideas  (They will become new Shots)"/>
                    <div className="flex items-center gap-3">
                    <Image src='/scissors.png' alt="text icon" width={24} height={24} className='w-[24px] h-[24px] text-[12.51px] font-[700]'/>
                    Script Splitting
                    </div>
                    <p className="font-[300] text-[12px] text-[#8C8C8C] w-full">If you pick "Short", we'll cut down your script for a dynamic editing (3-5 seconds cuts). <br/>
                    If you pick "Long", we'll do 12-15 second segments with less cuts.</p>
                    <div className="w-[190px] h-[45px] rounded-[12px] bg-[#9413E6] p-1 flex items-center gap-2">
                    <div onClick={()=> setIsLong(false)} className={`${isLong ? 'transparent' : 'bg-[#140926]'} w-[90px] h-[36px] rounded-[8px] text-[12.51px] p-[10px] gap-[10px] flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer`}>
                    Short
                    </div>
                    <div  onClick={()=> setIsLong(true)} className={`${isLong ? 'bg-[#140926]' : 'transparent'} w-[90px] h-[36px] rounded-[8px] text-[12.51px] p-[10px] gap-[10px] flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer`}>
                     Long
                    </div>
                    </div>   
                    </div>
  )
}

export default TextScriptFirst
