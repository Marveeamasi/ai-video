import Image from 'next/image'
import React from 'react'
import ToggleSwitch from './ToggleSwitch'

const TextScriptSecond = ({script, handleTextScript}) => {
  return (
    <div className="flex flex-col w-full gap-[6px]">
                       <div className="flex items-center gap-3">
                       <Image src='/scissors.png' alt="text icon" width={24} height={24} className='w-[24px] h-[24px] text-[12.51px] font-[700]'/>
                       Cut Your Script
                       </div>
                       <textarea onChange={handleTextScript} value={script} className='min-h-[196px] w-full rounded-[4px] p-[5px] bg-[#261148] resize-none'/>
                       <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                        <div className="flex items-center gap-3">
                       <Image src='/ai-mic.png' alt="text icon" width={20} height={20} className='w-[20px] h-[20px] text-[12.51px] font-[700]'/>
                       Voice Transformation
                       </div>
                       <div className='text-[#8C8C8C] text-[10px]'>Choose a voice to embody your speech</div>
                        </div>
                        <ToggleSwitch/>
                       </div>
                       </div>
  )
}

export default TextScriptSecond