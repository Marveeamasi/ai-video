'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import UtilsCardMini from './UtilsCardMini'
import { useRouter } from 'next/navigation'
import Prompt from './Prompt'

const AvatarPerson = ({image, title, style}) => {
    const [isDrop, setIsDrop] = useState(false);
    const [isShowUtils, setIsShowUtils] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = () => {
     setIsDeleting(true);
    };

    const handleEdit = () => {
      console.log('editing');
    }

const handleCreate = () => {
  router.push('/write-your-script');
}
      
        const toggleDrop = () => {
          setIsDrop(!isDrop);
        }

        const toggleShowUtils = () => {
            setIsShowUtils(!isShowUtils)
        }

        const truncatedTitle = title.length > 6 ? title.slice(0, 6) + "..." : title;


  return (
    <div className='w-full min-h-screen relative pb-40'>
    <Image className='absolute right-0 top-0 z-0' src='/bgtop.png' alt='bg svg' width={400} height={400}/>
     <Image className='absolute left-0 bottom-0 z-0' src='/bgbottom.png' alt='bg svg two' width={600} height={600}/>
     <Navbar toggleDrop={toggleDrop} isDrop={isDrop}/>
      <div className='flex flex-col p-5 gap-5 max-sm:items-center'>
         <div className='text-[24px] font-[500]'><span>Avatar </span><span className='text-[#8C8C8C]'>({title.replace('%20',' ')})</span></div>
         <Image src={`/${image}`} width={84} height={98.187} alt='avatar' className='rounded-[5.97px] object-cover'/>
         <div className='flex gap-1 items-center max-sm:self-center'>Style <div className='text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center'>{style}</div></div>
     <div className='flex flex-col gap-2 relative w-fit'>
              <Image src={'/'+image} width={406} height={474.569} alt='person pics' className='max-w-[406px] w-full h-[474.569px] object-cover rounded-[28.87px]'/>
              <div className="flex absolute bottom-0 p-7 flex-col w-full rounded-b-[16px]" style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%`}}>
                 <div className="text-[20px] font-[500]">{truncatedTitle}</div>
                 <div className='flex items-center w-full justify-between relative'>
                 <div className="flex items-center gap-1">
                 <Image src={'/video-icon.png'} width={24} height={24} alt='person pics' className='w-[24px] h-[24px]'/>
                 <div className="text-[18.04px] text-[#D9D9D9]">2 Camera</div>
                 </div>
                 <Image onClick={toggleShowUtils} src={'/circle-vertical-dots.png'} width={24} height={24} alt='person pics' className='w-[24px] h-[24px] cursor-pointer'/>
                 {isShowUtils && <UtilsCardMini handleDelete={handleDelete} handleEdit={handleEdit}/>}
                 </div>
              </div>
              </div>
              <div onClick={()=> setIsCreate(true)} className='max-w-[406px] cursor-pointer w-full h-[67px] rounded-[8px] border-[1.5px] border-[#8C8C8C] hover:opacity-75 z-10 flex justify-center items-center' >Create Video</div>
      </div>
      {isDeleting && <Prompt  message={`Are you sure to delete style?`}
          handleUndo={() => setIsDeleting(false)}
          handleAction={handleDelete}/>}
      {isCreate && <Prompt  message={`Are you sure to create a style?`}
          handleUndo={() => setIsCreate(false)}
          handleAction={handleCreate}
          action={'Create'}/>
      }
          </div>
  )
}

export default AvatarPerson
