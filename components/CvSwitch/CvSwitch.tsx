"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CvSwitch = ({ checked }: { checked: boolean }) => {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      router.push("/cv");
    } else {
      router.back();
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={handleChange}
        checked={checked}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray"></div>
      <span className="ml-3 text-sm font-medium uppercase">
        Toggle timeline mode
      </span>
    </label>
  );
};

export default CvSwitch;
