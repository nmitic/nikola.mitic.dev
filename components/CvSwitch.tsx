"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Switch } from "./ui/Switch";

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
