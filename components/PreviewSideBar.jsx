'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import ToggleSwitch from './ToggleSwitch'
import PreviewSideBarSelect from './PreviewSideBarSelect'

const PreviewSideBar = ({ showSlide }) => {
  const [blurbg, setBlurbg] = useState(false);
  const [selectName, setSelectName] = useState('');
  const [allowZoom, setAllowZoom] = useState(false);
  const [allowCaption, setAllowCaption] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    Avatar: 'John Doe',
    Camera: 'Face',
    'Body Language': 'Gesture 1',
    'Ai Caption': 'DYNAMIC',
    Background: 'None',
    Music: 'Cyberpunk Electro',
    Voice: 'John Doe',
  });

  const handleSelectClick = (name) => {
    setBlurbg(!blurbg);
    setSelectName(name);
  };

  const handleSetSelectedOption = (name, option) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: option }));
  };

  return (
    <aside
      className={`bg-[#261148] w-fit h-screen pt-10 pl-5 max-lg:pl-0 pb-5 pr-0 flex flex-col gap-5 font-[500] transition-all duration-300 ease-in-out text-[16px] sticky left-0 top-0 z-30 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:bg-transparent max-lg:backdrop-blur-sm`}
    >
      <Image src={'/logo.png'} width={214} height={44} className='w-[214px] h-[44px] max-lg:hidden' alt='logo' />
      <div className='overflow-y-scroll max-lg:pt-[70px] overflow-x-hidden'>
        <div className='bg-[#140926] max-lg:bg-[#140926c0] relative max-lg:backdrop-blur-sm max-lg:border max-lg:border-[#ffffff17] rounded-[8px] p-5 flex gap-5 flex-col w-[295px]'>
          <PreviewSideBarSelect
            setBlurbg={setBlurbg}
            selectName={selectName}
            setSelectName={setSelectName}
            handleSelectClick={handleSelectClick}
            pos={'top-[110%]'}
            type={''}
            name={'Avatar'}
            options={['John Doe', 'Simon Phil', 'Ruda Mark', 'Jane Path']}
            image={'/user-circle.png'}
            selectedOption={selectedOptions.Avatar}
            setSelectedOption={handleSetSelectedOption}
          />
          <PreviewSideBarSelect
            setBlurbg={setBlurbg}
            selectName={selectName}
            setSelectName={setSelectName}
            handleSelectClick={handleSelectClick}
            pos={'top-[110%]'}
            type={''}
            name={'Camera'}
            options={['Face', 'Side Profile']}
            image={'/face-id.png'}
            selectedOption={selectedOptions.Camera}
            setSelectedOption={handleSetSelectedOption}
          />
          <div className={`flex relative ${selectName === 'Body Language' ? 'z-50' : 'z-10'} items-center justify-between text-[12.51px] font-[700]`}>
            Zoom
            <ToggleSwitch isOn={allowZoom} setIsOn={setAllowZoom} />
          </div>
          <PreviewSideBarSelect
            setBlurbg={setBlurbg}
            selectName={selectName}
            setSelectName={setSelectName}
            handleSelectClick={handleSelectClick}
            pos={'top-[110%]'}
            type={''}
            name={'Body Language'}
            options={['Gesture 1', 'Gesture 2']}
            image={'/video-camera-ai.png'}
            selectedOption={selectedOptions['Body Language']}
            setSelectedOption={handleSetSelectedOption}
          />
          <div className={`flex relative ${selectName === 'Ai Caption' ? 'z-50' : 'z-10'} items-center justify-between text-[12.51px] font-[700]`}>
            Caption
            <ToggleSwitch isOn={allowCaption} setIsOn={setAllowCaption} />
          </div>
          <PreviewSideBarSelect
            setBlurbg={setBlurbg}
            selectName={selectName}
            setSelectName={setSelectName}
            handleSelectClick={handleSelectClick}
            pos={'top-[110%]'}
            type={'caption'}
            name={'Ai Caption'}
            options={['DYNAMIC', 'PROFESSIONAL', 'DOCUMENTARY']}
            image={'/closed-caption.png'}
            selectedOption={selectedOptions['Ai Caption']}
            setSelectedOption={handleSetSelectedOption}
          />
          <PreviewSideBarSelect
            setBlurbg={setBlurbg}
            selectName={selectName}
            setSelectName={setSelectName}
            handleSelectClick={handleSelectClick}
            pos={'bottom-[110%]'}
            type={'background'}
            name={'Background'}
            options={['None', 'Upload', 'Mist', 'Mist', 'Mist', 'Mist']}
            image={''}
            selectedOption={selectedOptions.Background}
            setSelectedOption={handleSetSelectedOption}
          />
          <PreviewSideBarSelect
            setBlurbg={setBlurbg}
            selectName={selectName}
            setSelectName={setSelectName}
            handleSelectClick={handleSelectClick}
            pos={'bottom-[110%]'}
            type={''}
            name={'Music'}
            options={['Cyberpunk Electro', 'Cyberpunk Electro', 'Dramatic tension 2']}
            image={'/music-note-square.png'}
            selectedOption={selectedOptions.Music}
            setSelectedOption={handleSetSelectedOption}
          />
          <PreviewSideBarSelect
            setBlurbg={setBlurbg}
            selectName={selectName}
            setSelectName={setSelectName}
            handleSelectClick={handleSelectClick}
            pos={'bottom-[110%]'}
            type={''}
            name={'Voice'}
            options={['John Doe', 'John Doe', 'John Doe', 'John Doe', 'John Doe']}
            image={'/voice.png'}
            selectedOption={selectedOptions.Voice}
            setSelectedOption={handleSetSelectedOption}
          />
          {blurbg && <div className='bg-[#0000001A] backdrop-blur-[2px] absolute top-0 w-full h-full z-20'></div>}
        </div>
      </div>
    </aside>
  );
};

export default PreviewSideBar;
