'use client'

import React, { useEffect, useState } from 'react'

import SelectList from './SelectList'

import Image from 'next/image'



const SelectBtn = ({ searchable, lists, pos,selectedOption, setSelectedOption}) => {

    const [showList, setShowList] = useState(false);

    const [isDisplaced, setIsDisplaced] = useState(false);



    useEffect(() => {

        console.log('showList is:', showList);

    }, [showList]);



    const handleClick = (value) => {

        setSelectedOption(value);

        setShowList(false);

        setIsDisplaced(false);

    }



    return (

        <button 

            onClick={(e) => {

                e.stopPropagation(); 

                setShowList(prev => !prev);

                setIsDisplaced(true);

            }} 

            className="flex relative items-center py-[6px] px-[9px] rounded-[4px] bg-[#140926] justify-between w-1/2 cursor-pointer"

        >

             {isDisplaced && <div onClick={(e)=> e.stopPropagation()} className={`absolute w-[306px] h-[357px] bg-[#0000001A] backdrop-blur-[3px]  top-[-110%] z-40 ${pos==='right'? 'left-[-135%]' : 'right-[-135%]'} rounded-[4px]`}></div>}

            {selectedOption}

            <Image

                src="/arrow-left.png"

                alt="left arrow"

                width={20}

                height={20}

                className="h-[20px] w-[20px]" 

            />

            {showList && (

                <SelectList

                    searchable={searchable} 

                    lists={lists} 

                    handleClick={handleClick} 

                    setShowList={setShowList} 

                />

            )}

        </button>

   

    )

}



export default SelectBtn
