"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SwitchProps {
  onSwitch: (isSwitched: boolean) => void;
  switched: boolean;
  disabled?: boolean;
  label: string;
}

export const Switch = ({
  onSwitch,
  switched,
  label,
  disabled = false,
}: SwitchProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer print:hidden">
      <input
        type="checkbox"
        className="sr-only peer"
        disabled={disabled}
        onChange={() => {
          if (!disabled) {
            onSwitch(switched);
          }
        }}
        checked={switched}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray"></div>
      <span className="ml-3 text-sm font-medium uppercase">{label}</span>
    </label>
  );
};

const CvSwitch = ({
  onSwitch,
}: {
  onSwitch?: (isSwitched: boolean) => void;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const [switched, setSwitched] = useState(pathName !== "/cv");

  const handleChange = (isSwitched: boolean) => {
    setSwitched((prev) => !prev);
    if (onSwitch) {
      onSwitch(!isSwitched);
    }

    if (!isSwitched) {
      router.back();
      return;
    }

    router.push("/cv");
  };

  return (
    <Switch
      onSwitch={handleChange}
      switched={switched}
      label="Toggle timeline mode"
    />
  );
};

export default CvSwitch;
