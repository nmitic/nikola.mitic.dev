import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { Job } from "../types/cv";
import LocationIcon from "../public/location-icon.svg";
import DateIcon from "../public/date-icon.svg";
import LinkIcon from "../public/link-icon.svg";

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
      <div className="bg-current inline-block p-4 rounded-xl float-left mr-4 mb-4 w-full md:w-auto relative z-0">
        <div className="invert text-current text-2xl mb-5">{companyName}</div>
        <div className="invert text-current">
          <LocationIcon className="inline-block align-middle w-6 h-6 fill-current mr-2 mb-2" />
          <span>{location}</span>
        </div>
        {companyWebsite && (
          <a href={companyWebsite} className="invert text-current">
            <LinkIcon className="inline-block align-middle w-6 h-6 fill-current mr-2 mb-2" />

            {companyWebsite}
          </a>
        )}
        <div className="invert text-current">
          <DateIcon className="inline-block align-middle w-6 h-6 mr-2 mb-2" />
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
      <h1 className="text-current">{title}</h1>

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
