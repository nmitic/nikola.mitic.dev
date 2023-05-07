import { getAllMarkdowns, markdown } from "../../utils/getMarkdown";
import styles from "./layout.module.css";
import TimeLine from "../../components/Timeline/Timeline";

export type jobType = {
  startDate: string;
  slug: string;
  themeColor: string;
  companyName: string;
};

export type jobsType = markdown<jobType>[];

const CvLayout = ({ children }: { children: React.ReactNode }) => {
  const jobs = getAllMarkdowns("jobs") as jobsType;
  const sortedJobsByStartDate = jobs.sort(
    // using + as unary operator here to convert date into a number
    (a, b) => +new Date(b.data.startDate) - +new Date(a.data.startDate)
  );

  return (
    <section className={styles.cvWrapper}>
      <TimeLine jobs={sortedJobsByStartDate} />
      {<article className={styles.jobPost}>{children}</article>}
    </section>
  );
};

export default CvLayout;
