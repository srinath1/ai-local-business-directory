import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ThemeToggle from "./mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Plus,
  LogIn,
  LogOut,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { Toaster } from "react-hot-toast";
import AddBusinessButton from "../buttons/add-business-button";
import SearchButton from "@/components/business/search-button";
export default async function TopNav() {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.role === "admin";
  return (
    <>
      <Menubar className="flex items-center rounded-none">
        <div className="flex-none">
          <MenubarMenu>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={50}
                height={50}
                className="hover:cursor-pointer"
              />
            </Link>
          </MenubarMenu>
        </div>
        <div className="hidden  md:flex flex-grow justify-center px-4 max-w-3xl">
          <SearchButton />
        </div>
        <div className="flex flex-grow items-center justify-end gap-1">
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/businesses">
                <span className="flex items-center">
                  <Handshake size="16" className="mr-2" /> Businesses
                </span>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>
          <AddBusinessButton />
          {user && (
            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/dashboard">
                  <span className="flex items-center">
                    <LayoutDashboard size="16" className="mr-2" /> Dashboard
                  </span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
          {isAdmin && (
            <MenubarMenu>
              <MenubarTrigger>
                <Link href="/dashboard/admin">
                  <span className="flex items-center">
                    <ShieldCheck size="16" className="mr-2" /> Admin
                  </span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          )}
          <SignedOut>
            <span className="flex items-center">
              <LogIn size="16" className="mr-2" />{" "}
              <SignInButton>
                <span className="text-sm font-normal cursor-pointer">
                  Sign in
                </span>
              </SignInButton>
            </span>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <MenubarMenu>
            <ThemeToggle />
          </MenubarMenu>
        </div>
        <Toaster />
      </Menubar>
      <div className="md:hidden  w-full flex justify-center px-4 my-1">
        <SearchButton />
      </div>
    </>
  );
}
