'use client'
import SideBarForAi from "@/components/SideBarForAi";
import Voices from "@/components/Voices";

export default function AiPage() {
  
  return (
  <div className="flex w-full h-full">
    <SideBarForAi/>
    <Voices/>
  </div>
  );
}