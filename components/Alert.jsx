'use client'

const Alert = ({title, para}) => {

  return (
    <div className="bg-[#140926] max-sm:w-full max-sm:h-auto w-[710px] h-[105px] rounded-[16px] p-[20px] flex justify-center items-center gap-[11px] flex-col">
       <div className="font-[700] text-center">{title}</div>
       <div className="w-full"><hr className="w-full text-[#F1F1F11A]"/></div>
       <div className="text-[#8C8C8C] font-[300] text-[14px] text-center">{para}</div>
    </div>
  )
}

export default Alert;
