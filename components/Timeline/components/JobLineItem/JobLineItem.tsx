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
    <div className="lg:absolute mb-3" style={{ left: `${offset}%` }}>
      <ActiveLink href={`/cv/${slug}`}>
        {(isActive: boolean) => {
          return (
            <div
              style={{
                color: `${isActive ? `${themeColor}` : "white"}`,
              }}
              className={cn(
                "relative lg:bg-transparent text-current rounded-2xl text-xs lg:text-lg lg:flex-col items-center w-[60px] h-[60px] flex justify-center lg:justify-normal",
                {
                  ["bg-current"]: isActive,
                }
              )}
            >
              <div
                className={cn(
                  "lg:absolute lg:top-[-65px] lg:invert-0 transition-all lg:text-center hidden lg:block",
                  {
                    ["invert lg:top-[-85px]"]: isActive,
                  }
                )}
              >
                {date}
              </div>
              <div
                className={cn(
                  "lg:absolute lg:top-[50px] lg:invert-0 lg:text-center hidden lg:block",
                  {
                    ["invert lg:top-[70px]"]: isActive,
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
                  "rounded-full transition-all lg:border-none lg:mt-0",
                  {
                    ["lg:scale-[1.8] border-black border-[3px]"]: isActive,
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
