'use client'
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Select({ enabled, message, options, setBlurbg, blurbg, selectedOption, setSelectedOptions }) {
  const [showOption, setShowOption] = useState(false);
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
        <Image
          src="/arrow-down.png"
          alt="Dropdown"
          width={24}
          height={24}
          className="h-[24px] w-[24px]"
        />
      </div>
      {showOption && (
        <div className="w-[262px] shadow-lg py-[17px] gap-[16px] transition-all duration-300 ease-in-out px-[14px] rounded-[8px] bg-[#261148] absolute bottom-[110%] left-0 flex flex-col items-center justify-center z-30">
          {options.map((option) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOptions(option);
                setShowOption(false);
                setBlurbg(false);
              }}
              key={option}
              value={option}
              className="bg-[#140926] w-[234px] h-[35px] rounded-[4px] py-[10px] px-[12px] hover:border hover:border-[#CF36E9] flex items-center justify-start"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}