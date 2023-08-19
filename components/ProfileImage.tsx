"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const ProfileImage = () => {
  const { data: session } = useSession();

  if (session?.user && session?.user.image) {
    return (
      <Link href="/api/auth/signout" className="inline-block">
        <Image
          priority
          src={session?.user.image}
          alt="nikola mitic github profile picture"
          width={40}
          height={40}
          className=" rounded-full"
        />
      </Link>
    );
  }

  return (
    <Link href="/api/auth/signin/github">
      <div className="w-10 h-10 bg-black rounded-full"></div>
    </Link>
  );
};
