'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const RecordPausedState = ({ handleContinue, formatTime, handleRerecord, time, audioFromRecord, mediaStreamRef }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current && audioFromRecord) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error("Playback error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Cleanup audio URL and media stream when component unmounts or audioFromRecord changes
  useEffect(() => {
    return () => {
      if (audioFromRecord) {
        URL.revokeObjectURL(audioFromRecord);
      }
      if (mediaStreamRef?.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [audioFromRecord, mediaStreamRef]);

  // Handle backdrop click to close modal
  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (mediaStreamRef?.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    // Optionally, you could call handleContinue() here to proceed, but for now, we'll just close
    // If you want to keep the paused state, you might need to adjust AiPage.jsx state
  };

  return (
    <div
      onClick={handleClose}
      className='backdrop-blur-[4px] transition-all duration-300 ease-in-out fixed top-0 left-[10%] max-xl:left-0 z-20 w-screen h-screen flex justify-center items-center'
    >
      <div
        id='card'
        onClick={(e) => e.stopPropagation()}
        className='w-[400px] max-sm:w-full flex flex-col justify-center items-center rounded-[16px] p-5 gap-3 bg-[#140926]'
      >
        <div className='flex w-full flex-col justify-center items-center'>
          <div className='flex gap-[10px] justify-center items-center font-[600]'>
            <Image src='/mic.png' alt="record icon" width={20} height={20} className='w-[20px] h-auto' />
            Record Audio
          </div>
          <div className='text-[12px] font-extralight text-center'>Record your script (max 20 minutes)</div>
        </div>

        <div className='w-[319px] h-[59.422px] rounded-[32px] bg-[#261148] flex justify-center items-center mt-20 gap-2'>
          {/* Hidden Audio Element */}
          <audio ref={audioRef} src={audioFromRecord} style={{ display: 'none' }} />

          {/* Play/Pause Image */}
          <Image
            onClick={handlePlayPause}
            src={isPlaying ? "/pause.png" : "/playrecord.png"}
            alt="control audio"
            width={40}
            height={40}
            className='w-[40px] h-[40px] border border-[#00000031] rounded-full cursor-pointer'
            aria-label={isPlaying ? "Pause audio playback" : "Play recorded audio"}
            role="button"
          />

          {/* Amplitude Image */}
          <Image
            src="/amp.png"
            alt="amplitude"
            width={255.41}
            height={38.572}
            className='w-[255.41px] h-[38.572px]'
          />
        </div>

        {/* Timer Display */}
        <div className='flex items-center justify-center gap-1'>
          <Image src="/reddot.png" alt='dot' width={15} height={15} className='w-[15px] h-auto' />
          <div id='count'>{formatTime(time)}</div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-2 self-center mt-5'>
          <button
            onClick={handleRerecord}
            className='rounded-[3.13px] cursor-pointer border-[1px] border-[#9413E6] text-[#9413E6] text-[9.39px] font-[700] w-[122px] h-[31px]'
            aria-label="Re-record audio"
          >
            Rerecord
          </button>
          <button
            onClick={handleContinue}
            className={`rounded-[3.13px] cursor-pointer text-[9.39px] font-[700] w-[122px] h-[31px] ${
              audioFromRecord
                ? 'bg-[#9413E6] hover:bg-[#7A10C7]'
                : 'bg-[#9413E666] cursor-not-allowed'
            }`}
            aria-label="Continue to next step"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordPausedState;