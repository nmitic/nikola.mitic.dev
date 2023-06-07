import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { Job } from "../types/cv";
import locationIcon from "../public/location-icon.svg?url";

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
    themeColor: { hex },
  },
}: {
  job: Job;
}) => {
  return (
    <article
      className="prose prose-invert mx-auto"
      style={{
        color: `${hex}`,
      }}
    >
      <h1 className="text-current">{title}</h1>
      <div className="bg-current inline-block p-4 rounded-xl float-left mr-4 mb-4 w-full md:w-auto">
        <div className="invert text-current text-2xl mb-3">{companyName}</div>
        <div className="invert text-current">
          <Image
            src={locationIcon}
            alt="location icon"
            className="inline-block fill-current align-middle"
          />
          <span>{location}</span>
        </div>
        <a
          href={companyWebsite}
          className="invert text-current hover:text-black transition-all"
        >
          {companyWebsite}
        </a>
        <div className="invert text-current">
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
      </div>
      <Markdown className="text-white">{markdown}</Markdown>
      <p className="text-white">{industry}</p>
      <div className="text-white">
        {techStackTools.map((item) => (
          <span>{item}, </span>
        ))}
      </div>
    </article>
  );
};
