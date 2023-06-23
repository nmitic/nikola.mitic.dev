"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";

export const CookieSetter = ({
  name,
  value,
  enabled,
}: {
  name: string;
  value: string;
  enabled: boolean;
}) => {
  useEffect(() => {
    if (enabled) {
      Cookies.set(name, value, {
        expires: 7,
      });
    } else {
      Cookies.remove(name);
    }
  }, [enabled]);
  return null;
};
