"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CvSwitch = ({ defaultChecked = true }: { defaultChecked: boolean }) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      router.back();
    } else {
      router.push("/cv");
    }
    setIsChecked(!isChecked);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value="checked"
        className="sr-only peer"
        onChange={handleChange}
        checked={isChecked}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray"></div>
      <span className="ml-3 text-sm font-medium uppercase">
        Toggle timeline mode
      </span>
    </label>
  );
};

export default CvSwitch;
