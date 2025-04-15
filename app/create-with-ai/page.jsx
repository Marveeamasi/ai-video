'use client'
import MainHead from "@/components/MainHead";
import SideBarForAi from "@/components/SideBarForAi";
import { useState } from "react";

export default function AiPage() {
  
  return (
  <div className="flex w-full h-full">
    <SideBarForAi/>
    <MainHead/>
  </div>
  );
}