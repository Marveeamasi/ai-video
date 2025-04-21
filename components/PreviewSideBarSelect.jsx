'use client'
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import AvatarDrop from './AvatarDrop';
import CameraDrop from './CameraDrop';
import CaptionDrop from './CaptionDrop';
import BackgroundDrop from './BackgroundDrop';
import MusicDrop from './MusicDrop';
import VoiceDrop from './VoiceDrop';

const PreviewSideBarSelect = ({ image, options, name, type, pos, selectName, handleSelectClick, setBlurbg, setSelectName, selectedOption, setSelectedOption }) => {
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    setSelectedOption(name, option);
    setSelectName('');
    setBlurbg(false);
  };

  const kill = () => {
    setSelectName('');
    setBlurbg(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        kill();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      onClick={() => handleSelectClick(name)}
      className={`flex gap-2 flex-col relative ${name} ${selectName === name ? 'z-50' : 'z-10'}`}
    >
      {name}
      <div
        className={`rounded-[4px] p-3 w-full flex gap-2 items-center text-[12.51px] bg-[#261148] cursor-pointer
          ${type === 'caption' && selectedOption === 'DYNAMIC' && 'pacifico text-[#FCE340] font-[400] text-[12px]'}
          ${type === 'caption' && selectedOption === 'PROFESSIONAL' && 'font-[700] text-[14px]'}
          ${type === 'caption' && selectedOption === 'DOCUMENTARY' && 'font-[800] text-[14px] italic'}
        `}
      >
        {type !== 'background' && <Image src={image} width={24} height={24} className={`w-[24px] h-[24px]`} alt='user' />}
        {selectedOption}
      </div>
      {selectName === 'Avatar' && name === 'Avatar' && (
        <AvatarDrop dropdownRef={dropdownRef} kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption} />
      )}
      {selectName === 'Camera' && name === 'Camera' && (
        <CameraDrop dropdownRef={dropdownRef} kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption} />
      )}
      {selectName === 'Body Language' && name === 'Body Language' && (
        <CameraDrop dropdownRef={dropdownRef} kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption} />
      )}
      {selectName === 'Ai Caption' && name === 'Ai Caption' && (
        <CaptionDrop dropdownRef={dropdownRef} kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption} />
      )}
      {selectName === 'Background' && name === 'Background' && (
        <BackgroundDrop dropdownRef={dropdownRef} kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption} />
      )}
      {selectName === 'Music' && name === 'Music' && (
        <MusicDrop dropdownRef={dropdownRef} kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption} />
      )}
      {selectName === 'Voice' && name === 'Voice' && (
        <VoiceDrop dropdownRef={dropdownRef} kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption} />
      )}
    </div>
  );
};

export default PreviewSideBarSelect;
