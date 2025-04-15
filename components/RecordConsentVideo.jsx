'use client'
import { useRouter } from 'next/navigation';
import ConsentAlert from './ConsentAlert';
import Image from 'next/image';
import { useState } from 'react';

const RecordConsentVideo = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const router = useRouter();

    const handleClick = () => {
        if (selectedVideo) {
            localStorage.setItem('CONSENT_VIDEO_FROM_VD', selectedVideo.name);
            router.push('/upload-footage');
        }
    }

    const validateVideo = (file) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);
        
        video.onloadedmetadata = () => {
            if (video.duration > 30) {
                alert('Video duration should not exceed 30 seconds.');
                setSelectedVideo(null);
            } else {
                setSelectedVideo(file);
            }
        };
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            validateVideo(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video/')) {
            validateVideo(file);
        }
    };

    return (
        <div className='flex flex-col z-1 relative pb-40 max-sm:p-5'>
            <div className='flex justify-center items-center relative pt-10 pb-[25px]'>
                <span onClick={() => router.back()} className='absolute text-[#8C8C8C] font-[500] text-[12px] left-10 max-sm:top-5 cursor-pointer hover:text-white'>
                    Back
                </span>
                <div className='flex flex-col items-center'>
                    <h1 className='text-[32px] font-[600]'>Record consent video</h1>
                    <p className='text-[#8C8C8C] text-[14px] font-[400]'>Your clone needs to be you</p>
                </div>
            </div>

            <div className='flex self-center pt-[25px]'>
               <ConsentAlert />
            </div>
            <div
                id='drag-and-drop-area'
                className='rounded-[65.81px] mt-10 w-[485.419px] h-[300px] max-sm:w-full max-sm:h-fit max-sm:p-5 self-center flex items-center justify-center bg-[#140926ce]'
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className='rounded-[44.39px] w-[432.77px] h-[253.16px] max-sm:w-full max-sm:h-[260px] flex items-center justify-center bg-[#58585817] border border-[#88888817] backdrop-blur-2xl'>
                    <label htmlFor='consent-video' className='w-[90.55px] h-[36.537px] flex items-center justify-center cursor-pointer gap-1 bg-[#ffffff0d] rounded-[62.75px]'>
                        <Image src={'/cloud-upload.png'} width={24} height={24} className='' alt='a play icon' />
                        <div className='text-[10.46px] font-[500] text-[#FFFFFF]'>{selectedVideo? selectedVideo.name : 'Upload'}</div>
                        <input
                            type="file"
                            id='consent-video'
                            className='hidden'
                            onChange={handleFileInput}
                            accept="video/*"
                        />
                    </label>
                </div>
            </div>

            <div className='self-center flex items-center gap-5 text-[12px] mt-10'>
                <button className='rounded-[4px] bg-[#1B0C34] w-[129px] h-[35px] cursor-pointer' onClick={() => router.back()}>
                    Back
                </button>
                <button
                    onClick={handleClick}
                    className={`rounded-[4px] bg-[#9413E6] w-[129px] h-[35px] cursor-pointer ${!selectedVideo ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedVideo}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default RecordConsentVideo;
