'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import SelectBtnForPreview from './SelectBtnForPreview';

const VoiceDrop = ({handleSelectOption, pos, options, kill}) => {
     const [filteredOptions, setFilteredOptions] = useState(options);
    const [isPublic, setIsPublic] = useState(true);

    const handleSearch = (value) => {
        if (!value) {
            setFilteredOptions(options);
            return;
          }
      
          const searchTerm = value.toLowerCase();
          
          const filtered = options.filter(option => 
            option.toLowerCase().includes(searchTerm)
          );
      
          setFilteredOptions(filtered);
    }

  return (
    <div onClick={(e)=> e.stopPropagation()} className={`absolute ${pos} bg-[#140926] w-[285px] left-[-5%] rounded-[8px] gap-3 flex flex-col border border-[#CF36E9] py-[20px] px-[9px]`}>
       <div className='flex items-center gap-5 '>
                  <Image src={'/arrow-right.png'} onClick={kill} width={20} height={20} alt='arrow' className='w-[20px] h-[20px] cursor-pointer'/>
            Voice
             </div>
              <div className="w-full h-[45px] rounded-[12px] bg-[#9413E6] p-1 flex items-center gap-2">
                                 <div onClick={()=> setIsPublic(false)} className={`${isPublic ? 'transparent' : 'bg-[#140926]'} w-1/2 h-full rounded-[8px] text-[12.51px] p-[10px] gap-[10px] flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer`}>
                                 My Avatar
                                 </div>
                                 <div  onClick={()=> setIsPublic(true)} className={`${isPublic ? 'bg-[#140926]' : 'transparent'} w-1/2 h-full rounded-[8px] text-[12.51px] p-[10px] gap-[10px] flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer`}>
                                  Public Avatar
                                 </div>
                                 </div>
                                  <div className="bg-[#140926] w-full h-[35px] border border-[#8C8C8C80] rounded-[4px] py-[10px] px-[12px] hover:border-[#CF36E9] flex items-center gap-[10px]">
                                                 <Image
                                                     src="/search-white.png"
                                                     alt="search icon"
                                                     width={16}
                                                     height={16}
                                                     className="h-[16px] w-[16px]"
                                                 />
                                                 <input 
                                                     onClick={(e) => e.stopPropagation()} 
                                                     onChange={(e) => handleSearch(e.target.value)} 
                                                     type="text" 
                                                     placeholder="Search" 
                                                     className="placeholder:text-[#8C8C8C] text-[10px] font-[400] bg-transparent outline-none"
                                                 />
                                 </div>  
                                 <div onClick={(e)=> e.stopPropagation()} className="flex justify-between items-center w-full gap-[5px]">
            <SelectBtnForPreview pos={'left'} lists={['Language', 'English', 'French', 'Spanish']}/>
           <SelectBtnForPreview pos={'right'} lists={['Gender', 'Male', 'Female']}/>
          </div>
             <div className='grid grid-cols-1 gap-1'>
                                        {filteredOptions.map((option, i)=> (
                                              <div key={i} onClick={()=>handleSelectOption(option)} className={`w-full hover:border hover:border-[#CF36E9] h-[40px] text-[12.51px] font-[400] bg-[#261148] rounded-[4px] flex gap-3 p-2 items-center cursor-pointer`}>
                                            <Image src={'/play-square.png'} width={20} height={20} className='w-[20px] h-[20px]' alt='play'/>
                                             {option}
                                                  </div>
                                        ))}
                  </div>
    </div>
  )
}

export default VoiceDrop
