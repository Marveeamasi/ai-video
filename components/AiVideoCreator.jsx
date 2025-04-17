'use client';
import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import AiVideoCreatorCards from './AiVideoCreatorCards';
import SearchBar from './SearchBar';
import Link from 'next/link';

const MOCK_VIDEOS = [
  { id: 1, heading: 'Web developer Alex Story', image: '/person3.png', time: 'Edited 1 Day Ago', isGenerated: false },
  { id: 2, heading: 'Web developer Alex Story', image: '/person1.png', time: 'Edited 1 Day Ago', isGenerated: true },
  { id: 3, heading: 'Web developer Alex Story', image: '/person2.png', time: 'Edited 1 Day Ago', isGenerated: true },
];

const AiVideoCreator = () => {
  const [isDrop, setIsDrop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleDrop = () => setIsDrop(prev => !prev);

  const filteredVideos = useMemo(() => {
    if (!searchTerm.trim()) return MOCK_VIDEOS;
    return MOCK_VIDEOS.filter(video =>
      video.heading.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="w-full min-h-screen relative">
      <Image className="absolute right-0 top-0 z-0" src="/bgtop.png" alt="bg svg" width={400} height={400} />
      <Image className="absolute left-0 bottom-0 z-0" src="/bgbottom.png" alt="bg svg two" width={600} height={600} />

      <Navbar toggleDrop={toggleDrop} isDrop={isDrop} />

      <div className="flex flex-col p-5 pt-10 pb-40">
        <div className="flex sm:justify-between max-sm:flex-col max-sm:gap-5 w-full items-center">
          <div className="flex items-center gap-2">
            <Image src="/ai-magic.png" width={24.35} height={24.35} alt="ai magic" />
            <h1 className="text-[24px] font-[500]">Ai Video Creator</h1>
          </div>

          <div className="flex items-center max-sm:flex-col gap-5">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <label htmlFor='uploadnow' className="z-2 cursor-pointer hover:animate-pulse w-[92px] h-[24px] flex gap-2 items-center text-[14px] justify-center">
              Upload
              <Image alt="drop down" src="/chevron-down.png" width={12} height={6} />
              <input type="file" id='uploadnow' className='hidden' onChange={(e)=> setSelectedFile(e.target.files[0])}/>
            </label>
          </div>
        </div>

        <Link
          href="#"
          className="py-[10px] px-[20px] rounded-[8px] border max-sm:gap-2 max-sm:flex-col bg-[#BB5ACC5E] border-[#CF36E9] flex justify-between items-center mt-10"
        >
          <div className="text-[16px] font-[500] max-sm:text-center max-sm:text-sm">
            Get more and take your content to the next level
          </div>
          <div className="flex items-center gap-2">
            <Image src="/ai-magic.png" width={24} height={24} alt="ai magic" />
            <span className="text-[16px] font-[500]">UPGRADE</span>
          </div>
        </Link>

        <div className="flex gap-1 items-center py-2 max-sm:self-center">
          Video
          <span className="text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center">
            {filteredVideos.length}
          </span>
        </div>

        <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
          {filteredVideos.map(video => (
            <AiVideoCreatorCards
              key={video.id}
              heading={video.heading}
              image={video.image}
              time={video.time}
              isGenerated={video.isGenerated}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiVideoCreator;
