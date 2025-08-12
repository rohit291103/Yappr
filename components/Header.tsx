"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 border-b border-gray-700">
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <ModeToggle />
      </SignedIn>
    </header>
  );
}
