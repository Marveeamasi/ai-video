'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Generating = ({ z, loading, duration = 5000 }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!loading) {
      setProgress(0)
      return
    }

    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep += 1
      const newProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [loading, duration])

  if (!loading) return null

  return (
    <div className={`bg-[#261148] w-full h-full top-0 fixed ${z}`}>
      <div className='relative w-full h-full'>
        <Image className='absolute right-0 top-0 z-0' src='/bgtop.png' alt='bg svg' width={400} height={400}/>
        <Image className='absolute left-0 bottom-0 z-0' src='/bgbottom.png' alt='bg svg two' width={600} height={600}/>
        <div className='flex flex-col gap-5 justify-center items-center px-5'>
          <Image className='w-[175.30px] h-[140px] animate-pulse mt-[199px] max-sm:mt-40' src='/loader.png' alt='bg svg' width={175.30} height={140}/>
          <div className='font-[500] text-[32px] text-center'>Performing Video Dual Magic</div>
          <div className='max-w-[715px] w-full h-[5px] bg-[#D9D9D9] rounded-[193px] overflow-hidden'>
            <div
              className='h-full bg-[#9413E6] transition-all duration-100'
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className='text-[#8C8C8C80] text-center text-[14px]'>This May take few minutes</div>
        </div>
      </div>
    </div>
  )
}

export default Generating