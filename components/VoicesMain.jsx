'use client'
import React, { useState, useCallback, memo, useMemo, useEffect } from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { avatarVoicesDb, elevenVoicesDb } from '@/dummyData';
import UtilsCard from './UtilsCard';
import { FaPlus } from 'react-icons/fa';
import Generating from './Generating';
import Trouble from './Trouble';
import AlertBox from './AlertBox';
import { PiSealCheck } from "react-icons/pi";
import Prompt from './Prompt';

const FirstWidget = memo(({ setNext, setShowPrompt }) => (
  <div onClick={(e) => e.stopPropagation()} className='w-[504px] max-sm:w-full rounded-[16px] flex flex-col py-5 px-8 gap-10 bg-[#140926]'>
    <div className='flex items-center self-center gap-3'>
      <span onClick={() => setNext(false)} className='w-[24px] h-[24px] border border-[#261148] rounded-[12px] bg-[#261148] text-sm flex justify-center items-center'>1</span>
      <span onClick={() => setNext(true)} className='w-[24px] h-[24px] border border-[#261148] rounded-[12px] bg-[#140926] text-sm flex justify-center items-center'>2</span>
    </div>
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-1'>
        <Image src='/tips.png' alt='tips' width={24} height={24} />
        <h1 className='text-[20px]'>Audio recording tips</h1>
      </div>
      <p className='text-[#8C8C8C] text-sm'>To ensure the best quality of your voice avatar, please follow these guidelines when recording your audio:</p>
    </div>
    <div className='flex flex-col gap-3'>
      <div className='bg-[#261148] rounded-[8px] flex'>
        <ul className='text-sm font-[400] py-5 pl-10 list-disc'>
          <li>Record in a quiet, echo-free room.</li>
          <li>Use a high-quality microphone positioned correctly.</li>
          <li>Speak clearly and at a consistent pace.</li>
          <li>Aim for a recording length of at least 2 minutes.</li>
          <li>Avoid background noise and music.</li>
        </ul>
      </div>
      <div className='text-[#8C8C8C] font-[500] text-sm grid grid-cols-2 gap-3'>
        <button onClick={() => setShowPrompt(false)} className='rounded-[4px] bg-transparent border border-[#261148] h-[44px] cursor-pointer'>Cancel</button>
        <button onClick={() => setNext(true)} className='rounded-[4px] bg-[#CF36E9] h-[44px] cursor-pointer text-white'>Next</button>
      </div>
    </div>
  </div>
));

