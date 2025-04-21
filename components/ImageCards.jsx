'use client'
import React, { useState, useEffect, useRef } from 'react'
import ImageCard from './ImageCard'

const ImageCards = ({ setBlurbg, setShowCard, setStyle }) => {
  const cardRef = useRef(null);

  const handleClick = (name) => {
    setBlurbg(false);
    setShowCard(false);
    setStyle(name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setBlurbg(false);
        setShowCard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setBlurbg, setShowCard]);

  return (
    <div className={`flex justify-center absolute pt-14 z-20 items-center w-full`}>
      <div
        ref={cardRef}
        className={`w-[264px] rounded-[8px] py-[17px] px-[14px] gap-[16px] grid grid-cols-3 bg-[#261148]`}
      >
        <div
          onClick={() => handleClick('Auto')}
          className="w-[70px] h-[70px] hover:border hover:border-[#CF36E9] text-[10px] font-[400] bg-[#140926] rounded-[4px] flex justify-center items-center cursor-pointer"
        >
          Auto
        </div>
        <ImageCard handleClick={handleClick} image={'/card1.png'} name={'Hyper-realistic'} />
        <ImageCard handleClick={handleClick} image={'/card2.png'} name={'Cinematic'} />
        <ImageCard handleClick={handleClick} image={'/card3.png'} name={'Cartoon'} />
        <ImageCard handleClick={handleClick} image={'/card4.png'} name={'Impressionistic'} />
        <ImageCard handleClick={handleClick} image={'/card5.png'} name={'Water-Colour'} />
        <ImageCard handleClick={handleClick} image={'/card6.png'} name={'Steam Punk'} />
        <ImageCard handleClick={handleClick} image={'/card7.png'} name={'Fantasy'} />
        <ImageCard handleClick={handleClick} image={'/card8.png'} name={'Minimalistic'} />
        <ImageCard handleClick={handleClick} image={'/card9.png'} name={'Pixel'} />
        <ImageCard handleClick={handleClick} image={'/card10.png'} name={'Anime'} />
        <ImageCard handleClick={handleClick} image={'/card11.png'} name={'Line art'} />
        <ImageCard handleClick={handleClick} image={'/card12.png'} name={'Children’s Book'} />
      </div>
    </div>
  );
};

export default ImageCards;