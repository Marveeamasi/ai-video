'use client'
import UploadBar from "@/components/UploadBar";
import SideBarBottomBar from "@/components/SideBarBottomBar";

export default function Home() {

  return (
  <div className="flex w-full h-full">
    <SideBarBottomBar section={'upload'}/>
    <UploadBar/>
  </div>
  );
}