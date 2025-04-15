 'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import RecordUploadFootage from './RecordUploadFootage'

const UploadBar = () => {
  const [isDrop, setIsDrop] = useState(false);

  const toggleDrop = () => {
    setIsDrop(!isDrop);
  }
  
  return (
    <div className='w-full min-h-screen relative'>
       <Image className='absolute right-0 top-0 z-0' src='/bgtop.png' alt='bg svg' width={400} height={400}/>
               <Image className='absolute left-0 bottom-0 z-0' src='/bgbottom.png' alt='bg svg two' width={600} height={600}/>
        <Navbar toggleDrop={toggleDrop} isDrop={isDrop}/>
       <RecordUploadFootage/>
    </div>
  )
}

export default UploadBar