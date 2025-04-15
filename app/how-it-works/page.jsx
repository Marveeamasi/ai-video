'use client'
import MainBar from "@/components/MainBar";
import SideBarBottomBar from "@/components/SideBarBottomBar";

export default function Home() {

  return (
  <div className="flex w-full h-full">
    <SideBarBottomBar section={'how'}/>
    <MainBar/>
  </div>
  );
}