import React from 'react'
import Image from 'next/image'

const CaptionDrop = ({handleSelectOption, pos, options, kill}) => {
  return (
    <div onClick={(e)=> e.stopPropagation()} className={`absolute ${pos} bg-[#140926] w-[285px] left-[-5%] rounded-[8px] gap-3 flex flex-col border border-[#CF36E9] py-[20px] px-[9px]`}>
           <div className='flex items-center gap-5 '>
                      <Image src={'/arrow-right.png'} onClick={kill} width={20} height={20} alt='arrow' className='w-[20px] h-[20px] cursor-pointer'/>
                Caption
                 </div>
                  <div className='grid grid-cols-1 gap-1'>
                                        {options.map((option)=> (
                                              <div key={option} onClick={()=>handleSelectOption(option)} className={`w-full hover:border hover:border-[#CF36E9] h-[47px] text-[12.51px] font-[400] bg-[#261148] relative rounded-[4px] flex justify-center items-center cursor-pointer 
                                               ${option === 'DYNAMIC' && 'pacifico text-[#FCE340] font-[400] text-[12px]'}
         ${option === 'PROFESSIONAL' && 'font-[700] text-[14px]'}
         ${option === 'DOCUMENTARY' && 'font-[800] text-[14px] italic'}`}>
                                             {option}
                                                  </div>
                                        ))}
                  </div>
                  <div className='flex flex-col gap-1'>
                    Position
                    <div className='grid grid-cols-3 gap-2 text-[12px] font-[400]'>
                            <button className='cursor-pointer h-[35px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Bottom</button>
                            <button className='cursor-pointer h-[35px] rounded-[4px]  bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Middle</button>
                            <button className='cursor-pointer h-[35px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Top</button>
                        </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    Size
                    <div className='grid grid-cols-3 gap-2 text-[12px] font-[400]'>
                            <button className='cursor-pointer h-[35px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Large</button>
                            <button className='cursor-pointer h-[35px] rounded-[4px]  bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Medium</button>
                            <button className='cursor-pointer h-[35px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Small</button>
                        </div>
                  </div>
        </div>
  )
}

export default CaptionDrop
