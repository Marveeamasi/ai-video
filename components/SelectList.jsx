'use client'
import Image from "next/image";
import { useState } from "react";

export default function SelectList({ lists, searchable, handleClick, setShowList }) {
  const [filteredlists, setFilteredlists] = useState(lists);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredlists(lists);
      return;
    }

    const searchTerm = value.toLowerCase();
    
    const filtered = lists.filter(option => 
      option.toLowerCase().includes(searchTerm)
    );

    setFilteredlists(filtered);
  }

  return (
    <div 
        className="w-[122px] shadow-lg py-[10px] gap-[5px] transition-all duration-300 ease-in-out px-[5px] rounded-[8px] bg-[#261148] absolute top-[110%] left-0 flex flex-col items-center justify-center z-50"
        onClick={(e) => e.stopPropagation()}
    >
        {searchable && (
            <div className="bg-[#140926] w-full h-[35px] rounded-[4px] py-[10px] px-[12px] hover:border hover:border-[#CF36E9] flex items-center gap-[10px]">
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
        )}
        {filteredlists.map((option) => (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick(option);
                    setShowList(false);
                }}
                key={option}
                value={option}
                className="bg-[#140926] gap-[10px] w-full h-[35px] rounded-[4px] py-[10px] px-[12px] text-[12.51] hover:border hover:border-[#CF36E9] flex items-center justify-start"
            >
                {option}
            </div>
        ))}
    </div>
  );
}
