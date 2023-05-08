import { markdown } from "../../utils/getMarkdown";
import styles from "./layout.module.css";

export type jobType = {
  startDate: string;
  slug: string;
  themeColor: string;
  companyName: string;
};

export type jobsType = markdown<jobType>[];

const CvLayout = ({ children }: { children: React.ReactNode }) => {
  return <section className="h-full">{children}</section>;
};

export default CvLayout;
