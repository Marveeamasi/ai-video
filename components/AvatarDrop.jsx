'use client'
import Image from 'next/image';
import React, { useState, useRef } from 'react'

const AvatarDrop = ({ handleSelectOption, pos, options, kill, dropdownRef }) => {
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
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute ${pos} bg-[#140926] w-[285px] left-[-5%] rounded-[8px] gap-3 flex flex-col border border-[#CF36E9] py-[20px] px-[9px]`}
    >
      <div className='flex items-center gap-5'>
        <Image src={'/arrow-right.png'} onClick={kill} width={20} height={20} alt='arrow' className='w-[20px] h-[20px] cursor-pointer'/>
        All Avatar
      </div>
      <div className="w-full h-[45px] rounded-[12px] bg-[#9413E6] p-1 flex items-center gap-2">
        <div
          onClick={() => setIsPublic(false)}
          className={`${isPublic ? 'transparent' : 'bg-[#140926]'} w-1/2 h-full rounded-[8px] text-[12.51px] p-[10px] gap-[10px] flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer`}
        >
          My Avatar
        </div>
        <div
          onClick={() => setIsPublic(true)}
          className={`${isPublic ? 'bg-[#140926]' : 'transparent'} w-1/2 h-full rounded-[8px] text-[12.51px] p-[10px] gap-[10px] flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer`}
        >
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
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="placeholder:text-[#8C8C8C] text-[10px] font-[400] bg-transparent outline-none"
        />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {filteredOptions.map((option) => (
          <div
            key={option}
            onClick={() => handleSelectOption(option)}
            className='w-fit hover:border hover:border-[#CF36E9] h-fit text-[12.51px] font-[400] bg-[#140926] relative rounded-[4px] flex justify-center items-center cursor-pointer'
          >
            <Image src={'/person-12.png'} alt='cards' width={124} height={130} className='rounded-[4px] w-[124px] h-[130px] object-cover'/>
            <div className='absolute w-full bottom-0 flex justify-center items-center py-2' style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.09) 0%, #000000 100%)` }}>
              {option}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarDrop;
