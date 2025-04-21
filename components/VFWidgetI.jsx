'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ToggleSwitch from './ToggleSwitch';
import Select from './Select';
import ImageCards from './ImageCards';
import SelectWithSearch from './SelectWithSearch';
import SelectWithSearchMore from './SelectWithSearchMore';
import { useRouter } from 'next/navigation';
import Generating from './Generating';
import Trouble from './Trouble';

const VFWidgetI = () => {
    const [blurbg, setBlurbg] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [style, setStyle] = useState('Auto');
    const [isLandScape, setIsLandScape] = useState(false);
    const router = useRouter();
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState(false);
    const [avatar, setAvatar] = useState({});
    const [allowAutoBRoll, setAllowAutoBRoll] = useState(false);
    const [source, setSource] = useState('Image generation');
    const [Intensity, setIntensity] = useState('Medium');
    const [allowSubtitle, setAllowSubtitle] = useState(false);
    const [choosenVoiceForSpeech, setChoosenVoiceForSpeech] = useState('Dynamic');
    const [allowMusic, setAllowMusic] = useState(false);
    const [choosenMusic, setChoosenMusic] = useState('None');
    const [allowVoice, setAllowVoice] = useState(false);
    const [choosenVoiceForScript, setChoosenVoiceForScript] = useState('None');
    const [language, setLanguage] = useState('Language');
    const [gender, setGender] = useState('Gender');

    useEffect(() => { 
        const storedAvatars = localStorage.getItem('AVATARS');
        const storedVoiceTransform = localStorage.getItem('VOICE_TRANSFORM') || 'false';
        if (storedAvatars) {
          try {
            const parsedAvatars = JSON.parse(storedAvatars);
            setAvatar(parsedAvatars[0])
            console.log(parsedAvatars)
          } catch (error) {
            console.error('Error parsing avatars from localStorage:', error);
          }
        }
        if(storedVoiceTransform === 'true'){
          try {
           setAllowVoice(true);
           console.log((storedVoiceTransform))
          } catch (error) {
            console.error('Error with setting true from localStorage:', error);
          }
        }else if(storedVoiceTransform === 'false'){
          try {
            setAllowVoice(false);
            console.log(storedVoiceTransform)
           } catch (error) {
             console.error('Error with setting false from localStorage:', error);
           }
        }
      }, []);
    
      const handleRetry = () => {
         setError(false);
         setGenerating(true);
      }
    
      const handleCancel = () => {
        setError(false);
        setGenerating(false);
      }

    const handleShowCard = () => {
        setShowCard(true);
        setBlurbg(true)
    }

    const handleContinue = () => {
       setGenerating(true);
       setTimeout(() => {
        console.log('Loading complete! Moving to next step...');
        router.push('/preview');
       }, 3000);
    }

  return (
    <>
     <div className='flex gap-3 justify-center max-sm:flex-col max-sm:items-center'>
                    <div className='flex flex-col'>
                <div className={`max-sm:w-full max-sm:flex max-sm:justify-center transition-all duration-300 ease-in-out rounded-[8px] bg-[black]  ${isLandScape? 'w-[610px] h-[354px] max-sm:w-full max-sm:h-[180px]':'w-[400px] max-sm:w-[180px] max-sm:h-[354px] h-[741px]'}`}>{avatar?.video && <video src={avatar.video} controls alt="video of a person" className={`transition-all duration-300 ease-in-out object-contain ${isLandScape? 'w-[610px] h-[354px] max-sm:w-full max-sm:h-[180px]':'w-[400px] max-sm:w-[180px] max-sm:h-[354px] h-[741px]'} object-center`}/>}</div>
              {isLandScape &&  <div onClick={handleContinue} className={`w-[199.43px] h-[31px] font-[700] text-[9.39px] bg-[#9413E6] self-center mt-10 rounded-[3.13px] flex justify-center items-center cursor-pointer`}>Continue</div>}
               </div>
                <div className={``}>
               <div className={`w-[302px] flex flex-col relative gap-1`}>
                {blurbg && <div className='absolute w-full h-full bg-[#0000001A] backdrop-blur-[3px] z-3 rounded-[4px]'></div>}
                {showCard && <ImageCards blurbg={blurbg} setBlurbg={setBlurbg} setShowCard={setShowCard} setStyle={setStyle}/>}
                 <div className='bg-[#140926a6] w-full rounded-[4px] h-[44px] flex justify-between items-center p-[10px]'>
                    <div className='flex gap-3 items-center'>
                        <Image src={'/videoreplay.png'} alt='picture of replay' width={24} height={24} className='w-[24px] h-auto'/>
                        <div className='text-[12.51px] font-[700]'>Video Format</div>
                    </div>
                    <div className='flex gap-1 items-center'>
                       {isLandScape ? 
                       <Image onClick={()=> setIsLandScape(true)} src={'/landscape.png'} alt='picture of replay' width={24} height={24} className='w-[24px] h-[24px] cursor-pointer hover:animate-spin'/>
                       :
                       <Image onClick={()=> setIsLandScape(true)} src={'/landscapegray.png'} alt='picture of replay' width={24} height={24} className='w-[24px] h-[24px] cursor-pointer hover:animate-spin'/>}
                       {isLandScape ? 
                       <Image onClick={()=> setIsLandScape(false)} src={'/portait.png'} alt='picture of replay' width={18} height={24} className='w-[18px] h-[24px] cursor-pointer hover:animate-spin'/>
                       :
                       <Image onClick={()=> setIsLandScape(false)} src={'/portraitred.png'} alt='picture of replay' width={24} height={24} className='w-[24px] h-[24px] cursor-pointer hover:animate-spin'/>}
                    </div>
                 </div>
                 <div className='bg-[#140926a6] w-full rounded-[8px] h-[360px] flex justify-between items-center p-[20px]'>
                    <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-1'>
                            <Image src={'/computer-video.png'} alt='picture of computer' width={20} height={20} className='w-[20px] h-auto'/>
                            <div className='text-[12.51px] font-[700]'>Media</div>
                        </div>
                        <div className='font-[400] text-[10px] text-[#8C8C8C]'>Add images and videos that enhance your script</div>
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <div className='text-[12.51px] font-[700]'>Auto B-roll</div>
                        <ToggleSwitch isOn={allowAutoBRoll} setIsOn={setAllowAutoBRoll}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-[12.51px] font-[700]'>Source</div>
                        <Select message={'Auto B-roll is disabled'} enabled={allowAutoBRoll} selectedOption={source} setSelectedOptions={setSource} setBlurbg={setBlurbg} blurbg={blurbg} options={["Image generation", "Google image"]} option={source}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-[12.51px] font-[700]'>Style</div>
                       <div
                             onClick={handleShowCard}
                             className="relative flex justify-between items-center text-left w-full bg-[#261148] rounded-[4px] shadow-sm cursor-pointer h-[44px]"
                           >
                             <div className="text-[12.51px] font-[700] text-white py-2 px-4">
                               {style}
                             </div>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                               <Image
                                 src="/arrow-down.png"
                                 alt="Dropdown"
                                 width={24}
                                 height={24}
                                 className="h-[24px] w-[24px]"
                               />
                             </div>
                            
                           </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <div className='text-[12.51px] font-[700]'>Intensity</div>
                        <div className='flex gap-3 items-center justify-center text-[12.51px] font-[700] w-full'>
                            <button onClick={() => setIntensity('Low')} className={`cursor-pointer w-[80px] h-[35px] rounded-[4px] bg-[#261148] ${Intensity === 'Low' && 'border-1 border-[#CF36E9]'}`}>Low</button>
                            <button onClick={() => setIntensity('Medium')} className={`cursor-pointer w-[80px] h-[35px] rounded-[4px] bg-[#261148] ${Intensity === 'Medium' && 'border-1 border-[#CF36E9]'}`}>Medium</button>
                            <button onClick={() => setIntensity('High')} className={`cursor-pointer w-[80px] h-[35px] rounded-[4px] bg-[#261148] ${Intensity === 'High' && 'border-1 border-[#CF36E9]'}`}>High</button>
                        </div>
                    </div>
                    </div>
                 </div>
                 <div className='bg-[#140926a6] w-full rounded-[4px] h-[99px] flex flex-col gap-1 items-center p-[10px]'>
                    <div className='flex justify-between items-center w-full px-2'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-1'>
                            <Image src={'/subtitle.png'} alt='picture of subtitle' width={20} height={20} className='w-[20px] h-auto'/>
                            <div className='text-[12.51px] font-[700]'>Subtitles</div>
                        </div>
                        <div className='font-[400] text-[10px] text-[#8C8C8C]'>Choose a voice to embody your speech</div>
                    </div>
                    <ToggleSwitch isOn={allowSubtitle} setIsOn={setAllowSubtitle}/>
                    </div>
                    <div className='flex gap-2 items-center text-[10px] font-[400]'>
                            <button onClick={() => setChoosenVoiceForSpeech('Dynamic')} className={`cursor-pointer w-[90px] text-[#FCE340] h-[32px] rounded-[4px] bg-[#261148] pacifico ${choosenVoiceForSpeech === 'Dynamic' && 'border-1 border-[#CF36E9]'}`}>DYNAMIC</button>
                            <button onClick={() => setChoosenVoiceForSpeech('Professional')} className={`cursor-pointer w-[90px] h-[32px] rounded-[4px] font-[700] bg-[#261148] ${choosenVoiceForSpeech === 'Professional' && 'border-1 border-[#CF36E9]'}`}>PROFESSIONAL</button>
                            <button onClick={() => setChoosenVoiceForSpeech('Documentary')} className={`cursor-pointer w-[80px] h-[32px] rounded-[4px] bg-[#261148] text-[8px] italic font-[800] ${choosenVoiceForSpeech === 'Documentary' && 'border-1 border-[#CF36E9]'}`}>DOCUMENTARY</button>
                        </div>
                    </div>
                    <div className='bg-[#140926a6] w-full rounded-[4px] h-[111px] flex flex-col gap-1 items-center p-[10px]'>
                    <div className='flex self-center justify-between items-center w-full px-2'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-1'>
                            <Image src={'/subtitle.png'} alt='picture of music' width={20} height={20} className='w-[20px] h-auto'/>
                            <div className='text-[12.51px] font-[700]'>Music</div>
                        </div>
                        <div className='font-[400] text-[10px] text-[#8C8C8C]'>Add a background music to your video</div>
                    </div>
                    <ToggleSwitch isOn={allowMusic} setIsOn={setAllowMusic}/>
                    </div>
                    <SelectWithSearch message={'Music is disabled'} enabled={allowMusic} selectedOption={choosenMusic} setSelectedOptions={setChoosenMusic}  setBlurbg={setBlurbg} blurbg={blurbg} options={["None", "Dramatic Tension", "Future Bass", "R&B Smooth", "Trap HipHop", "Epic Orchestral", "Cyberpunk Electro", "Acoustic Folks", "Funky Groove"]}/>
                    </div>
                    <div className='bg-[#140926a6] w-full rounded-[4px] h-[111px] flex flex-col gap-1 items-center p-[10px]'>
                    <div className='flex self-center justify-between items-center w-full px-2'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-1'>
                            <Image src={'/musicnote.png'} alt='picture of music' width={20} height={20} className='w-[20px] h-auto'/>
                            <div className='text-[12.51px] font-[700]'>Voice</div>
                        </div>
                        <div className='font-[400] text-[10px] text-[#8C8C8C]'>Choose a voice to embody your script</div>
                    </div>
                    <ToggleSwitch isOn={allowVoice} setIsOn={setAllowVoice}/>
                    </div>
                    <div className='w-full'>
                    <SelectWithSearchMore message={'Voice is disabled'} enabled={allowVoice} selectedOption={choosenVoiceForScript} setSelectedOptions={setChoosenVoiceForScript} language={language} setLanguage={setLanguage} gender={gender} setGender={setGender} setBlurbg={setBlurbg} blurbg={blurbg} options={["None", "Cabby Doctor", "Emma Earrings", "Louis", "Lao"]}/>
                    </div>
                    </div>
               </div>
               </div>
            </div>
            {!isLandScape && <div onClick={handleContinue} className={`w-[199.43px] h-[31px] font-[700] text-[9.39px] bg-[#9413E6] self-center mt-10 rounded-[3.13px] flex justify-center items-center cursor-pointer `}>Continue</div>}
   
            <Generating z={'z-[1111] lg:left-[10%]'} loading={generating} duration={3000}/>
            {error && <Trouble z={'z-[1111] lg:left-[10%]'} handleCancel={handleCancel} handleRetry={handleRetry}/>}
             </>
  )
}

export default VFWidgetI
