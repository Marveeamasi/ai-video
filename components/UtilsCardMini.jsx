'use client'

import Image from "next/image";

export default function UtilsCardMini({handleEdit, handleDelete}) {

  return (
    <div className="w-[164px] h-[65px] rounded-[4px] bg-[#140926] flex flex-col justify-center items-center p-2 gap-1 absolute top-[-65px] right-0">
     <div onClick={handleDelete} className="bg-[#9413E6] p-1 w-[144px] h-[25px] rounded-[4px] flex justify-between items-center cursor-pointer">
        <div className="font-[500] text-[12px]">Delete</div>
        <Image src={'/delete.png'} width={16} height={16} alt='person pics' className='w-[16px] h-[16px]'/>
     </div>
     <div onClick={handleEdit} className="bg-[#9413E6] p-1 w-[144px] h-[25px] rounded-[4px] flex justify-between items-center cursor-pointer">
        <div className="font-[500] text-[12px]">Edit</div>
        <Image src={'/pencil-edit.png'} width={16} height={16} alt='person pics' className='w-[16px] h-[16px]'/>
     </div>
    </div>
  );
}
