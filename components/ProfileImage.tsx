"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export const ProfileImage = () => {
  const { data: session } = useSession();

  if (session?.user && session?.user.image) {
    return (
      <Image
        priority
        src={session?.user.image}
        alt="nikola mitic github profile picture"
        width={40}
        height={40}
        className=" rounded-full"
      />
    );
  }

  return null;
};
