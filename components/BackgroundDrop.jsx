import Image from 'next/image'
import React from 'react'

const BackgroundDrop = ({handleSelectOption, pos, options, kill}) => {
  return (
    <div onClick={(e)=> e.stopPropagation()} className={`absolute ${pos} bg-[#140926] w-[285px] left-[-5%] rounded-[8px] gap-3 flex flex-col border border-[#CF36E9] py-[20px] px-[9px]`}>
       <div className='flex items-center gap-5 '>
                  <Image src={'/arrow-right.png'} onClick={kill} width={20} height={20} alt='arrow' className='w-[20px] h-[20px] cursor-pointer'/>
            Background
             </div>
              <div className='grid grid-cols-3 gap-1'>
                                    {options.map((option, i)=> (
                                          <div key={i} onClick={()=>handleSelectOption(option)} className={`w-full hover:border ${option==='Upload' && 'flex-col'} hover:border-[#CF36E9] h-[78px] text-[10px] font-[400] bg-[#261148] rounded-[4px] flex justify-center p-3  ${option==='None' || option==='Upload' ? 'items-center':'items-end'} cursor-pointer`}>
                                          {option ==='Upload' && <Image src={'/upload.png'} onClick={kill} width={24} height={24} alt='arrow' className='w-[24px] h-[24px]'/>}
                                          <div className=''>{option}</div>
                                              </div>
                                    ))}
              </div>
    </div>
  )
}

export default BackgroundDrop
