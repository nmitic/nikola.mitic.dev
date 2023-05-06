import styles from "./cv.module.css";
// begging 1
// end 10
// input 4
// output (input/end)*100
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
  const jobCirclePositionOffset = getAmountSpentBetweenTwoDatesInPercentage(
    "2013-03",
    "2023-03",
    "2021-04"
  );
  console.log(jobCirclePositionOffset);
  return (
    <section className={styles.cvWrapper}>
      <div className={styles.line}>
        <JobCircle date="2016-02" offset={jobCirclePositionOffset} />
      </div>
    </section>
  );
};

export default Cv;
