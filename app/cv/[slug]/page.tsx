import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import { getAllMarkdowns } from "../../../utils/getMarkdown";
import { DownloadCvLink } from "../../../components/DownloadCv";

const getJob = (slug: string) => {
  const folder = "jobs";
  const file = `${folder}/${slug}.md`;

  return matter(fs.readFileSync(file, "utf8"));
};

const JobPage = (props: any) => {
  const slug = props.params.slug;
  const job = getJob(slug);

  return (
    <section className="md:flex md:flex-row">
      <div>
        <div className="md:sticky md:top-5 mb-4">
          <DownloadCvLink />
        </div>
      </div>
      <article className="prose prose-invert mx-auto">
        <Markdown>{job.content}</Markdown>
      </article>
    </section>
  );
};

export const generateStaticParams = async () => {
  const jobs = getAllMarkdowns("jobs/");

  return jobs.map(({ data: { slug } }) => ({ slug: slug }));
};

export default JobPage;
