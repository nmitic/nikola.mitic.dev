"use client";

import ActiveLink from "../ActiveLink";
import JobLineItem from "./components/JobLineItem/JobLineItem";
import { jobsType } from "../../app/cv/types";
import { usePathname } from "next/navigation";

const diffMonths = (date1: string, date2: string) => {
  return (
    (new Date(date2).getFullYear() - new Date(date1).getFullYear()) * 12 +
    (new Date(date2).getMonth() - new Date(date1).getMonth())
  );
};

const getAmountSpentBetweenTwoDatesInPercentage = (
  startDate: string,
  endDate: string,
  targetData: string
) => {
  return Math.round(
    (diffMonths(startDate, targetData) / diffMonths(startDate, endDate)) * 100
  );
};

const firstJobStartDate = "2013-03";
const lastJobEndDate = "2023-03";

const TimeLine = ({ jobs }: { jobs: jobsType }) => {
  const pathName = usePathname();
  const shouldCollapse = pathName === "/cv";

  return (
    <nav className={`${shouldCollapse ? "hidden" : ""}`}>
      <div className="md:py-24 sticky top-0 md:static">
        <ul className="w-full relative">
          <div className="md:bg-white md:h-[2px] w-full top-[17px] absolute"></div>
          {jobs.map(
            ({ data: { startDate, slug, themeColor, companyName } }) => (
              <li>
                <JobLineItem
                  slug={slug}
                  date={new Date(startDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                  })}
                  themeColor={themeColor}
                  companyName={companyName}
                  offset={getAmountSpentBetweenTwoDatesInPercentage(
                    firstJobStartDate,
                    lastJobEndDate,
                    startDate
                  )}
                />
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TimeLine;
