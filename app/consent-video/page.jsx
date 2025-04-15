'use client'
import ContentBar from "@/components/ContentBar";
import SideBarBottomBar from "@/components/SideBarBottomBar";

export default function Home() {

  return (
  <div className="flex w-full h-full">
    <SideBarBottomBar section={'consent'}/>
    <ContentBar/>
  </div>
  );
}