const NextWidget = memo(({ audioName, setAudioName, file, setFile, agreed, setAgreed, handleCreateAvatar, setNext }) => (
  <div onClick={(e) => e.stopPropagation()} className='w-[504px] max-sm:w-full rounded-[16px] flex flex-col py-5 px-8 gap-10 bg-[#140926]'>
    <div className='flex items-center self-center gap-3'>
      <span onClick={() => setNext(false)} className='w-[24px] h-[24px] border border-[#261148] rounded-[12px] bg-[#140926] text-sm flex justify-center items-center'>1</span>
      <span className='w-[24px] h-[24px] border border-[#261148] rounded-[12px] bg-[#261148] text-sm flex justify-center items-center'>2</span>
    </div>
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-1'>
        <Image src='/cloud-upload.png' alt='upload' width={24} height={24} />
        <h1 className='text-[20px]'>Upload your audio</h1>
      </div>
      <input
        type='text'
        value={audioName}
        onChange={(e) => setAudioName(e.target.value)}
        placeholder='Enter Audio name.'
        className='outline-none h-[50px] w-full p-3 bg-[#261148] placeholder:text-[#8C8C8C] text-[10px] font-[300] rounded-[8px]'
      />
      <label htmlFor='file' className='h-[169px] cursor-pointer rounded-[8px] w-full p-2 flex bg-[#261148] flex-col gap-3 justify-center items-center text-[12px] font-[500]'>
        <Image src='/cloud-upload.png' alt='upload' width={20} height={15} />
        <p>{file ? `Audio file selected: ${file.name}` : 'Upload Audio File'}</p>
      </label>
      <input onChange={(e) => setFile(e.target.files[0])} type='file' id='file' className='hidden' accept='audio/*' />
      <div className='flex gap-1'>
        <div className='w-[25px] h-[25px]'>
          <input
            id='check'
            type='checkbox'
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className='w-[25px] h-[25px] border border-[#261148] accent-[#CF36E9]'
          />
        </div>
        <label htmlFor='check' className='text-[#8C8C8C] text-[12px] font-[500]'>
          I confirm I have the rights to upload and clone these voice samples and will not use platform-generated content unlawfully.
          I agree to abide by VideoDual Terms of Service and Privacy Policy
        </label>
      </div>
      {file ? (
        <button
          disabled={!agreed}
          onClick={handleCreateAvatar}
          className={`w-full h-[44px] bg-[#CF36E9] rounded-[4px] text-sm cursor-pointer ${!agreed || !audioName ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Save Your Voice
        </button>
      ) : (
        <div className='text-[#8C8C8C] font-[500] text-sm grid grid-cols-2 gap-3'>
          <button onClick={() => setNext(false)} className='rounded-[4px] bg-transparent border border-[#261148] h-[44px] cursor-pointer'>Cancel</button>
          <div
            className={`cursor-pointer hover:animate-pulse text-white rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center justify-center ${!agreed || !audioName || !file ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Image alt='add' src='/add-icon.png' width={20} height={20} />
            Create Voices
          </div>
        </div>
      )}
    </div>
  </div>
));

const EditWidget = memo(({ onClose, voiceId, updateVoice }) => {
  const [audioName, setAudioName] = useState('');
  const [stability, setStability] = useState(67);
  const [clarity, setClarity] = useState(50);
  const [styleExaggeration, setStyleExaggeration] = useState(0);

  const handleUpdate = useCallback(() => {
    updateVoice({ audioName, stability, clarity, styleExaggeration, voiceId });
    onClose();
  }, [audioName, stability, clarity, styleExaggeration, voiceId, updateVoice, onClose]);

  const Select = () => (
    <div className='w-full rounded-[8px] h-[50px] p-[10px] flex justify-between items-center bg-[#261148] cursor-pointer text-[12px]'>
      <div>Eleven Turbo</div>
      <Image src='/arrow-down.png' width={24} height={24} alt='arrow down' />
    </div>
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='w-[504px] max-sm:w-full rounded-[16px] flex flex-col py-5 px-8 gap-10 bg-[#140926] shadow-lg'
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-[20px] font-[500] text-white'>Audio Name</h1>
          <input
            type='text'
            placeholder='Enter Audio name.'
            value={audioName}
            onChange={(e) => setAudioName(e.target.value)}
            className='outline-none h-[50px] w-full p-3 bg-[#261148] placeholder:text-[#8C8C8C] text-[14px] font-[300] rounded-[8px] border border-transparent focus:border-purple-500 transition-all'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='text-[20px] font-[500] text-white'>Model</h1>
          <Select />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-[20px] font-[500] text-white'>Stability</label>
          <input
            type='range'
            min='0'
            max='100'
            value={stability}
            onChange={(e) => setStability(parseInt(e.target.value))}
            className='w-full h-[5px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#9413E6]'
            style={{ background: `linear-gradient(to right, #261148 ${stability}%, #ffffff ${stability}%)` }}
          />
          <div className='flex items-center justify-between w-full text-xs font-[400]'>
            <span>More Variable</span>
            <span>{stability}%</span>
            <span>More Stable</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-[20px] font-[500] text-white'>Clarity + Similarity</label>
          <input
            type='range'
            min='0'
            max='100'
            value={clarity}
            onChange={(e) => setClarity(parseInt(e.target.value))}
            className='w-full h-[5px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#9413E6]'
            style={{ background: `linear-gradient(to right, #261148 ${clarity}%, #ffffff ${clarity}%)` }}
          />
          <div className='flex items-center justify-between w-full text-xs font-[400]'>
            <span>Low</span>
            <span>{clarity}%</span>
            <span>High</span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-[20px] font-[500] text-white'>Style Exaggeration</label>
          <input
            type='range'
            min='0'
            max='100'
            value={styleExaggeration}
            onChange={(e) => setStyleExaggeration(parseInt(e.target.value))}
            className='w-full h-[5px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#9413E6]'
            style={{ background: `linear-gradient(to right, #261148 ${styleExaggeration}%, #ffffff ${styleExaggeration}%)` }}
          />
          <div className='flex items-center justify-between w-full text-xs font-[400]'>
            <span>None (Fastest)</span>
            <span>{styleExaggeration}%</span>
            <span>Exaggerated</span>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className='w-full h-[44px] bg-[#CF36E9] rounded-[4px] text-sm font-medium text-white cursor-pointer hover:bg-purple-700 transition-colors'
        >
          Update Audio
        </button>
      </div>
    </div>
  );
});

const VoiceCard = memo(({ voice, index, toggleUtils, voiceUtils, toggleEdit, setIsDelete, prefix = '' }) => (
  <div className='w-full rounded-[8px] h-[70px] p-3 bg-[#140926] flex items-center gap-2 justify-between z-1 relative'>
    <div className='flex items-center gap-2 text-sm font-[500]'>
      <Image src='/play-square.png' alt='play square' width={30} height={30} />
      <span>{voice.name}</span>
      {voice.total && <span>{voice.total} Aud</span>}
    </div>
    <div className='cursor-pointer'>
      <Image
        onClick={(e) => {
          e.stopPropagation();
          toggleUtils(`${prefix}${index}`, voice);
        }}
        src='/vertical-circles.png'
        alt='vertical circles'
        width={24}
        height={24}
      />
    </div>
    {voiceUtils[`${prefix}${index}`] && (
      <UtilsCard
        bg='bg-[#261148]'
        pos={prefix ? 'top-[-160px] right-0' : 'bottom-[-160px] right-0'}
        setShowEdit={() => toggleEdit(`${prefix}${index}`)}
        setShowDelete={() => setIsDelete(true)}
      />
    )}
  </div>
));

const VoicesMain = () => {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [next, setNext] = useState(false);
  const [file, setFile] = useState(null);
  const [audioName, setAudioName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [avatarVoices, setAvatarVoices] = useState([]);
  const [elevenVoices, setElevenVoices] = useState([]);
  const [voiceUtils, setVoiceUtils] = useState({});
  const [voiceEdit, setVoiceEdit] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUndo = () => {
    setAvatarVoices(avatarVoicesDb);
    setIsSuccess(false);
  }

  const handleRetry = () => {
     setIsError(false);
     setIsLoading(true);
  }

  const handleCancel = () => {
    setIsError(false);
    setIsLoading(false);
  }

  const filteredAvatarVoices = useMemo(() =>
    avatarVoices.filter(voice =>
      voice.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, avatarVoices]);
  
  const filteredElevenVoices = useMemo(() =>
    elevenVoices.filter(voice =>
      voice.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, elevenVoices]);

  const handleCreateAvatar = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Loading complete! Moving to next step...');
      setIsSuccess(true);
      setAvatarVoices(avatarVoicesDb);
      setIsLoading(false);
    setShowPrompt(false); 
    setNext(false);
    setFile(null);
    setAudioName('');
    setAgreed(false);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
    }, 3000);
  }, []);

  const handleCreateEleven = useCallback(() => {
    setElevenVoices(elevenVoicesDb);
  }, []);

  const toggleUtils = useCallback((voiceId, voice) => {
    setVoiceUtils((prev) => ({
      ...prev,
      [voiceId]: !prev[voiceId],
    }));
    setSelectedVoice(voice);
  }, []);

  const toggleEdit = useCallback((voiceId) => {
    setVoiceUtils({});
    setVoiceEdit((prev) => ({
      ...prev,
      [voiceId]: !prev[voiceId],
    }));
  }, []);

  const updateVoice = useCallback((updateData) => {
    console.log('Updating voice:', updateData);
  }, []);

  const handleDelete = useCallback(() => {
    console.log(`Deleting voice: ${selectedVoice?.name}`);
    setIsDelete(false);
  }, [selectedVoice]);

  return (
    <div onClick={() => setVoiceUtils({})} className='flex flex-col gap-5 max-sm:gap-10'>
      <div className='flex sm:justify-between max-sm:flex-col max-sm:gap-5 w-full items-center px-5 pt-5'>
        <div className='text-[24px] max-sm:text-center font-[500]'>Voices</div>
        <div className='flex items-center max-sm:flex-col gap-5'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <button
            onClick={() => setShowPrompt(true)}
            className='cursor-pointer hover:animate-pulse w-[196px] rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center text-[20px] justify-center z-2'
          >
            <FaPlus />
            Create Voices
          </button>
        </div>
      </div>
      <div className='flex gap-1 items-center max-sm:self-center px-5'>
        My Voices
        <div className='text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center'>
          {filteredAvatarVoices.length}
        </div>
      </div>
      {filteredAvatarVoices.length > 0 ? (
        <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5 p-5 pb-60'>
          {filteredAvatarVoices.map((voice, i) => (
            <VoiceCard
              key={i}
              voice={voice}
              index={i}
              toggleUtils={toggleUtils}
              voiceUtils={voiceUtils}
              toggleEdit={toggleEdit}
              setIsDelete={setIsDelete}
            />
          ))}
        </div>
      ) : (
        <div className='flex gap-5 px-5 flex-col items-center justify-center p-20'>
          <div className='max-w-[309px] text-center text-[#D9D9D9]'>Create my own voice to make my avatar sound just like me</div>
          <div
            onClick={() => setShowPrompt(true)}
            className='cursor-pointer z-2 hover:animate-pulse w-[196px] rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center text-[20px] justify-center'
          >
            <FaPlus />
            Create Voices
          </div>
        </div>
      )}
      <div className='flex gap-1 items-center max-sm:self-center px-5'>
        Eleven Labs
        <div className='text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center'>
          {filteredElevenVoices.length}
        </div>
      </div>
      {filteredElevenVoices.length > 0 ? (
        <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5 p-5 pb-60'>
          {filteredElevenVoices.map((voice, i) => (
            <VoiceCard
              key={i}
              voice={voice}
              index={i}
              toggleUtils={toggleUtils}
              voiceUtils={voiceUtils}
              toggleEdit={toggleEdit}
              setIsDelete={setIsDelete}
              prefix='eleven-'
            />
          ))}
        </div>
      ) : (
        <div className='flex gap-5 px-5 flex-col items-center justify-center p-20'>
          <div className='max-w-[309px] text-center text-[#D9D9D9]'>Connect to your Eleven Labs account to access all your voices</div>
          <div
            onClick={handleCreateEleven}
            className='z-2 cursor-pointer hover:animate-pulse w-[259px] rounded-[4px] bg-[#9413E64D] font-[500] h-[44px] flex items-center text-[20px] justify-center'
          >
            Connect to Eleven Labs
          </div>
        </div>
      )}
      {showPrompt && (
        <div
          onClick={() => setShowPrompt(false)}
          className='w-screen h-screen transition-all duration-300 ease-in-out fixed top-0 left-0 z-[11] p-5 bg-[#00000033] backdrop-blur-[2px] flex justify-center items-center'
        >
          {next ? (
            <NextWidget
              audioName={audioName}
              setAudioName={setAudioName}
              file={file}
              setFile={setFile}
              agreed={agreed}
              setAgreed={setAgreed}
              handleCreateAvatar={handleCreateAvatar}
              setNext={setNext}
            />
          ) : (
            <FirstWidget setNext={setNext} setShowPrompt={setShowPrompt} />
          )}
        </div>
      )}
      {Object.keys(voiceEdit).some((key) => voiceEdit[key]) && (
        <div
          onClick={() => setVoiceEdit({})}
          className='w-screen h-screen transition-all duration-300 ease-in-out fixed top-0 left-0 z-[11111] p-5 bg-[#00000033] backdrop-blur-[2px] flex justify-center items-center'
        >
          <EditWidget
            onClose={() => setVoiceEdit({})}
            voiceId={Object.keys(voiceEdit).find((key) => voiceEdit[key])}
            updateVoice={updateVoice}
          />
        </div>
      )}
      {isDelete && (
        <Prompt
          message={`Are you sure to delete this voice "${selectedVoice?.name}"?`}
          handleUndo={() => setIsDelete(false)}
          handleAction={handleAction}
        />
      )}
        <Generating z={'z-[11] lg:left-[10%]'} loading={isLoading} duration={3000}/>
          {isError && <Trouble z={'z-[11] lg:left-[10%]'} handleCancel={handleCancel} handleRetry={handleRetry}/>}
          {isSuccess && <AlertBox Icon={PiSealCheck} handleUndo={handleUndo} heading={'Congratulations!'} message={'You have successfully created a voice'}/>}
    </div>
  );
};

export default VoicesMain;