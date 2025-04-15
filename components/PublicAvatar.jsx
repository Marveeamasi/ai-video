'use client'
import Image from "next/image";
import Link from "next/link";

export default function PublicAvatar({image, title, subImage, style}) {
  const truncatedTitle = title.length > 6 ? title.slice(0, 6) + "..." : title;

  return (
     <Link href={`/avatar/${image}-${title}-${style}`} className='flex flex-col gap-2 relative'>
              <Image src={image} width={225} height={263} alt='person pics' className='w-full h-[263px] object-cover rounded-[16px]'/>
              <div className="flex absolute bottom-0 p-7 flex-col w-full rounded-b-[16px]" style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%`}}>
                 <div className="text-[20px] font-[500]">{truncatedTitle}</div>
                 <div className="flex items-center gap-1">
                 <Image src={subImage} width={14} height={14} alt='person pics' className='w-[14px] h-[14px] object-cover rounded-full'/>
                 <div className="text-[10px] text-[#D9D9D9]">{style} Style{parseFloat(style)>1 && 's'}</div>
                 </div>
              </div>
              </Link>
  );
}
