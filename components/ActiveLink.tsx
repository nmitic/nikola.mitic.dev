"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({
  children,
  ...rest
}: { children: (isActive: boolean) => React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <Link {...rest} className={isActive ? "activeLink" : ""}>
      {children(isActive)}
    </Link>
  );
};

export default ActiveLink;
