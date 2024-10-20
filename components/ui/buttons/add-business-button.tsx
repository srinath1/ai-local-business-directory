"use client";
import { MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/app/context/business";
export default function AddBusinessButton() {
  const { initialState, setBusiness } = useBusiness();
  const router = useRouter();

  const handleClick = () => {
    setBusiness(initialState);
    router.push(`/business/add`);
  };
  return (
    <MenubarMenu>
      <MenubarTrigger className="text-base font-normal">
        <span
          onClick={handleClick}
          className="flex items-center cursor-pointer"
        >
          <Plus size="16" className="mr-2" /> Add Business
        </span>
      </MenubarTrigger>
    </MenubarMenu>
  );
}
