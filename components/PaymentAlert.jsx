import { useRouter } from 'next/navigation'
import React from 'react'

const PaymentAlert = ({setShowPaymentAlert, handleBtn}) => {
    const router = useRouter();

  return (
    <div onClick={()=> setShowPaymentAlert(false)} className='bg-[#00000066] transition-all duration-300 ease-in-out flex justify-center items-center backdrop-blur-[4.1px] w-screen h-screen fixed top-[95px] max-sm:top-[80px] left-0 z-[111111]'>
      <div onClick={(e)=> e.stopPropagation()} className='w-full max-w-[485px] py-[31px] px-[22px] border flex flex-col gap-20  border-[#421F7B] bg-[#140926] rounded-[16px]'> 
        <div className='text-[20px] text-center'>Generate Video</div>
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
                <div className='text-[20px] font-[500]'>Generate Video</div>
                <div className='text-[16px] font-[400] text-[#8C8C8C]'>$3.00</div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-2'>
                <div className='text-[20px] font-[500]'>Pricing</div>
                <div className='text-[12px] font-[500] text-[#8C8C8C]'>1 credit / minute</div>
                </div>
                <div className='text-[16px] font-[400] text-[#8C8C8C]'>$3.00</div>
            </div>
            <hr className='text-[#8C8C8C80]'/>
            <div className='flex justify-between items-center mt-5'>
                <div className='text-[20px] font-[500]'>New Balance</div>
                <div className='text-[16px] font-[400] text-[#8C8C8C]'>$2.70</div>
            </div>
        </div>
        <button
      onClick={handleBtn}
        className='bg-[#9413E6] text-white text-[16px] max-sm:max-w-full self-center font-[500] mt-2 cursor-pointer rounded-[4px] hover:opacity-[.75] z-5 w-full max-w-[295px] h-[49px]'
      >
        Generate
      </button>
      </div>
    </div>
  )
}

export default PaymentAlert
