import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import { getAllMarkdowns } from "../../../utils/getMarkdown";
import TimeLine from "../../../components/Timeline/Timeline";
import { getAllJobsAndSortThemByStartDate } from "../utils";
import CvSwitch from "../../../components/CvSwitch/CvSwitch";

const getJob = (slug: string) => {
  const folder = "jobs";
  const file = `${folder}/${slug}.md`;

  return matter(fs.readFileSync(file, "utf8"));
};

const JobPage = (props: any) => {
  const slug = props.params.slug;
  const job = getJob(slug);
  const jobs = getAllJobsAndSortThemByStartDate();

  return (
    <div>
      <CvSwitch checked={false} />
      <div className="grid grid-cols-[auto,1fr] md:flex flex-col gap-3 mt-5">
        <TimeLine jobs={jobs} />
        <article className="prose prose-invert mx-auto">
          <Markdown>{job.content}</Markdown>
        </article>
      </div>
    </div>
  );
};

export const generateStaticParams = async () => {
  const jobs = getAllMarkdowns("jobs/");

  return jobs.map(({ data: { slug } }) => ({ slug: slug }));
};

export default JobPage;
