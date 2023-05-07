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

  return (
    <section className={styles.cvWrapper}>
      <TimeLine jobs={jobs} />
      {<article className={styles.jobPost}>{children}</article>}
    </section>
  );
};

export default CvLayout;
