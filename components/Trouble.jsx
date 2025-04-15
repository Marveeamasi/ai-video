'use client'
import Image from 'next/image'

const Trouble = ({z, handleCancel, handleRetry}) => {
  return (
    <div className={`bg-[#261148] w-full h-full top-0 fixed ${z}`}>
         <div className='relative w-full h-full'>
           <Image className='absolute right-0 top-0 z-0' src='/bgtop.png' alt='bg svg' width={400} height={400}/>
           <Image className='absolute left-0 bottom-0 z-0' src='/bgbottom.png' alt='bg svg two' width={600} height={600}/>
           <div className='flex flex-col gap-5 justify-center items-center px-5'>
         <Image className='w-[175.30px] h-[140px] animate-pulse mt-[199px] max-sm:mt-40' src='/loader.png' alt='bg svg' width={175.30} height={140}/>
         <div className='font-[500] text-[32px] text-center'>We’re having trouble generating your video</div>
         <div className='text-[#8C8C8C80] text-center text-[14px]'>A bug report has been submitted to our tech team, they’re looking into it - in the meantime, you can retry or create another project.</div>
         <div className='w-full max-w-[516px] h-[49px] grid grid-cols-2 gap-5'>
          <button onClick={handleCancel} className='text-[#8C8C8C] cursor-pointer bg-[#140926] rounded-[4px] w-full z-2'>Cancel</button>
          <button onClick={handleRetry} className='cursor-pointer bg-[#9413E6] rounded-[4px] w-full z-2'>Retry</button>
         </div>
         </div>
         </div>
       </div>
  )
}

export default Trouble
