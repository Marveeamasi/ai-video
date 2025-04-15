import Image from 'next/image'
import React from 'react'

const PreviewNavBar = ({toggleShowSlide,showSlide}) => {
  return (
    <div className='z-50 sticky top-0 flex justify-between px-5 pt-10 pb-5 text-[24px] max-sm:text-xs font-[500] items-center bg-[#261148]'>
      <div className='flex items-center gap-3'>
        <Image onClick={toggleShowSlide} src={showSlide?'/arrow-right.png':'/arrow-left.png'} alt='right' width={24} height={24} className='cursor-pointer transition-all duration-300 ease-in-out w-[24px] h-[24px] max-lg:animate-pulse lg:hidden'/>
      Whats Todays Weather
      </div>
     <div className='flex items-center gap-3 max-sm:justify-end'>
      <div className='bg-[#140926] w-[261px] max-sm:w-fit max-sm:h-fit max-sm:px-5 max-sm:py-2 h-[49px] rounded-[4px] flex justify-center items-center text-[16px] max-sm:text-xs'>Preview</div>
      <Image src={'/circle-vertical-dots.png'} alt='dots' width={24} height={24} className='w-[24px] h-[24px]'/>
     </div>
    </div> 
  )
}

export default PreviewNavBar
 