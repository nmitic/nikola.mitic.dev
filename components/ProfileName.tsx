"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export const ProfileName = () => {
  const { data: session } = useSession();

  console.log(session?.user);

  if (session?.user) {
    return (
      <Link href="/api/auth/signout" className="inline-block">
        {session.user.name}
      </Link>
    );
  }

  return (
    <Link href="/api/auth/signin/github">
      <div className="w-10 h-10 bg-black rounded-full"></div>
    </Link>
  );
};
