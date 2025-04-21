'use client';
import AudioScriptFirst from "@/components/AudioScriptFirst";
import Generating from "@/components/Generating";
import Navbar from "@/components/Navbar";
import SideBarForAi from "@/components/SideBarForAi";
import TextScriptFirst from "@/components/TextScriptFirst";
import TextScriptSecond from "@/components/TextScriptSecond";
import Trouble from "@/components/Trouble";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import InitialRecordState from "@/components/InitialRecordState";
import RecordingState from "@/components/RecordingState";
import RecordPausedState from "@/components/RecordPausedState";

export default function AiPage() {
  const router = useRouter();
  const [isDrop, setIsDrop] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [barWidth, setBarWidth] = useState(40);
  const [isInitialRecordState, setIsInitialRecordState] = useState(false);
  const [isRecordingState, setIsRecordingState] = useState(false);
  const [isPausedState, setIsPausedState] = useState(false);
  const [isSecondTextWidget, setIsSecondTextWidget] = useState(false);
  const [isFirstTextWidget, setIsFirstTextWidget] = useState(true);
  const [time, setTime] = useState(0);
  const [audioFromRecord, setAudioFromRecord] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaStreamRef = useRef(null);
  const barRef = useRef(null);
  const [scriptText, setScriptText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleSkip = () => {
    setGenerating(true);
    setTimeout(() => {
      router.push('/preview');
    }, 3000);
  };

  const handleRetry = () => {
    setError(null);
    setGenerating(true);
  };

  const handleCancel = () => {
    setError(null);
    setGenerating(false);
  };

  const handleTextScript = (e) => {
    setScriptText(e.target.value);
  };

  const handleContinue = () => {
    if (isAudio) {
      setIsPausedState(false);
      setIsSecondTextWidget(true);
      setBarWidth(75);
      console.log(audioFromRecord)
    }
  };

  const handleFileUploadFromDevice = (file) => {
    console.log("Selected file:", file);
    if (isAudio) {
      setIsPausedState(false);
      setIsSecondTextWidget(true);
      setBarWidth(75);
    }
  };

  const handleRecording = async () => {
    setIsRecordingState(true);
    setIsPausedState(false);
    setIsInitialRecordState(false);
    setTime(0);
    setAudioFromRecord(null);
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
  
      const recorder = new MediaRecorder(stream);
      let chunks = [];
  
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
  
      recorder.onstop = () => {
        if (chunks.length > 0) {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(blob);
          setAudioFromRecord(audioUrl);
          console.log('from recording:', audioUrl);
        }
      };
  
      setMediaRecorder(recorder);
      recorder.start();
    } catch (err) {
      console.error("Microphone access denied or error starting recording:", err);
      setError("Failed to access microphone. Please allow microphone access and try again.");
      setIsRecordingState(false);
    }
  };
  

  const handlePause = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      setMediaRecorder(null);
      console.log('from pause:',audioFromRecord)
    }
    setIsPausedState(true);
    setIsRecordingState(false);
    setIsInitialRecordState(false);
  };

  const handleRerecord = async () => {
    setIsRecordingState(true);
    setIsPausedState(false);
    setIsInitialRecordState(false);
    setTime(0);
    setAudioFromRecord(null);
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
  
      const recorder = new MediaRecorder(stream);
      let chunks = [];
  
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
  
      recorder.onstop = () => {
        if (chunks.length > 0) {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(blob);
          setAudioFromRecord(audioUrl);
          console.log('from recording:', audioUrl);
        }
      };
  
      setMediaRecorder(recorder);
      recorder.start();
    } catch (err) {
      console.error("Microphone access denied or error starting recording:", err);
      setError("Failed to access microphone. Please allow microphone access and try again.");
      setIsRecordingState(false);
    }
  };
  
  const handleShowRecordState = () => {
    setIsInitialRecordState(true);
    setIsRecordingState(false);
    setIsPausedState(false);
  };

  useEffect(() => {
    let timer;
    if (isRecordingState) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecordingState]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    setBarWidth(40);
    setIsFirstTextWidget(true);
    setIsSecondTextWidget(false);
    setTime(0);
    setAudioFromRecord(null);
    setRecordedChunks([]); 
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorder) {
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      setMediaRecorder(null);
    }
  }, [isAudio]);

  const toggleDrop = () => {
    setIsDrop(!isDrop);
  };

  const handleContinueClick = () => {
    if (!isAudio) {
      if (isFirstTextWidget) {
        
        setIsFirstTextWidget(false);
        setIsSecondTextWidget(true);
        setBarWidth(75);
      } else if (isSecondTextWidget) {
        
        setBarWidth(100);
        setTimeout(() => {
          router.push('/choose-options');
        }, 500);
      }
    } else {
      if (isSecondTextWidget) {
        
        setBarWidth(100);
        setTimeout(() => {
          router.push('/choose-options');
        }, 500);
      }
    }
  };

  return (
    <div className="flex w-full h-full transition-all duration-300 ease-in-out">
      <SideBarForAi />
      <div className='w-full min-h-screen relative'>
        <Image className='absolute right-0 top-0 z-0' src='/bgtop.png' alt='bg svg' width={400} height={400} />
        <Image className='absolute left-0 bottom-0 z-0' src='/bgbottom.png' alt='bg svg two' width={600} height={600} />
        <Navbar toggleDrop={toggleDrop} isDrop={isDrop} />
        <div className='flex flex-col z-1 relative pb-40 gap-2'>
          <div className='flex justify-center items-center relative pt-10'>
            <span onClick={() => router.back()} className='absolute text-[#8C8C8C] font-[500] text-[14px] left-10 max-sm:top-5 cursor-pointer hover:text-white'>Back</span>
            <div className={`flex flex-col items-center ${isSecondTextWidget && 'hidden'}`}>
              <h1 className='text-[24px] font-[600]'>Write your script</h1>
              <p className='text-[#CF36E9] text-[12px] font-[400] flex items-center my-2 gap-2'>Don’t Know what to write?
                <button className="w-[74px] h-[24px] bg-[#CF36E9] text-[#fff] rounded-[4px]">Generate</button>
              </p>
              <span onClick={handleSkip} className='absolute text-[#CF36E9] font-[500] text-[14px] right-10 max-sm:top-5 cursor-pointer hover:text-white'>Skip to editor</span>
            </div>
            {isSecondTextWidget && <span onClick={handleSkip} className='absolute text-[#CF36E9] font-[500] text-[14px] right-10 max-sm:top-5 cursor-pointer hover:text-white'>Skip to editor</span>}
          </div>
          <div className={`flex gap-3 self-center max-sm:flex-col max-sm:items-center ${isSecondTextWidget && `mt-10`}`}>
            <Image src='/person-12.png' alt="picture of a person" width={400} height={354} className='w-[400px] max-sm:max-w-[400px] max-sm:w-full min-h-[354px] object-cover rounded-[8px]' />
            <div className="w-[302px] max-sm:w-full min-h-[355px] flex flex-col rounded-[8px] p-5 bg-[#140926] gap-1">
              <div className="w-[188px] h-[45px] rounded-[60px] bg-[#261148] p-1 flex items-center gap-2">
                <div onClick={() => setIsAudio(false)} className={`${isAudio ? 'transparent opacity-[.5]' : 'bg-[#140926] opacity-[1]'} w-[90px] h-[36px] rounded-[60px] p-[10px] gap-[10px] flex items-center transition-all duration-300 ease-in-out cursor-pointer`}>
                  <Image src='/text-circle.png' alt="text icon" width={16} height={16} className='w-[16px] h-[16px]' />
                  <div className="text-[12.51px]">Text</div>
                </div>
                <div onClick={() => setIsAudio(true)} className={`${isAudio ? 'bg-[#140926] opacity-[1]' : 'transparent opacity-[.5]'} w-[90px] h-[36px] rounded-[60px] p-[10px] gap-[10px] flex items-center transition-all duration-300 ease-in-out cursor-pointer`}>
                  <Image src='/mic.png' alt="audio icon" width={16} height={16} className='w-[16px] h-[16px]' />
                  <div className="text-[12.51px]">Audio</div>
                </div>
              </div>
              {isAudio ? (
                isSecondTextWidget ? (
                  <TextScriptSecond script={scriptText} handleTextScript={handleTextScript} />
                ) : (
                  <AudioScriptFirst handleShowRecordState={handleShowRecordState} onFileUpload={handleFileUploadFromDevice} />
                )
              ) : (
                isSecondTextWidget ? (
                  <TextScriptSecond script={scriptText} handleTextScript={handleTextScript} />
                ) : (
                  <TextScriptFirst
                    setIsLong={setIsLong}
                    isLong={isLong}
                    scriptText={scriptText}
                    handleTextScript={handleTextScript}
                  />
                )
              )}
            </div>
          </div>
          <div className="flex w-full justify-center items-center pt-5">
            <div className="w-[686px] h-[7px] rounded-[8px] bg-[#140926] relative">
              <div ref={barRef} className="h-full rounded-[8px] bg-[#CF36E9]" style={{ width: `${barWidth}%` }}>
                <div className="absolute top-[-2.5px] w-[12px] h-[12px] rounded-full border border-[#00000025]"
                  style={{ left: `calc(${barWidth}% - 6px)`, backgroundColor: '#CF36E9' }} />
              </div>
            </div>
          </div>
          <div className="text-[#8C8C8C] text-[12px] font-[300] flex self-center mt-5">Complete the step by</div>
          <button onClick={handleContinueClick} className="bg-[#9413E6] cursor-pointer rounded-[3.13px] w-[199.43] h-[31px] mt-5 flex self-center justify-center items-center text-[16px] font-[700]">Continue</button>
        </div>
      </div>
      {isInitialRecordState && <InitialRecordState setIsInitialRecordState={setIsInitialRecordState} handleRecording={handleRecording} />}
      {isRecordingState && <RecordingState setIsRecordingState={setIsRecordingState} formatTime={formatTime} handlePause={handlePause} time={time} />}
      {isPausedState && <RecordPausedState audioFromRecord={audioFromRecord} handleContinue={handleContinue} formatTime={formatTime} handleRerecord={handleRerecord} time={time} />}
      <Generating z={'z-[1111] lg:left-[10%]'} loading={generating} duration={3000} />
      {error && <Trouble z={'z-[1111] lg:left-[10%]'} handleCancel={handleCancel} handleRetry={handleRetry} message={error} />}
    </div>
  );
}