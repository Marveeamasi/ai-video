'use client'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { avatarVoicesDb, elevenVoicesDb } from '@/dummyData'
import UtilsCard from './UtilsCard'
import { FaPlus } from "react-icons/fa";

const VoicesMain = () => {
    const router = useRouter();
    const [next, setNext] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [file, setFile] = useState(null);
    const [avatarVoices, setAvatarVoices] = useState([]);
    const [elevenVoices, setElevenVoices] = useState([]);
    const [voiceUtils, setVoiceUtils] = useState({});
    const [voiceEdit, setVoiceEdit] = useState({});
    const [audioName, setAudioName] = useState('');

    
    const handleCreateAvatar = () => {
      setAvatarVoices(avatarVoicesDb);
      setShowPrompt(false);
      setNext(false);
    }

    const handleCreateEleven = () => {
      setElevenVoices(elevenVoicesDb);
    }

    const toggleUtils = (voiceId) => {
        setVoiceUtils(prev => ({
            ...prev,
            [voiceId]: !prev[voiceId]
        }));
    };

    const toggleEdit = (voiceId) => {
        setVoiceEdit(prev => ({
            ...prev,
            [voiceId]: !prev[voiceId]
        }));
    };


    const FirstWidget = () => {
      return (
        <div onClick={(e)=> e.stopPropagation()} className='w-[504px] max-sm:w-full rounded-[16px] flex flex-col py-5 px-8 gap-10 bg-[#140926]'>
                    <div className='flex items-center self-center gap-3'>
                      <span onClick={()=> setNext(false)} className={`w-[24px] h-[24px] border border-[#261148] rounded-[12px] ${next? 'bg-[#140926]':'bg-[#261148]'} text-sm flex justify-center items-center`}>1</span>
                      <span onClick={()=> setNext(true)} className={`w-[24px] h-[24px] border border-[#261148] rounded-[12px] ${next? 'bg-[#261148]':'bg-[#140926]'} text-sm flex justify-center items-center`}>2</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                          <div className='flex items-center gap-1'>
                            <Image src={'/tips.png'} alt='tips' width={24} height={24} className=''/>
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
                            <button onClick={()=>setShowPrompt(false)} className='rounded-[4px] bg-transparent border border-[#261148] h-[44px] cursor-pointer'>Cancel</button>
                            <button onClick={()=> setNext(true)} className='rounded-[4px] bg-[#CF36E9] h-[44px] cursor-pointer text-[white]'>Next</button>
                          </div>
                    </div>
                  </div>
      )
    }
    
    const NextWidget = () => {

      return (
        <div onClick={(e)=> e.stopPropagation()} className='w-[504px] max-sm:w-full rounded-[16px] flex flex-col py-5 px-8 gap-10 bg-[#140926]'>
                    <div className='flex items-center self-center gap-3'>
                      <span onClick={()=> setNext(false)} className={`w-[24px] h-[24px] border border-[#261148] rounded-[12px] ${next? 'bg-[#140926]':'bg-[#261148]'} text-sm flex justify-center items-center`}>1</span>
                      <span onClick={()=> setNext(true)} className={`w-[24px] h-[24px] border border-[#261148] rounded-[12px] ${next? 'bg-[#261148]':'bg-[#140926]'} text-sm flex justify-center items-center`}>2</span>
                    </div>
                    <div className='flex flex-col gap-3'>
                          <div className='flex items-center gap-1'>
                            <Image src={'/cloud-upload.png'} alt='tips' width={24} height={24} className=''/>
                            <h1 className='text-[20px]'>Upload your audio</h1>
                          </div>
                          <input type="text" onChange={(e)=> setAudioName(e.target.value)} value={audioName} placeholder='Enter Audio name.' className='outline-none h-[50px] w-full p-3 bg-[#261148] placeholder:text-[#8C8C8C] text-[10px] font-[300] rounded-[8px]'/>
                          
                          <label htmlFor='file' className='h-[169px] cursor-pointer rounded-[8px] w-full p-2 flex bg-[#261148] flex-col gap-3 justify-center items-center text-[12px] font-[500]'>
                          <Image src={'/cloud-upload.png'} alt='tips' width={20} height={15} className=''/>
                          <p>{file? `Audio file selected: ${file?.name}`:'Upload Audio File'}</p>
                            </label>
                            <input onChange={(e) => setFile(e.target.files[0])} type="file" id="file" className='hidden'/>
                            <div className='flex gap-1'>
                             <div className='w-[25px] h-[25px]'> <input id='check' type="checkbox" className='w-[25px] h-[25px] border border-[#261148] accent-[#CF36E9]' /></div>
                              <label htmlFor='check' className='text-[#8C8C8C] text-[12px] font-[500]'>
                              I confirm I have the rights to upload and clone these voice samples and will not use platform-generated content unlawfully.
                               I agree to abide by VideoDual Terms of Service and Privacy Policy
                              </label>
                            </div>
                           {file? 
                           <button onClick={handleCreateAvatar} className='w-full h-[44px] bg-[#CF36E9] rounded-[4px] text-sm cursor-pointer'>Save Your Voice</button>
                           :
                           <div className='text-[#8C8C8C] font-[500] text-sm grid grid-cols-2 gap-3'>
                            <button onClick={()=>setNext(false)} className='rounded-[4px] bg-transparent border border-[#261148] h-[44px] cursor-pointer'>Cancel</button>
                            <div className='cursor-pointer hover:animate-pulse text-white rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center justify-center'><Image alt='add' src='/add-icon.png' width={20} height={20} className='w-[20px] h-[20]'/>Create Voices</div>
                          </div>}
                           </div>
                    </div>
                 
      )
    }

    const EditWidget = ({ onClose, voiceId }) => {
      const [audioName, setAudioName] = useState('')
      const [stability, setStability] = useState(67)
      const [cNs, setCNs] = useState(50) 
      const [styleExagg, setStyleExagg] = useState(0)
    
      const handleUpdateAvatar = () => {
        console.log('Updating audio with:', { audioName, stability, cNs, styleExagg, voiceId });
        onClose();
    }

    
      const Select = () => {
        return (
          <div className='w-full rounded-[8px] h-[50px] p-[10px] flex justify-between items-center bg-[#261148] cursor-pointer text-[12px]'>
            <div>Eleven Turbo</div>
            <Image src={'/arrow-down.png'} width={24} height={24} alt='arrow down' className='w-[24px] h-[24px]' />
          </div>
        )
      }
    
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
                className='outline-none h-[50px] w-full p-3 bg-[#261148] placeholder:text-[#8C8C8C] text-[10px] font-[300] rounded-[8px] border border-transparent focus:border-purple-500 transition-all'
              />
            </div>
    
            <div className='flex flex-col gap-1'>
              <h1 className='text-[20px] font-[500] text-white'>Model</h1>
              <Select />
            </div>
  
         
                <div className='flex flex-col gap-1'>
                  <label className='text-[20px] font-[500] text-white'>Stability</label>
                  <div className='flex items-center'>
                    <input
                      type='range'
                      min='0'
                      max='100'
                      value={stability}
                      onChange={(e) => setStability(parseInt(e.target.value))}
                      className='w-full h-[5px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#9413E6]'
                      style={{
                        background: `linear-gradient(to right, #261148 ${stability}%, #ffffff ${stability}%)`,
                      }}
                    />
                  </div>
                  <div className='flex items-center justify-between w-full text-xs font-[400]'>
                      <span>More Variable</span>
                      <span>{stability}%</span>
                      <span>More Stable</span>
                  </div>
                </div>
    
                <div className='flex flex-col gap-1'>
                  <label className='text-[20px] font-[500] text-white'>Clarity + similarity</label>
                  <div className='flex items-center'>
                    <input
                      type='range'
                      min='0'
                      max='100'
                      value={cNs}
                      onChange={(e) => setCNs(parseInt(e.target.value))}
                      className='w-full h-[5px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#9413E6]'
                      style={{
                        background: `linear-gradient(to right, #261148 ${cNs}%, #ffffff ${cNs}%)`,
                      }}
                    />
                  </div>
                  <div className='flex items-center justify-between w-full text-xs font-[400]'>
                      <span>Low</span>
                      <span>{cNs}%</span>
                      <span>High</span>
                  </div>
                </div>
    
                <div className='flex flex-col gap-1'>
                  <label className='text-[20px] font-[500] text-white'>Style Exaggeration</label>
                  <div className='flex items-center'>
                    <input
                      type='range'
                      min='0'
                      max='100'
                      value={styleExagg}
                      onChange={(e) => setStyleExagg(parseInt(e.target.value))}
                      className='w-full h-[5px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#9413E6]'
                      style={{
                        background: `linear-gradient(to right, #261148 ${styleExagg}%, #ffffff ${styleExagg}%)`,
                      }}
                    />
                  </div>
                  <div className='flex items-center justify-between w-full text-xs font-[400]'>
                      <span>None (Fastest)</span>
                      <span>{styleExagg}%</span>
                      <span>Exaggerated</span>
                  </div>
                </div>
    
            <button
              onClick={handleUpdateAvatar}
              className='w-full h-[44px] bg-[#CF36E9] rounded-[4px] text-sm font-medium text-white cursor-pointer hover:bg-purple-700 transition-colors'
            >
              Update Audio
            </button>
          </div>
        </div>
      )
    }
    
  return (
    <div className="flex flex-col gap-5 max-sm:gap-10">
     <div className='flex sm:justify-between max-sm:flex-col max-sm:gap-5 w-full items-center px-5 pt-5'>
                     <div className='text-[24px] max-sm:text-center font-[500]'>Voices</div>
                    <div className='flex items-center max-sm:flex-col gap-5'>
                   <SearchBar/>
                     <button onClick={()=>setShowPrompt(true)} className='cursor-pointer hover:animate-pulse w-[196px] rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center text-[20px] justify-center z-2'><FaPlus/>Create Voices</button>
                    </div>
             </div>
             <div className='flex gap-1 items-center max-sm:self-center px-5'>My Voices <div className='text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center'>0</div></div>
            {avatarVoices?.length>0 ? 
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5 p-5 pb-60">
              {avatarVoices.map((voice, i)=> 
              <div key={i} className='w-full rounded-[8px] h-[70px] p-3 bg-[#140926] flex items-center gap-2 justify-between z-1 relative'   >
                    <div className='flex items-center gap-2 text-sm font-[500]'>
                      <Image src={'/play-square.png'} alt='play square' width={30} height={30} className='w-[30px] h-[30px]'/>
                      <span>{voice.name}</span> <span>{voice.total} Aud</span>
                    </div>
                    <div className='cursor-pointer'>
                    <Image onClick={() => toggleUtils(i)} src={'/vertical-circles.png'} alt='vertical circles' width={24} height={24} className='w-[24px] h-[24px]'/>
                    </div>
                    {voiceUtils[i] && <UtilsCard bg={'bg-[#261148]'} pos={'bottom-[-160px] right-0'} setShowEdit={() => toggleEdit(i)}/>}
              </div>
              )}
            </div>
            :
            <div className="flex gap-5 px-5 flex-col items-center justify-center p-20">
                <div className="max-w-[309px] text-center text-[#D9D9D9]">Create my own voice to make my avatar sound just like me</div>
              <div onClick={()=> setShowPrompt(true)} className='cursor-pointer z-2 hover:animate-pulse w-[196px] rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center text-[20px] justify-center'><FaPlus/>Create Voices</div>
            </div>}
            <div className='flex gap-1 items-center max-sm:self-center px-5'>Eleven Labs <div className='text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center'>43</div></div>
            {elevenVoices?.length>0 ? 
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5 p-5 pb-60">
              {elevenVoices.map((voice, i)=> 
              <div key={i} className='w-full rounded-[8px] h-[70px] p-3 bg-[#140926] flex items-center gap-2 justify-between z-1 relative'   >
                    <div className='flex items-center gap-2 text-sm font-[500]'>
                      <Image src={'/play-square.png'} alt='play square' width={30} height={30} className='w-[30px] h-[30px]'/>
                      <span>{voice.name}</span>
                    </div>
                    <div className='cursor-pointer'>
                    <Image onClick={() => toggleUtils(`eleven-${i}`)} src={'/vertical-circles.png'} alt='vertical circles' width={24} height={24} className='w-[24px] h-[24px]'/>
                    </div>
                    {voiceUtils[`eleven-${i}`] && <UtilsCard bg={'bg-[#261148]'} pos={'top-[-160px] right-0'} setShowEdit={() => toggleEdit(`eleven-${i}`)}/>}
              </div>
              )}
            </div>
            :
            <div className="flex gap-5 px-5 flex-col items-center justify-center p-20">
                <div className="max-w-[309px] text-center text-[#D9D9D9]">Connect to your Eleven Labs account to access all your voices</div>
              <div onClick={handleCreateEleven} className='z-2 cursor-pointer hover:animate-pulse w-[259px] rounded-[4px] bg-[#9413E64D] font-[500] h-[44px] flex items-center text-[20px] justify-center'>Connect to eleven labs</div>
            </div>
             }
          {showPrompt && <div onClick={()=> setShowPrompt(false)} className='w-screen h-screen transistion-all duration-300 ease-in-out fixed top-0 left-0 z-[11111] p-5 bg-[#00000033] backdrop-blur-[2px] flex justify-center items-center'>
                 {next? <NextWidget/> : <FirstWidget/>}

          </div>}
           {Object.keys(voiceEdit).some(key => voiceEdit[key]) && (
                <div onClick={() => setVoiceEdit({})} className='w-screen h-screen transistion-all duration-300 ease-in-out fixed top-0 left-0 z-[11111] p-5 bg-[#00000033] backdrop-blur-[2px] flex justify-center items-center'>
                    <EditWidget onClose={() => setVoiceEdit({})} voiceId={Object.keys(voiceEdit).find(key => voiceEdit[key])} />
                </div>
            )}
             </div>
  )
}

export default VoicesMain
