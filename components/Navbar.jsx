import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Navbar = ({isDrop, toggleDrop}) => {
    
  return (
    <div className='z-50 sticky top-0 h-[78px] flex gap-[22px] justify-between px-5 items-center bg-[#31164D]'>
        <Link href={"/create-with-ai"} className='flex text-[19.2px] max-sm:hidden hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/experiment.png' alt='icon' width={20} height={20} className='w-[20px] h-auto'/>
            <div className='max-xl:text-xs max-md:hidden'>Expirements</div>
        </Link>
        <Link href={"/create-with-ai"} className='flex text-[19.2px] max-sm:hidden hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/analytics.png' alt='icon two' width={17} height={14} className='w-[17px] h-auto'/>
            <div className='max-xl:text-xs max-md:hidden'>Analytics</div>
        </Link>
        <Link href={"/create-with-ai"} className='flex text-[19.2px] max-sm:hidden hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/teams.png' alt='icon three' width={17} height={14} className='w-[17px] h-auto'/>
            <div className='max-xl:text-xs max-md:hidden'>Teams</div>
        </Link>
        <div className='flex text-[19.2px] max-sm:hidden hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/screenrecord.png' alt='icon four' width={23} height={22.12} className='w-[23px] h-auto'/>
            <div className='max-xl:text-xs max-md:hidden'>Record Screen</div>
        </div>
        <div className='sm:hidden flex text-[19.2px] hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
           <Image onClick={toggleDrop} className={`w-[30px] h-auto transition-all duration-700 ${ isDrop && 'rotate-180'}`} src={"/arrow-down.png"} alt='dropdown' width={50} height={50}/>
        </div>
        <div className='cursor-pointer hover:animate-pulse w-[92px] max-sm:w-fit max-sm:p-2 h-[24px] flex gap-2 rounded-[18px] text-[14px] max-sm:text-[10px] border  border-[#CF36E9] items-center justify-center'>Upload <Image alt='drop down' src='/chevron-down.png' width={12} height={6} className='w-[12px] max-sm:w-[8px] max-sm:h-auto h-[6]'/></div>
        <div className='cursor-pointer hover:animate-bounce'><Image alt='bell' src='/bell.png' width={20} height={24} className='w-[20px] h-auto'/></div>
        <div className='cursor-pointer hover:animate-pulse w-[174px] h-[37px] flex gap-1 items-center justify-end'>
            <div className='flex flex-col gap-1 items-end text-[10px] max-sm:text-[8px] font-[500]'>
              <div>Welcome</div>
              <div>Adminstrator hello</div>
            </div>
            <Image alt='user profile' src='/user-avatar.png' width={37} height={37} className='w-[37px] h-[37px] max-sm:w-[24px] max-sm:h-[24px]'/>
            <Image alt='chevron' src='/chevron-down.png' width={12} height={6} className='w-[12px] h-[6]'/>
            </div>
   {isDrop && <div className='flex flex-col fixed left-0 top-20 backdrop-blur-sm z-50 rounded-[6px] bg-[#140926a6] w-fit h-fit p-10 gap-10'>
    <Link href={"/create-with-ai"} className='flex text-[19.2px] hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/experiment.png' alt='icon' width={20} height={20} className='w-[20px] h-auto'/>
            <div className=''>Expirements</div>
        </Link>
        <Link href={"/create-with-ai"} className='flex text-[19.2px] hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/analytics.png' alt='icon two' width={17} height={14} className='w-[17px] h-auto'/>
            <div className=''>Analytics</div>
        </Link>
        <Link href={"/create-with-ai"} className='flex text-[19.2px] hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/teams.png' alt='icon three' width={17} height={14} className='w-[17px] h-auto'/>
            <div className=''>Teams</div>
        </Link>
        <div className='flex text-[19.2px] hover:cursor-pointer hover:animate-pulse gap-[6px] items-center font-[500]'>
            <Image src='/screenrecord.png' alt='icon four' width={23} height={22.12} className='w-[23px] h-auto'/>
            <div className=''>Record Screen</div>
        </div>
    </div>}
    </div>
  )
}

export default Navbar
