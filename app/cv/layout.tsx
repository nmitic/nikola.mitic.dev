import { getAllMarkdowns } from "../../utils/getMarkdown";
import styles from "./cv.module.css";
import ActiveLink from "../../components/ActiveLink";

const JobCircle = ({
  date,
  offset,
  title,
}: {
  date: string;
  offset: number;
  title: string;
}) => {
  return (
    <div className={styles.circle} style={{ left: `${offset}%` }}>
      <div className={styles.date}>{date}</div>
      <div>{title}</div>
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

const firstJobStartDate = "2013-03";
const lastJobEndDate = "2023-03";

const CvLayout = ({ children }: { children: React.ReactNode }) => {
  const jobs = getAllMarkdowns("jobs");

  return (
    <section className={styles.cvWrapper}>
      {<article className={styles.jobPost}>{children}</article>}
      <div className={styles.line}>
        {jobs.map(({ data: { startDate, slug, title } }) => (
          <ActiveLink href={`/cv/${slug}`}>
            <JobCircle
              date={startDate}
              title={title}
              offset={getAmountSpentBetweenTwoDatesInPercentage(
                firstJobStartDate,
                lastJobEndDate,
                startDate
              )}
            />
          </ActiveLink>
        ))}
      </div>
    </section>
  );
};

export default CvLayout;
