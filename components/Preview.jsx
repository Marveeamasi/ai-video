'use client'
import Image from 'next/image'
import PreviewNavBar from './PreviewNavBar'
import PreviewMain from './PreviewMain'

const Preview = ({toggleShowSlide,showSlide}) => {
    
  return (
    <div className='w-full min-h-screen relative'>
        <Image className='absolute right-0 top-0 z-0' src='/bgtop.png' alt='bg svg' width={400} height={400}/>
        <Image className='absolute left-0 bottom-0 z-0' src='/bgbottom.png' alt='bg svg two' width={600} height={600}/>
        <PreviewNavBar toggleShowSlide={toggleShowSlide} showSlide={showSlide}/>
         <PreviewMain/>
    </div>
  )
}

export default Preview
