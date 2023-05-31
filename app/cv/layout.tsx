import CvSwitch from "../../components/CvSwitch/CvSwitch";
import TimeLine from "../../components/Timeline/Timeline";
import { markdown } from "../../utils/getMarkdown";
import { getAllJobsAndSortThemByStartDate } from "./utils";

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
    <section className="h-full">
      <div>
        <CvSwitch />
      </div>
      <div className="grid grid-cols-[auto,1fr] md:flex flex-col gap-3 mt-5">
        <TimeLine jobs={jobs} />
        {children}
      </div>
    </section>
  );
};

export default CvLayout;
