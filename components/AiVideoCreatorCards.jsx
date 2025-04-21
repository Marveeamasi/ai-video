'use client';
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import UtilsCard from "./UtilsCard";
import Link from "next/link";
import DeletePromt from "./Prompt";

export default function AiVideoCreatorCard({ isGenerated, heading, image, time, id }) {
    const [isDelete, setIsDelete] = useState(false);
  const [showUtils, setShowUtils] = useState(false);
  const cardRef = useRef(null);

  const handleDelete = () => {
     console.log('deletes item with id: ', id);
  }

  const handleUndo = () => {
    setIsDelete(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowUtils(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={cardRef} className="relative flex flex-col gap-2">
      {showUtils && (
        <UtilsCard
          setShowEdit={() => console.log("Trigger edit modal or action here")}
          setShowDelete={() => setIsDelete(true)}
          handleDownload={() => console.log('Will download videos')}
        />
      )}

      <Image
        src={image}
        width={300}
        height={180}
        alt="person thumbnail"
        className="w-full h-[180px] object-cover"
      />

      <Link href={'#'} className="cursor-pointer flex items-center justify-between text-sm font-[500] w-full">
        {heading}
        <Image
          onClick={() => setShowUtils(prev => !prev)}
          src="/vertical-circles.png"
          width={24}
          height={24}
          alt="more options"
          className="w-[24px] h-[24px]"
        />
      </Link>

      <div className="flex items-center gap-5">
        {isGenerated && <div className="text-sm text-[#CF36E9]">GENERATED</div>}
        <div className="text-xs font-[500] text-[#8C8C8C]">{time}</div>
      </div>
        {isDelete && <DeletePromt handleDelete={handleDelete} handleUndo={handleUndo} message={'Are you sure you want to delete style?'}/>}
    </div>
  );
}
