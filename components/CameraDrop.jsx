import Image from 'next/image'
import React from 'react'

const CameraDrop = ({handleSelectOption, pos, options, kill}) => {
  return (
    <div onClick={(e)=> e.stopPropagation()} className={`absolute ${pos} bg-[#140926] w-[285px] left-[-5%] rounded-[8px] gap-3 flex flex-col border border-[#CF36E9] py-[20px] px-[9px]`}>
       <div className='flex items-center gap-5 '>
                  <Image src={'/arrow-right.png'} onClick={kill} width={20} height={20} alt='arrow' className='w-[20px] h-[20px] cursor-pointer'/>
            Camera
             </div>
              <div className='grid grid-cols-1 gap-2'>
                                    {options.map((option)=> (
                                          <div key={option} onClick={()=>handleSelectOption(option)} className='w-full hover:border hover:border-[#CF36E9] h-fit text-[12.51px] font-[400] bg-[#140926] relative rounded-[4px] flex justify-center items-center cursor-pointer'>
                                          <Image src={'/person-12.png'} alt='cards' width={254} height={130} className='rounded-[4px] w-full h-[130px] object-cover'/>
                                          <div className='absolute w-full bottom-0 flex justify-start items-center p-3' style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0.09) 0%, #000000 100%)`}}>{option}</div>
                                              </div>
                                    ))}
              </div>
    </div>
  )
}

export default CameraDrop
