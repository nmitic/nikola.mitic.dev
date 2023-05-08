import { markdown } from "../../../utils/getMarkdown";
import styles from "./layout.module.css";
import TimeLine from "../../../components/Timeline/Timeline";
import { getAllJobsAndSortThemByStartDate } from "../utils";

export type jobType = {
  startDate: string;
  slug: string;
  themeColor: string;
  companyName: string;
};

export type jobsType = markdown<jobType>[];

const CvLayout = ({ children }: { children: React.ReactNode }) => {
  const jobs = getAllJobsAndSortThemByStartDate();

  return (
    <section className={styles.cvWrapper}>
      <TimeLine jobs={jobs} />
      {<article className={styles.jobPost}>{children}</article>}
    </section>
  );
};

export default CvLayout;
