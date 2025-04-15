import Image from 'next/image'
import React from 'react'

const Played = ({setIsPlayed,formatTime,handlePause,time}) => {
  return (
    <div onClick={()=> setIsPlayed(false)} className='backdrop-blur-[4px] transition-all duration-300 ease-in-out fixed top-0 left-[10%] max-xl:left-0 z-20 w-screen h-screen flex justify-center items-center'>
                    <div id='card' onClick={(e) => {e.stopPropagation()}}  className='w-[400px] max-sm:w-full flex flex-col justify-center items-center rounded-[16px] p-5 gap-3 bg-[#140926]'>
                         <div className='flex w-full flex-col justify-center items-center'>
                            <div className='flex gap-[10px] justify-center items-center font-[600]'><Image src='/mic.png' alt="picture of a record" width={20} height={20} className='w-[20px] h-auto'/>Record Audio</div>
                            <div className='text-[12px] font-extralight text-center'>Record your script (max 20 minutes)</div>
                         </div>
                        <div onClick={handlePause}
                         className='w-[100px] h-[100px] rounded-full bg-[#261148] flex justify-center items-center text-[22.54px] font-[600] cursor-pointer hover:bg-[#31164D] my-5'>
                            <div className="relative flex justify-center items-center">
      <div className="min-w-[142px] h-[142px] rounded-full bg-[#26114854] flex justify-center items-center pulse-slow">
        <div className="w-[100px] h-[100px] rounded-full bg-[#261148] flex justify-center items-center pulse-fast">
          <div className="w-[46.67px] h-[46.67px] bg-white rounded-xl"></div>
        </div>
      </div>
    </div></div>
                        <div className='w-[270px] h-[57px] rounded-[32px] bg-[#261148] flex justify-center items-center animate-pulse'>
                                                 <Image src="/amp.png" alt="amplitude" width={245} height={37} className={`w-[245px] h-[37px]`}/>
                                                 </div>
                         <div className='flex items-center justify-center gap-1'>
                            <Image src="/reddot.png" alt='dot' width={15} height={15} className='w-[15px] h-auto'/>
                            <div id='count'>{formatTime(time)}</div>
                         </div>
                         <div className='text-[12px] font-extralight mt-10 text-center'>Make sure you're in a quiet environment.</div>
                    </div>
                   </div>
  )
}

export default Played