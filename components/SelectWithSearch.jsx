'use client'
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function SelectWithSearch({ enabled, message, options, setBlurbg, blurbg, selectedOption, setSelectedOptions }) {
  const [showOption, setShowOption] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectRef = useRef(null);

  const handleOption = () => {
    if (enabled) {
      setShowOption(!showOption);
      setBlurbg(!blurbg);
    }
  };

  useEffect(() => {
    if (!enabled) setSelectedOptions(message);
    else setSelectedOptions(options[0]);
  }, [enabled]);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredOptions(options);
      setShowOption(true);
      return;
    }

    const searchTerm = value.toLowerCase();
    const filtered = options.filter((option) => option.toLowerCase().includes(searchTerm));
    setFilteredOptions(filtered);
    setShowOption(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOption(false);
        setBlurbg(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setBlurbg]);

  return (
    <div
      ref={selectRef}
      onClick={handleOption}
      className="relative flex justify-between items-center text-left w-full bg-[#261148] rounded-[4px] shadow-sm cursor-pointer h-[44px]"
    >
      <div className={`text-[12.51px] font-[700] py-2 px-4 ${enabled ? 'text-white' : 'text-[#8C8C8C]'}`}>
        {selectedOption}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <Image src="/arrow-down.png" alt="Dropdown" width={24} height={24} className="h-[24px] w-[24px]" />
      </div>
      {showOption && (
        <div className="w-[262px] shadow-lg py-[17px] gap-[5px] transition-all duration-300 ease-in-out px-[14px] rounded-[8px] bg-[#261148] absolute bottom-[110%] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-30">
          <div className="bg-[#140926] w-[234px] h-[35px] rounded-[4px] py-[10px] px-[12px] hover:border hover:border-[#CF36E9] flex items-center gap-[10px]">
            <Image src="/search-white.png" alt="search icon" width={16} height={16} className="h-[16px] w-[16px]" />
            <input
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="placeholder:text-[#8C8C8C] text-[10px] font-[400] bg-transparent outline-none"
            />
          </div>
          {filteredOptions.map((option) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOptions(option);
                setShowOption(false);
                setBlurbg(false);
              }}
              key={option}
              value={option}
              className="bg-[#140926] gap-[10px] w-[234px] h-[35px] rounded-[4px] py-[10px] px-[12px] text-[12.51] hover:border hover:border-[#CF36E9] flex items-center justify-start"
            >
              <Image src="/play-square.png" alt="search icon" width={20} height={20} className="h-[20px] w-[20px]" />
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}