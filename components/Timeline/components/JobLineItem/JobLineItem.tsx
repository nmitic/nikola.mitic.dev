"use client";

import { COMPANY_TO_LOGO } from "../../../../static-data/company-to-logo-map";
import styles from "./JobLineItem.module.css";
import Image from "next/image";
import cn from "classnames";
import ActiveLink from "../../../ActiveLink";

const JobLineItem = ({
  date,
  offset,
  companyName,
  themeColor,
  slug,
}: {
  date: string;
  slug: string;
  offset: number;
  companyName: string;
  themeColor: string;
}) => {
  const companyLogoSrc =
    COMPANY_TO_LOGO[companyName as keyof typeof COMPANY_TO_LOGO];

  return (
    <div
      className="md:absolute mb-3"
      style={{ left: `${offset}%` }}
      // style={{ left: `${offset}%`, color: `#${themeColor}` }}
    >
      <ActiveLink href={`/cv/${slug}`}>
        {(isActive: boolean) => {
          return (
            <div
              style={{
                color: `${isActive ? `#${themeColor}` : "white"}`,
              }}
              className={cn(
                "relative md:bg-transparent text-current rounded-2xl p-2 text-xs md:text-lg md:p-0",
                {
                  ["bg-current"]: isActive,
                }
              )}
            >
              <div
                className={cn(
                  "md:absolute md:top-[-55px] md:invert-0 transition-all",
                  {
                    ["invert md:top-[-75px]"]: isActive,
                  }
                )}
              >
                {date}
              </div>
              <div
                className={cn("md:absolute md:top-[50px] md:invert-0", {
                  ["invert md:top-[65px]"]: isActive,
                })}
              >
                {companyName}
              </div>

              <Image
                src={companyLogoSrc}
                alt={`logo of company for the job ${companyName}`}
                width={35}
                height={35}
                className={cn(
                  "rounded-full transition-all md:border-none md:translate-x-0 md:translate-y-0 mt-2 md:mt-0",
                  {
                    ["md:scale-[1.8] translate-x-[-15px] translate-y-[15px] border-black border-4 mt-0"]:
                      isActive,
                  }
                )}
              />
            </div>
          );
        }}
      </ActiveLink>
    </div>
  );
};

export default JobLineItem;
