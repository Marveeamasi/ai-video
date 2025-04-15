'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const MusicDrop = ({handleSelectOption, pos, options, kill}) => {
    const [barWidth, setBarWidth] = useState(0);
        const barRef = useRef(null);
        const progress = 60;
      
        useEffect(() => {
          setBarWidth(progress);
        }, [progress]);

  return (
    <div onClick={(e)=> e.stopPropagation()} className={`absolute ${pos} bg-[#140926] w-[285px] left-[-5%] rounded-[8px] gap-3 flex flex-col border border-[#CF36E9] py-[20px] px-[9px]`}>
       <div className='flex items-center gap-5 '>
                  <Image src={'/arrow-right.png'} onClick={kill} width={20} height={20} alt='arrow' className='w-[20px] h-[20px] cursor-pointer'/>
            Music
             </div>
             <div className="flex w-full justify-center items-center">
                   <div className="w-full h-[6px] rounded-[8px] bg-[#D9D9D9] relative">
      <div
        ref={barRef}
        className="h-full rounded-[16px] bg-[#9413E6]"
        style={{ width: `${barWidth}%` }}
      >
        <div
          className="absolute top-[-2px] w-[9px] h-[9px] rounded-full border border-[#00000025]"
          style={{ 
            left: `calc(${barWidth}% - 6px)`,
            backgroundColor: '#5500FF', 
          }}
        />
      </div>
    </div>
    </div>
             <div className='grid grid-cols-1 gap-1'>
                                        {options.map((option, i)=> (
                                              <div key={i} onClick={()=>handleSelectOption(option)} className={`w-full hover:border hover:border-[#CF36E9] h-[40px] text-[12.51px] font-[400] bg-[#261148] rounded-[4px] flex gap-3 p-2 items-center cursor-pointer`}>
                                            <Image src={'/play-square-purple.png'} width={20} height={20} className='w-[20px] h-[20px]' alt='play'/>
                                             {option}
                                                  </div>
                                        ))}
                  </div>
    </div>
  )
}

export default MusicDrop
