"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";

export const CookieSetter = ({ name, value }: { name: string; value: any }) => {
  useEffect(() => {
    Cookies.set(name, value, {
      expires: 7,
    });
  }, []);
  return null;
};
