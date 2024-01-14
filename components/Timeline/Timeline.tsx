"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import JobLineItem from "./components/JobLineItem/JobLineItem";
import { formatDate } from "../../utils/formatDate";

const diffMonths = (date1: string, date2: string) => {
  return (
    (new Date(date2).getFullYear() - new Date(date1).getFullYear()) * 12 +
    (new Date(date2).getMonth() - new Date(date1).getMonth())
  );
};

const getAmountSpentBetweenTwoDatesInPercentage = (
  startDate: string,
  endDate: string,
  targetDate: string
) => {
  return Math.round(
    (diffMonths(startDate, targetDate) / diffMonths(startDate, endDate)) * 100
  );
};

const firstJobStartDate = "2013-03";
const lastJobEndDate = new Date().toLocaleDateString(undefined, {
  year: "numeric",
  month: "long",
});

const TimeLine = ({ jobs }: any) => {
  const pathName = usePathname();
  const listRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    if (listRef) {
      const element = listRef.current;
      if (element) {
        element.scrollLeft = element.clientWidth - element.scrollWidth;
      }
    }
  }, []);

  return (
    <motion.nav
      key="timeline"
      initial={{ opacity: 0, scale: 1.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      className="top-0 overflow-scroll sm:overflow-visible sticky sm:static bg-black py-2 z-10 lg:relative"
    >
      <div className="w-full absolute hidden lg:bg-white lg:block lg:top-[125px] lg:h-[2px]"></div>

      <ul
        ref={listRef}
        className="flex flex-row-reverse overflow-auto sm:flex-col-reverse sm:sticky sm:top-0 w-[calc(100vw-2rem)] sm:w-auto lg:h-[200px] lg:flex lg:items-center lg:static lg:flex-row"
      >
        {jobs.map(
          ({
            startDate,
            slug,
            themeColor,
            companyName,
            logo: { url: companyLogoSrc },
          }: any) => {
            return (
              <li className="mr-auto">
                <JobLineItem
                  companyLogoSrc={companyLogoSrc}
                  slug={slug}
                  date={formatDate(startDate)}
                  themeColor={themeColor.hex}
                  companyName={companyName}
                  offset={getAmountSpentBetweenTwoDatesInPercentage(
                    firstJobStartDate,
                    lastJobEndDate,
                    startDate
                  )}
                />
              </li>
            );
          }
        )}
      </ul>
    </motion.nav>
  );
};

export default TimeLine;
