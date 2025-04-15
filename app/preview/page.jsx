'use client'
import Preview from '@/components/Preview'
import PreviewSideBar from '@/components/PreviewSideBar'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [showSlide, setShowSlide] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowSlide(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleShowSlide = () => {
    setShowSlide(!showSlide);
  }

  return (
    <div className="flex w-full h-full">
    {showSlide && <PreviewSideBar showSlide={showSlide}/>}
    <Preview toggleShowSlide={toggleShowSlide} showSlide={showSlide}/>
  </div>
  )
}
