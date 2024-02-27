"use client";

import Link from "next/link";
import { useState } from "react";

export const FIRST = 10;

export const LoadMoreBtn = () => {
  const [first, setFirst] = useState(20);

  return (
    <div className=" flex justify-center mt-4">
      <Link
        scroll={false}
        href={`/tiny_thoughts/?first=${first}&skip=0`}
        onClick={() => setFirst((prev) => prev + FIRST)}
        className=" w-full md:w-1/2 lg:w-[200px] text-center block bg-white text-black text-lg p-3"
      >
        Load more
      </Link>
    </div>
  );
};
