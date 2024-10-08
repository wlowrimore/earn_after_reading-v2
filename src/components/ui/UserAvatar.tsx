"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { extractFirstName } from "../../../utils/extractFirstName";
import { extractLastName } from "../../../utils/extractLastName";
import { extractInitials } from "../../../utils/extractInitials";

interface UserAvatarProps {
  initials: string;
  firstName?: string;
  lastName?: string;
  googleAvatar?: string;
}

export function UserAvatar<UserAvatarProps>() {
  const { data: session, status } = useSession();
  const googleAvatar = session?.user?.image;

  const email = session?.user?.email;
  const firstName = extractFirstName();
  const lastName = extractLastName();
  const initials = extractInitials();

  if (status === "loading") {
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (googleAvatar) {
    console.log("Google avatar:", googleAvatar);
  }

  return (
    <div className="flex items-center gap-2 justify-center">
      {googleAvatar ? (
        <Image
          src={googleAvatar}
          alt="Google avatar"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <div className="text-lg font-bold bg-[#6c2a4d] text-white rounded-full w-8 h-8 p-6 flex items-center justify-center">
          {initials}
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex items-start text-base gap-1 leading-4 tracking-wide font-semibold text-black">
          <p>{firstName}</p>
          <p>{lastName?.slice(0, 1).toUpperCase()}</p>
        </div>
        <p className="text-xs font-light text-black">{email}</p>
      </div>
    </div>
  );
}
