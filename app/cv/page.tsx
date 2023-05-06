import { getMarkdown } from "../../utils/getMarkdown";
import styles from "./cv.module.css";

const JobCircle = ({ date, offset }: { date: string; offset: number }) => {
  return (
    <div className={styles.circle} style={{ left: `${offset}%` }}>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

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

const Cv = () => {
  const jobs = getMarkdown("jobs");

  return (
    <section className={styles.cvWrapper}>
      <div className={styles.line}>
        {jobs.map(({ data: { startDate } }) => (
          <JobCircle
            date={startDate}
            offset={getAmountSpentBetweenTwoDatesInPercentage(
              "2013-03",
              "2023-03",
              startDate
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Cv;
