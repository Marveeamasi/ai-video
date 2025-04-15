'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const [expanded, setExpanded] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <div
        className={`flex items-center border-[0.86px] border-[#CF36E9] transition-all duration-300 cursor-pointer
          ${expanded ? 'w-[298px] h-[35.14px] px-[11px] py-[9px] rounded-[19px]' : 'w-[30px] h-[30px] justify-center rounded-full'}`}
        onClick={() => setExpanded(true)}
      >
        {expanded && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter text"
            className="text-xs font-[400] text-[#D9D9D9] outline-none bg-transparent w-full transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <Image
          className="w-[17.14px] h-[17.14px]"
          src="/search-icon.png"
          alt="Search Icon"
          width={17.14}
          height={17.14}
        />
      </div>
    </div>
  );
}
