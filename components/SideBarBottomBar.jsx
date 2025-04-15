import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SideBarBottomBar = ({section}) => {
  return (
    <aside className='max-lg:fixed max-lg:border-r-0 bg-[#261148] max-lg:border-t-4 max-lg:border-t-[#1409261a] max-lg:justify-between max-lg:rounded-t-xl max-lg:top-auto max-lg:z-50 max-lg:flex-row max-lg:bottom-[0px] max-lg:w-screen max-lg:h-[100px] max-lg:left-0 max-lg:bg-[#261148] h-screen border-r-4 border-r-[#1409261a] sticky left-0 top-0 z-30 w-[380px] flex flex-col font-[500] text-[16px]'>
               <div className='w-fit max-lg:hidden h-fit py-[41px] px-[24px] mb-[20px]'><Image width={214} height={44} src={`/logo.png`} alt={"logo"} className='w-[214px] h-[44px]'/></div>
        <Link href={'/how-it-works'} className='flex items-center max-lg:flex-row-reverse gap-5 px-10 cursor-pointer'>
            <Image src='/lightbulb.png' alt='lightbulb' width={34} height={34} className='w-[34px] h-auto'/>
            <div className='max-sm:hidden'>How it Works</div>
        </Link>
        <div className='relative p-5 flex justify-center items-center max-lg:hidden'><Image src='/verticalline.png' className='absolute left-[55px] w-[4px] h-auto' alt="vertical" width={4} height={40}/></div>
        <Link href={'/consent-video'} className="flex items-center max-lg:flex-row-reverse gap-5 px-10 cursor-pointer group hover:opacity-[1]" style={{opacity: section==='consent'|| section==='upload'? '1':'0.4'}}>
        <Image src="/verifyicon.png" alt="lightbulb" width={34} height={34} className='w-[34px] h-auto'/>
        <div className="group-hover:opacity-[1] max-sm:hidden" style={{opacity: section==='consent' || section==='upload'? '1':'0.4'}}>Consent video</div>
        </Link>
        <div className='group hover:opacity-[1] max-lg:my-auto' style={{opacity: section==='upload'? '1':'0.4'}}>
        <div className="relative p-5 flex justify-center items-center max-lg:hidden">
        <Image src="/verticalline.png" className="absolute left-[55px] w-[4px] h-auto" alt="vertical line" width={4} height={40}/>
        </div>

        <Link href={'/upload-footage'} className="flex items-center gap-5 px-10 cursor-pointer max-lg:flex-row-reverse">
        <Image src="/youtube.png" alt="lightbulb" width={34} height={34} className='w-[34px] h-auto'/>
        <div className="group-hover:opacity-[1] max-sm:hidden" style={{opacity: section==='upload'? '1':'0.4'}}>Upload footage</div>
        </Link>
        </div>
      </aside>
  )
}

export default SideBarBottomBar
