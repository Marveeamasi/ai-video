'use client'
import React, { useState } from 'react'
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

    const handleNextStep = () => {
        console.log('Loading complete! Moving to next step...');
      router.push('/preview');
        setGenerating(false);
      }
    
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
    }

  return (
    <>
     <div className='flex gap-3 justify-center max-sm:flex-col max-sm:items-center'>
                <div className='max-sm:w-full max-sm:flex max-sm:justify-center transition-all duration-300 ease-in-out'><Image src='/person.png' alt="picture of a person" width={610} height={354} className={`transition-all duration-300 ease-in-out ${isLandScape? 'w-[610px] h-[354px] max-sm:w-full max-sm:h-[180px]':'w-[400px] max-sm:w-[180px] max-sm:h-[354px] h-[741px] object-cover'} object-top rounded-[8px]`}/></div>
                <div className={``}>
               <div className={`w-[302px] flex flex-col relative gap-1`}>
                {blurbg && <div className='absolute w-full h-full bg-[#0000001A] backdrop-blur-[3px] z-3 rounded-[4px]'></div>}
                {showCard && <ImageCards isLandScape={isLandScape} blurbg={blurbg} setBlurbg={setBlurbg} setShowCard={setShowCard} setStyle={setStyle}/>}
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
                        <ToggleSwitch/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='text-[12.51px] font-[700]'>Source</div>
                        <Select setBlurbg={setBlurbg} blurbg={blurbg} options={["Image generation", "Google image"]}/>
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
                            <button className='cursor-pointer w-[80px] h-[35px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Low</button>
                            <button className='cursor-pointer w-[80px] h-[35px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>Medium</button>
                            <button className='cursor-pointer w-[80px] h-[35px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>High</button>
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
                    <ToggleSwitch/>
                    </div>
                    <div className='flex gap-2 items-center text-[10px] font-[400]'>
                            <button className='cursor-pointer w-[90px] text-[#FCE340] h-[32px] rounded-[4px] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9] pacifico'>DYNAMIC</button>
                            <button className='cursor-pointer w-[90px] h-[32px] rounded-[4px] font-[700] bg-[#261148] focus-within:border-1 focus-within:border-[#CF36E9]'>PROFESSIONAL</button>
                            <button className='cursor-pointer w-[80px] h-[32px] rounded-[4px] bg-[#261148] text-[8px] italic font-[800] focus-within:border-1 focus-within:border-[#CF36E9]'>DOCUMENTARY</button>
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
                    <ToggleSwitch/>
                    </div>
                    <SelectWithSearch setBlurbg={setBlurbg} blurbg={blurbg} options={["None", "Dramatic Tension", "Future Bass", "R&B Smooth", "Trap HipHop", "Epic Orchestral", "Cyberpunk Electro", "Acoustic Folks", "Funky Groove"]}/>
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
                    <ToggleSwitch/>
                    </div>
                    <div className='w-full'>
                    <SelectWithSearchMore setBlurbg={setBlurbg} blurbg={blurbg} options={["None", "Cabby Doctor", "Emma Earrings", "Louis", "Lao"]}/>
                    </div>
                    </div>
               </div>
               </div>
            </div>
            <div onClick={handleContinue} className={`w-[199.43px] h-[31px] font-[700] text-[9.39px] bg-[#9413E6] self-center mt-10 rounded-[3.13px] flex justify-center items-center cursor-pointer ${isLandScape && 'md:absolute  md:top-[70vh]'}`}>Continue</div>
   
            {generating && <Generating z={'z-[1111] lg:left-[10%]'} nextStep={handleNextStep}/>}
            {error && <Trouble z={'z-[1111] lg:left-[10%]'} handleCancel={handleCancel} handleRetry={handleRetry}/>}
             </>
  )
}

export default VFWidgetI
