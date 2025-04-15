'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Alert from './Alert';
import Link from 'next/link';

const Container = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            id: "first-item",
            wrapper: "flex justify-center items-center gap-[28px] relative",
            images: [
                { src: '/nextimgbg.png', alt: 'next image', width: 710, height: 393 },
            ],
            title: "We need a 2min video of you speaking, without pauses",
            para: "Upload your footage, then our model trains your clone for ~ 12 hours. Only the face is cloned, we are unable to change any facial features"
        },
        {
            id: "second-item",
            wrapper: "flex justify-center items-center gap-[28px] relative",
            images: [
                { src: '/goodperson.png', alt: 'good card', width: 295, height: 341 },
                { src: '/badperson.png', alt: 'wrong card', width: 295, height: 341 }
            ],
            title: "Don't move your arms or your head",
            para: "Stay still, don't turn or twist your body. Don't put your hands over your face."
        },
        {
            id: "third-item",
            wrapper: "flex justify-center items-center gap-[28px] relative",
            images: [
                { src: '/nextimgbg.png', alt: 'next image', width: 715, height: 399.71 },
                { src: '/imgcard1.png', alt: 'card 1', width: 165.8, height: 55.9, className: "absolute top-[140px] right-[140px]" },
                { src: '/imgcard2.png', alt: 'card 2', width: 169.8, height: 55.9, className: "absolute top-[180px] left-[120px]" },
                { src: '/imgcard3.png', alt: 'card 3', width: 236.8, height: 55.9, className: "absolute bottom-[70px] right-[30px]" }
            ],
            title: "Have a good video and audio quality",
            para: "It's your training video that make your results stand out. Ensure high-quality footage with good lighting and clear sound"
        },
        {
            id: "fourth-item",
            wrapper: "grid max-w-[710px] max-h-[280px] gap-[10px] grid-cols-3",
            images: [
                { src: '/person-grid.png', alt: 'next image', width: 211.98, height: 135,},
                { src: '/person-grid.png', alt: 'next image', width: 211.98, height: 135 },
                { src: '/person-grid.png', alt: 'next image', width: 211.98, height: 135 },
                { src: '/person-grid.png', alt: 'next image', width: 211.98, height: 135 },
                { src: '/person-grid.png', alt: 'next image', width: 211.98, height: 135 },
                { src: '/person-grid.png', alt: 'next image', width: 211.98, height: 135 },
            ],
            title: "Add body language for a more dynamic avatar",
            para: "Create your own palette of gestures to give your clone expressiveness, check the documentation to see how"
        }
    ];

    const handleNext = () => {
        if(currentStep===3) router.push('/consent-video');
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    };

    const handleDotClick = (index) => {
        setCurrentStep(index);
    };

    return (
        <div className='flex flex-col z-1 relative pb-40'>
            <div className='flex justify-center items-center relative pt-10 pb-[25px]'>
                <span onClick={() => router.back()} className='absolute text-[#8C8C8C] font-[500] text-[12px] left-10 max-sm:top-5 cursor-pointer hover:text-white'>
                    Back
                </span>
                <div className='flex flex-col items-center'>
                    <h1 className='text-[32px] font-[600]'>How it works</h1>
                    <p className='text-[#8C8C8C] text-[14px] font-[400]'>Understand how to build your clone</p>
                </div>
                <Link href={'/consent-video'} className='absolute text-[#CF36E9] font-[500] text-[12px] right-10 max-sm:top-5 cursor-pointer hover:text-white'>Skip this process</Link>
            </div> 

            <div className='flex self-center justify-center items-center relative' id='items'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={steps[currentStep].id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={steps[currentStep].wrapper}
                        id={steps[currentStep].id}
                    >
                        {steps[currentStep].images.map((image, index) => (
                            <Image
                                key={index}
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                className={`w-[${image.width}px] h-auto ${image.className || ""}`}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className='flex self-center pt-[25px]'>
                <Alert title={steps[currentStep].title} para={steps[currentStep].para} />
            </div>
            <div id='onboard-btns' className='flex self-center my-[25px] w-[59px] items-center justify-center gap-1'>
                {steps.map((_, index) => (
                    <Image
                        key={index}
                        src={index === currentStep ? '/wide-dot.png' : '/small-dot.png'}
                        alt='dot icon'
                        width={index === currentStep ? 26 : 6}
                        height={6}
                        className='cursor-pointer'
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>

            <motion.button
                id='continue-btn'
                onClick={handleNext}
                className='font-[700] flex self-center justify-center cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:opacity-75 items-center text-[12px] bg-[#9413E6] w-[254px] h-[35px] rounded-[4px]'
                whileHover={{ scale: 1.05, opacity: 0.85 }}
                whileTap={{ scale: 0.95 }}
            >
                Continue
            </motion.button>
        </div>
    );
};

export default Container;
