'use client'
import { useState } from "react"; 

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <>
     <button  onClick={toggleSwitch} className={`relative inline-flex h-[20px] w-[41px] items-center rounded-full transition-colors duration-200`}
      style={{background: isOn? `#9413E6`:`gray` }} role="switch" aria-checked={isOn}>
        <span className={`inline-block h-[16.57px] w-[16.57px] transform rounded-full bg-white shadow-md transition-transform duration-200 cursor-pointer ${isOn ? `translate-x-6` : `translate-x-0`}`} >
          <span className="sr-only">Toggle switch {isOn? 'on':'off'}</span>
        </span>
      </button> 
    </>
  );
}
