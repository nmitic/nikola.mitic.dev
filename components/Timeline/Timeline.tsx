"use client";

import styles from "./Timeline.module.css";
import ActiveLink from "../ActiveLink";
import JobLineItem from "./components/JobLineItem/JobLineItem";
import { jobsType } from "../../app/cv/layout";

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
  return (
    <nav>
      <ul className={styles.line}>
        {jobs.map(({ data: { startDate, slug, themeColor, companyName } }) => (
          <li>
            <ActiveLink href={`/cv/${slug}`}>
              {(isActive: boolean) => {
                return (
                  <JobLineItem
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
                    isActive={isActive}
                  />
                );
              }}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TimeLine;
