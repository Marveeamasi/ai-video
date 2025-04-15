'use client';
import { use } from 'react';
import AvatarPerson from "@/components/AvatarPerson";
import SideBarForAi from "@/components/SideBarForAi";

export default function AiPage({ params }) {
  const { id } = use(params);
  const image = id.split('-')[0];
  const title = id.split('-')[1];
  const style = id.split('-')[2];
  const avatar = {image, title, style};
  console.log(avatar)

  return (
    <div className="flex w-full h-full">
      <SideBarForAi />
      <AvatarPerson {...avatar}/>
    </div>
  );
}