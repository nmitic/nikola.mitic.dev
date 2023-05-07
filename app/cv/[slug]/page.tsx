import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import { getAllMarkdowns } from "../../../utils/getMarkdown";

const getJob = (slug: string) => {
  const folder = "jobs";
  const file = `${folder}/${slug}.md`;

  return matter(fs.readFileSync(file, "utf8"));
};

const JobPage = (props: any) => {
  const slug = props.params.slug;
  const post = getJob(slug);

  return (
    <article className="prose dark:prose-invert">
      <Markdown>{post.content}</Markdown>
    </article>
  );
};

export const generateStaticParams = async () => {
  const jobs = getAllMarkdowns("jobs/");

  return jobs.map(({ data: { slug } }) => ({ slug: slug }));
};

export default JobPage;
