import Image from 'next/image';
import React, { useState } from 'react';

const AudioScriptFirst = ({ handleShowRecordState, onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (onFileUpload) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-3">
        <Image
          src="/ai-audio.png"
          alt="text icon"
          width={24}
          height={24}
          className="w-[24px] h-[24px] text-[12.51px] font-[700]"
        />
        Audio Script
      </div>
      <p className="font-[300] text-[10px] text-[#8C8C8C] w-full">
        "Use the power of your voice to authentically express yourself and share your unique story with the world."
      </p>
      <div
        onClick={handleShowRecordState}
        className="bg-[#261148] flex flex-col justify-center items-center gap-[10px] p-[5px] rounded-[8px] w-full h-[87px] cursor-pointer hover:animate-pulse"
      >
        <Image
          src="/mic.png"
          alt="text icon"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
        <div className="font-[600]">Record Audio</div>
      </div>
      <label
        htmlFor="upload"
        className="bg-[#261148] flex flex-col justify-center items-center gap-[10px] p-[5px] rounded-[8px] w-full h-[87px] cursor-pointer hover:animate-pulse"
      >
        <Image
          src="/upload.png"
          alt="text icon"
          width={24}
          height={24}
          className="w-[24px] h-[24px]"
        />
        <div className="font-[600]">{file? file.name : 'Upload File'}</div>
        <input
        accept='audio/*'
          type="file"
          id="upload"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default AudioScriptFirst;
