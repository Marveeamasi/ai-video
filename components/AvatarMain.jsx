'use client'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Image from 'next/image'
import CreateNewAvatarPrompt from './CreateNewAvatarPrompt'
import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import AlertBox from './AlertBox'
import { PiSealCheck } from "react-icons/pi";
import AvatarCard from './AvatarCard'

const publicAvatarData = [
  { image: '/person5.png', title: 'Jessie Ronie', subImage: '/person5.png', style: '1' },
  { image: '/person6.png', title: 'Sophie Wang', subImage: '/person6.png', style: '2' },
  { image: '/person7.png', title: 'Chang', subImage: '/person7.png', style: '1' },
  { image: '/person4.png', title: 'Jerry', subImage: '/person4.png', style: '1' },
  { image: '/person8.png', title: 'Paul', subImage: '/person8.png', style: '3' },
  { image: '/person9.png', title: 'Locason', subImage: '/person9.png', style: '1' },
  { image: '/person10.png', title: 'Judith', subImage: '/person10.png', style: '3' },
  { image: '/person11.png', title: 'Russel', subImage: '/person11.png', style: '1' },
];

const AvatarMain = () => {
  const [showCreatePrompt, setShowCreatePrompt] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState('true');
  const [avatarsFromDb, setAvatarsFromDb] = useState([]);
  const [isSuccessAvatarAdded, setIsSuccessAvatarAdded] = useState('false');
  const router = useRouter();

  useEffect(() => { 
    const storedAvatars = localStorage.getItem('AVATARS');
    if (storedAvatars) {
      try {
        const parsedAvatars = JSON.parse(storedAvatars);
        const formattedAvatars = parsedAvatars.map((avatar, index) => ({
          id: avatar.id,
          title: avatar.name,
          image: `/person${index > 6 ? 5 : 5 + index}.png`,
          subImage: `/person${index > 6 ? 5 : 5 + index}.png`,
          style: avatar.style,
        }));
        setAvatarsFromDb(formattedAvatars);
      } catch (error) {
        console.error('Error parsing avatars from localStorage:', error);
      }
    }

    setIsSuccessAvatarAdded(localStorage.getItem('IS_SUCCESS') || 'false');
  }, []);

  const toggleCreate = () => {
    if (newUser === 'true') {
      router.push('/how-it-works');
    } else {
      setShowCreatePrompt(!showCreatePrompt);
    }
  }

  useEffect(() => {
    if (isSuccessAvatarAdded === 'true') {
      setTimeout(() => {
        setIsSuccessAvatarAdded('false');
        localStorage.setItem('IS_SUCCESS', 'false');
      }, 3000);
    }
  }, [isSuccessAvatarAdded]);

  const handleUndo = () => {
    setIsSuccessAvatarAdded('false');
    localStorage.setItem('IS_SUCCESS', 'false');
  }

  const filteredPublicAvatars = publicAvatarData.filter(avatar =>
    avatar.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredDbAvatars = avatarsFromDb.filter(avatar =>
    avatar.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 max-sm:gap-10">
      <div className='flex sm:justify-between max-sm:flex-col max-sm:gap-5 w-full items-center px-5 pt-5'>
        <div className='text-[24px] max-sm:text-center font-[500]'>Avatar</div>
        <div className='flex items-center max-sm:flex-col gap-5'>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div onClick={toggleCreate} className='cursor-pointer hover:animate-pulse w-[196px] rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center text-[16px] justify-center z-2'>
            <FaPlus />Create Avatar
          </div>
        </div>
      </div>

      <div className='flex gap-1 items-center max-sm:self-center px-5'>
        My Avatar
        <div className='text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center'>
          {filteredDbAvatars.length}
        </div>
      </div>

      {filteredDbAvatars.length > 0 ?
        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 px-5 gap-2">
          {filteredDbAvatars.map((avatar) => (
            <AvatarCard
              key={avatar.id}
              image={avatar.image}
              title={avatar.title}
              subImage={avatar.subImage}
              style={avatar.style}
            />
          ))}
        </div>
        :
        <div className="flex gap-5 px-5 max-sm:flex-col max-sm:items-center">
          <div className="relative w-[221.75px] h-[280px] justify-center items-center border rounded-[16.35px] border-dashed bg-[#9513e615] border-[#9413E6]">
            <Image className='w-[221.75px] h-[280px] object-cover' src='/user-card.png' alt='bg svg' width={221.75} height={280} />
            <div className="flex absolute bottom-0 max-sm:w-full flex-col gap-3 p-5 max-sm:items-center">
              <div className="text-[24.53px] max-sm:text-center font-[500]">My Avatar</div>
              <div className="text-[14.31px] max-sm:text-center font-[500]">0 Style</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 max-sm:items-center">
            <div className="max-w-[309px] max-sm:text-center text-[#D9D9D9]">Create your own avatar, adapted to your needs, with your own face.</div>
            <div onClick={toggleCreate} className='cursor-pointer z-2 hover:animate-pulse w-[196px] rounded-[4px] bg-[#CF36E9] font-[500] h-[44px] flex gap-2 items-center text-[16px] justify-center'>
              <FaPlus />Create Avatar
            </div>
          </div>
        </div>}

      <div className='flex gap-1 items-center max-sm:self-center px-5'>
        Public
        <div className='text-[13.43px] bg-[#341E58] w-[26px] h-[26px] rounded-[3.35px] flex justify-center items-center'>
          {filteredPublicAvatars.length}
        </div>
      </div>

      <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 px-5 gap-2">
        {filteredPublicAvatars.map((avatar, index) => (
          <AvatarCard
            key={index}
            image={avatar.image}
            title={avatar.title}
            subImage={avatar.subImage}
            style={avatar.style}
          />
        ))}
      </div>

      {showCreatePrompt && <CreateNewAvatarPrompt toggleCreate={toggleCreate} filteredAvatars={filteredPublicAvatars} />}
      {isSuccessAvatarAdded === 'true' && <AlertBox Icon={PiSealCheck} handleUndo={handleUndo} heading={'Congratulations!'} message={'You have successfully created an avatar'} />}
    </div>
  )
}

export default AvatarMain