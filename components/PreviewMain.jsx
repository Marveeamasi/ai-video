'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import PaymentAlert from './PaymentAlert';
import Generating from './Generating';
import Trouble from './Trouble';
import { useRouter } from 'next/navigation';

const PreviewMain = () => {
  const [isLandScape, setIsLandScape] = useState(true);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);
  const [isplay, setIsPlay] = useState(false);
  const [avatar, setAvatar] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  const thumbnailRef = useRef(null);
  const dragRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

  // Format time as MM:SS.SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  // Video control functions
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isplay) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlay(!isplay);
    }
  };

  const handleForward10s = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
    }
  };

  const handleBackward10s = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleNext = () => {
    if (videoRef.current) {
      // Assuming 30-second chapters; adjust as needed
      const chapterLength = 30;
      const nextChapter = Math.ceil(videoRef.current.currentTime / chapterLength) * chapterLength;
      videoRef.current.currentTime = Math.min(videoRef.current.duration, nextChapter);
    }
  };

  const handlePrevious = () => {
    if (videoRef.current) {
      // Assuming 30-second chapters; adjust as needed
      const chapterLength = 30;
      const prevChapter = Math.floor(videoRef.current.currentTime / chapterLength) * chapterLength - chapterLength;
      videoRef.current.currentTime = Math.max(0, prevChapter);
    }
  };

  const handleAddImage = (e) => {
    console.log(e.target.files[0]);
  };

  // Generate thumbnails
  useEffect(() => {
    if (videoRef.current && canvasRef.current && avatar?.video) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const numThumbnails = 15;
      const newThumbnails = [];

      const generateThumbnails = async () => {
        try {
          // Wait for video metadata to load
          await new Promise((resolve) => {
            video.onloadedmetadata = resolve;
            video.load(); // Ensure video is loaded
          });

          setDuration(video.duration);
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const interval = video.duration / (numThumbnails + 1);
          for (let i = 1; i <= numThumbnails; i++) {
            const seekTime = interval * i;
            video.currentTime = seekTime;

            await new Promise((resolve, reject) => {
              video.onseeked = () => resolve();
              video.onerror = () => reject(new Error('Failed to seek video'));
            });

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            newThumbnails.push(canvas.toDataURL('image/png'));
          }

          setThumbnails(newThumbnails);
        } catch (error) {
          console.error('Error generating thumbnails:', error);
        }
      };

      generateThumbnails();
    }
  }, [avatar?.video]);

  // Update currentTime and splitPosition during playback
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const updateTime = () => {
        setCurrentTime(video.currentTime);
        if (!isDragging) {
          setSplitPosition((video.currentTime / video.duration) * 100);
        }
      };
      video.addEventListener('timeupdate', updateTime);
      return () => video.removeEventListener('timeupdate', updateTime);
    }
  }, [isDragging]);

  // Handle thumb dragging
  const handleMove = (e) => {
    if (isDragging && thumbnailRef.current && dragRef.current && videoRef.current) {
      const rect = thumbnailRef.current.getBoundingClientRect();
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const newX = clientX - rect.left;
      const newPosition = (newX / rect.width) * 100;
      const clampedPosition = Math.max(0, Math.min(100, newPosition));
      setSplitPosition(clampedPosition);
      videoRef.current.currentTime = (clampedPosition / 100) * videoRef.current.duration;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    if (videoRef.current && isplay) {
      videoRef.current.pause();
      setIsPlay(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const storedAvatars = localStorage.getItem('AVATARS');
    if (storedAvatars) {
      try {
        const parsedAvatars = JSON.parse(storedAvatars);
        setAvatar(parsedAvatars[0]);
        console.log(parsedAvatars);
      } catch (error) {
        console.error('Error parsing avatars from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const handleNextStep = () => {
    setGenerating(false);
    router.push('/avatar');
  };

  const handleRetry = () => {
    setError(false);
    setGenerating(true);
  };

  const handleCancel = () => {
    setError(false);
    setGenerating(false);
  };

  const handleGenerateClick = () => {
    setShowPaymentAlert(true);
  };

  const handlePaymentConfirmed = () => {
    setShowPaymentAlert(false);
    setGenerating(true);
  };

  return (
    <div className='flex flex-col p-5 pt-4 pb-40 gap-3 items-center'>
      <textarea
        placeholder="What's today's weather and how is it going"
        className='text-[12px] font-[400] w-full p-5 z-5 resize-none max-sm:h-[150px] outline-none placeholder:text-[#D9D9D9] rounded-[8px] h-[193px] bg-[#140926]'
      />

      <div
        className={`${
          isLandScape
            ? 'w-full rounded-[66px] max-sm:h-[180px] max-sm:rounded-[20px]'
            : 'w-[323px] max-sm:w-[200px] rounded-[15px] max-sm:h-[320px] max-sm:rounded-[10px]'
        } h-[454px] transition-all duration-300 ease-in-out z-5 bg-[black] flex items-center justify-center`}
      >
        {avatar?.video && (
          <video
            ref={videoRef}
            alt="video of a person"
            src={avatar.video}
            className={`${
              isLandScape
                ? 'w-full rounded-[66px] max-sm:h-[180px] max-sm:rounded-[20px]'
                : 'w-[323px] max-sm:w-[200px] rounded-[15px] max-sm:h-[320px] max-sm:rounded-[10px]'
            } h-[454px] transition-all duration-300 ease-in-out flex items-center justify-center object-contain`}
          />
        )}
      </div>

      <div className='flex items-center justify-between z-5 w-full px-5 max-sm:flex-col max-sm:justify-center max-sm:gap-5'>
        <div className='flex items-center gap-[10px] max-sm:w-full max-sm:justify-between'>
          <div
            onClick={() => setIsLandScape(!isLandScape)}
            className='flex items-center p-1 rounded-[4px] text-[#9413E6] text-[12px] bg-[white] gap-3 cursor-pointer'
          >
            {isLandScape ? 'Landscape' : 'Portrait'}
            <Image src='/arrow-down-purple.png' width={16} height={16} alt='arrow' />
          </div>
          <label htmlFor="add-file">
            <Image
              className='w-[24px] h-[24px] cursor-pointer hover:animate-pulse'
              src='/image-add.png'
              width={24}
              height={24}
              alt='add image'
            />
          </label>
          <input type="file" accept='image/*' className='hidden' id='add-file' onChange={handleAddImage} />
        </div>

        <div className='flex items-center justify-center gap-[10px] max-sm:gap-10'>
          <Image
            onClick={handleBackward10s}
            src='/go-backward-10-sec.png'
            width={20}
            height={20}
            alt='back 10s'
            className='w-[20px] h-[20px] cursor-pointer hover:animate-pulse'
          />
          <Image
            onClick={handlePrevious}
            src='/arrow-left-double.png'
            width={20}
            height={20}
            alt='prev'
            className='w-[20px] h-[20px] cursor-pointer hover:animate-pulse'
          />
          <Image
            onClick={handlePlayPause}
            src={isplay ? '/pause.png' : '/play.png'}
            width={20}
            height={20}
            alt='pause/play'
            className='w-[20px] h-[20px] cursor-pointer hover:animate-pulse'
          />
          <Image
            onClick={handleNext}
            src='/arrow-right-double.png'
            width={20}
            height={20}
            alt='next'
            className='w-[20px] h-[20px] cursor-pointer hover:animate-pulse'
          />
          <Image
            onClick={handleForward10s}
            src='/go-forward-10-sec.png'
            width={20}
            height={20}
            alt='forward 10s'
            className='w-[20px] h-[20px] cursor-pointer hover:animate-pulse'
          />
        </div>

        <div className='flex items-center justify-end gap-[10px] text-[#8C8C8C] text-[12px]'>
          {formatTime(currentTime)}/{formatTime(duration)}
        </div>
      </div>

      <div className='px-10 pt-5 max-sm:px-0 w-full'>
        <div
          ref={thumbnailRef}
          className='relative h-[54px] bg-[#9413E6] p-1 rounded-[4px] w-full overflow-x-hidden flex items-center touch-action-none'
        >
          <div className='grid grid-cols-15 h-full w-full'>
            {avatar?.video && thumbnails.length > 0 ? (
              thumbnails.map((src, index) => (
                <div key={index} className='w-full h-full'>
                  <img src={src} className='w-full h-full object-cover' alt={`frame-${index}`} />
                </div>
              ))
            ) : (
              Array(15)
                .fill()
                .map((_, index) => (
                  <div key={index} className='w-full h-full bg-gray-500'>
                    <Image src='/person-12.png' height={48.86} width={55.05} className='w-full h-full object-cover' alt='frame' />
                  </div>
                ))
            )}
          </div>

          <div
            ref={dragRef}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            className='absolute w-[5px] h-full bg-[#9413E6] cursor-ew-resize z-10'
            style={{ left: `${splitPosition}%`, transform: 'translateX(-50%)' }}
          />
        </div>
      </div>

      <button
        onClick={handleGenerateClick}
        className='bg-[#9413E6] text-white text-[16px] font-[500] mt-2 rounded-[4px] hover:opacity-75 z-5 w-full max-w-[295px] h-[49px]'
      >
        Generate
      </button>

      <canvas ref={canvasRef} className='hidden' />

      {showPaymentAlert && <PaymentAlert handleBtn={handlePaymentConfirmed} setShowPaymentAlert={setShowPaymentAlert} />}
      <Generating z='z-20' loading={generating} duration={3000} />
      {error && <Trouble z='z-20' handleCancel={handleCancel} handleRetry={handleRetry} />}
    </div>
  );
};

export default PreviewMain;