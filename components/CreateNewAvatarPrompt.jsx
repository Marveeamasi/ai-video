import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNewAvatarPrompt({ toggleCreate, filteredAvatars }) {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleCreateAvatar = () => {
    if (!filteredAvatars.some(avatar => avatar.title.toLowerCase() === name.toLowerCase())) {
      localStorage.setItem('AVATAR_NAME_FROM_VD', name);
      router.push('/upload-footage');
    } else {
      alert('Avatar with this name already exists!');
    }
  }

  return (
    <div onClick={toggleCreate} className="backdrop-blur-xs bg-[#0000001a] fixed z-[2] w-full h-full top-0 left-[10%] max-xl:left-0 flex justify-center items-center">
      <div className="bg-[#140926] rounded-[8px] h-[192px] w-[372px] flex flex-col p-4 text-[#D9D9D9] gap-5 m-auto">
        <div>New Avatar</div>
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2">
          <label htmlFor='name' className="text-[12px]">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Enter Avatar name"
            className="border-[#8C8C8C80] border rounded-[4px] text-[14px] py-[10px] px-[12px]"
          />
        </div>
        <div className="flex items-center self-center gap-4">
          <button
            className="w-[122px] h-[34px] rounded-[4px] bg-[#31164D] font-[500] text-[14px] cursor-pointer"
            onClick={toggleCreate}
          >
            Cancel
          </button>
          <button
            className="w-[122px] h-[34px] rounded-[4px] bg-[#CF36E9] font-[500] text-[14px] cursor-pointer"
            onClick={handleCreateAvatar}
          >
            Create Avatar
          </button>
        </div>
      </div>
    </div>
  );
}
