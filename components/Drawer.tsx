"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import cn from "classnames";

export const Drawer = ({
  children,
  setIsOpen,
  isOpen,
}: {
  children: React.ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    // Attach the event listener
    document.addEventListener("keydown", handleEsc);

    // Clean up the event listener
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          " fixed top-0 left-0 transition-all ease-in-out w-screen h-screen -z-10 ",
          {
            [" z-50 backdrop-blur-sm"]: isOpen,
          }
        )}
      />
      <div
        className={cn(
          " transition-transform ease-in-out translate-x-[35vw] fixed z-50 w-[35vw] bg-black border-[0.5px] border-gray-500 top-0 bottom-0 right-0 rounded-tl-xl rounded-bl-2xl p-6",
          {
            ["translate-x-0"]: isOpen,
          }
        )}
      >
        {children}
      </div>
    </>
  );
};
