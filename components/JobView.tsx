import { Job } from "../types/cv";
import Markdown from "markdown-to-jsx";

export const JobView = ({
  job: {
    title,
    companyName,
    location,
    companyWebsite,
    startDate,
    endDate,
    description: { markdown },
    industry,
    techStackTools,
  },
}: {
  job: Job;
}) => {
  return (
    <article className="prose prose-invert mx-auto">
      <h1>{title}</h1>
      <h2>{companyName}</h2>
      <h3>{location}</h3>
      <a href={companyWebsite}>{companyWebsite}</a>
      <div>
        {new Date(startDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
        })}
        -
        {new Date(endDate).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
        })}
      </div>
      <article>
        <Markdown>{markdown}</Markdown>
      </article>
      <p>{industry}</p>
      <div>
        {techStackTools.map((item) => (
          <span>{item}, </span>
        ))}
      </div>
    </article>
  );
};
