'use client';
import Image from "next/image";

export default function UtilsCard({ bg = "bg-[#9413e6]", pos = "bottom-[-160px]", setShowEdit, setShowDelete, handleDownload }) {
  const actions = [
    {
      label: "Delete",
      icon: "/delete.png",
      onClick: () => {
        if (setShowDelete) setShowDelete();
        else console.log("Handle delete logic here");
      },
    },
    {
      label: "Edit",
      icon: "/pencil-edit.png",
      onClick: () => {
        if (setShowEdit) setShowEdit();
        else console.warn("No setShowEdit function provided!");
      },
    },
    {
      label: "Download",
      icon: "/cloud-download.png",
      onClick: () => {
        if (handleDownload) handleDownload();
        else console.warn("No handle download function provided!");
      },
    },
  ];

  return (
    <div
    onClick={(e)=> e.stopPropagation()}
      className={`absolute z-[11111] ${pos} w-[282px] h-[150px] rounded-[8px] bg-[#140926] p-3 flex flex-col justify-center items-center gap-1 transition-all duration-300 ease-in-out`}
    >
      {actions.map((action, index) => (
        <div
          key={index}
          onClick={action.onClick}
          className={`${bg} p-2 w-[262px] h-[40px] rounded-[4px] flex justify-between items-center cursor-pointer hover:animate-pulse`}
        >
          <span className="font-[500] text-[12.51px]">{action.label}</span>
          <Image src={action.icon} width={20} height={20} alt={action.label} className="w-[20px] h-[20px]" />
        </div>
      ))}
    </div>
  );
}
