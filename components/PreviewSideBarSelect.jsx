'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import AvatarDrop from './AvatarDrop';
import CameraDrop from './CameraDrop';
import CaptionDrop from './CaptionDrop';
import BackgroundDrop from './BackgroundDrop';
import MusicDrop from './MusicDrop';
import VoiceDrop from './VoiceDrop';

const PreviewSideBarSelect = ({image, options, name, type, pos, selectName, handleSelectClick, setBlurbg, setSelectName}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectOption = (name) => {
    setSelectedOption(name);
    setBlurbg(false);
  }

  const kill = () => {
    setSelectName('');
    setBlurbg(false);
  }

  return (
    <div onClick={() => handleSelectClick(name)} className={`flex gap-2 flex-col relative ${name} ${selectName === name ? 'z-50' : 'z-10'}`}>
      {name}
      <div className={`rounded-[4px] p-3 w-full flex gap-2 items-center text-[12.51px] bg-[#261148] cursor-pointer
         ${type === 'caption' && selectedOption === 'DYNAMIC' && 'pacifico text-[#FCE340] font-[400] text-[12px]'}
         ${type === 'caption' && selectedOption === 'PROFESSIONAL' && 'font-[700] text-[14px]'}
         ${type === 'caption' && selectedOption === 'DOCUMENTARY' && 'font-[800] text-[14px] italic'}
         `}>
        {type !== 'background' && <Image src={image} width={24} height={24} className={`w-[24px] h-[24px]`} alt='user'/>}
        {selectedOption}
      </div>
      {selectName === 'Avatar' && name === 'Avatar' && <AvatarDrop kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption}/>}
      {selectName === 'Camera' && name === 'Camera' && <CameraDrop kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption}/>}
      {selectName === 'Body Language' && name === 'Body Language' && <CameraDrop kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption}/>}
      {selectName === 'Ai Caption' && name === 'Ai Caption' && <CaptionDrop kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption}/>}
      {selectName === 'Background' && name === 'Background' && <BackgroundDrop kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption}/>}
      {selectName === 'Music' && name === 'Music' && <MusicDrop kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption}/>}
      {selectName === 'Voice' && name === 'Voice' && <VoiceDrop kill={kill} options={options} pos={pos} handleSelectOption={handleSelectOption}/>}
    </div>
  )
}
export default PreviewSideBarSelect
