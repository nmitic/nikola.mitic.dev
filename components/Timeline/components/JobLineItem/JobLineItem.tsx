"use client";

import Image from "next/image";
import cn from "classnames";
import ActiveLink from "../../../ActiveLink";

const JobLineItem = ({
  date,
  offset,
  companyName,
  themeColor,
  slug,
  companyLogoSrc,
}: {
  date: string;
  slug: string;
  offset: number;
  companyName: string;
  themeColor: string;
  companyLogoSrc: string;
}) => {
  return (
    <div className="md:absolute mb-3" style={{ left: `${offset}%` }}>
      <ActiveLink href={`/cv/${slug}`}>
        {(isActive: boolean) => {
          return (
            <div
              style={{
                color: `${isActive ? `${themeColor}` : "white"}`,
              }}
              className={cn(
                "relative md:bg-transparent text-current rounded-2xl text-xs md:text-lg md:flex-col items-center w-[60px] h-[60px] flex justify-center md:justify-normal",
                {
                  ["bg-current"]: isActive,
                }
              )}
            >
              <div
                className={cn(
                  "md:absolute md:top-[-65px] md:invert-0 transition-all md:text-center hidden md:block",
                  {
                    ["invert md:top-[-85px]"]: isActive,
                  }
                )}
              >
                {date}
              </div>
              <div
                className={cn(
                  "md:absolute md:top-[50px] md:invert-0 md:text-center hidden md:block",
                  {
                    ["invert md:top-[70px]"]: isActive,
                  }
                )}
              >
                {companyName}
              </div>

              <Image
                src={companyLogoSrc}
                alt={`logo of company for the job ${companyName}`}
                width={35}
                height={35}
                className={cn(
                  "rounded-full transition-all md:border-none mt-2 md:mt-0",
                  {
                    ["md:scale-[1.8] border-black border-[3px] mt-0"]: isActive,
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
