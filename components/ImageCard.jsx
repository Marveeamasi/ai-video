import Image from 'next/image'
import React from 'react'

const ImageCard = ({image, name, handleClick}) => {
  return (
    <div onClick={()=>handleClick(name)} className='w-fit hover:border hover:border-[#CF36E9] h-fit text-[8px] font-[400] bg-[#140926] relative rounded-[4px] flex justify-center items-center cursor-pointer'>
<Image src={image} alt='cards' width={70} height={70} className='rounded-[4px] w-[70px] h-[70px] object-cover '/>
<div className='absolute w-full bottom-0 flex justify-center items-center py-2' style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0.09) 0%, #000000 100%)`}}>{name}</div>
    </div>
  )
}

export default ImageCard
