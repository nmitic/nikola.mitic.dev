"use client";

import Markdown from "markdown-to-jsx";
import cn from "classnames";
import { Job } from "../types/cv";
import LocationIcon from "../public/location-icon.svg";
import DateIcon from "../public/date-icon.svg";
import LinkIcon from "../public/link-icon.svg";
import { formatDate } from "../utils/formatDate";

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
    projectManagement,
    teamMembersJobTitles,
    jobProjects,
  },
}: {
  job: Job;
}) => {
  const shouldMakeTextColorWhite = hex !== "#ffffff";

  return (
    <article
      className="prose prose-invert mx-auto"
      style={{
        color: `${hex}`,
      }}
      key="job-article"
    >
      <div className="bg-current inline-block p-4 rounded-xl float-left mr-4 mb-4 w-full md:w-auto relative z-0 break-inside-avoid">
        <div
          className={cn(" text-black text-2xl mb-5", {
            "text-white": shouldMakeTextColorWhite,
          })}
        >
          {companyName}
        </div>
        <div
          className={cn(" text-black", {
            "text-white": shouldMakeTextColorWhite,
          })}
        >
          <LocationIcon className="inline-block align-middle w-6 h-6 fill-current mr-2 mb-2" />
          <span>{location}</span>
        </div>
        {companyWebsite && (
          <a
            href={companyWebsite}
            className={cn(" text-black", {
              "text-white": shouldMakeTextColorWhite,
            })}
          >
            <LinkIcon className="inline-block align-middle w-6 h-6 fill-current mr-2 mb-2" />

            {companyWebsite}
          </a>
        )}
        <div
          className={cn(" text-black", {
            "text-white": shouldMakeTextColorWhite,
          })}
        >
          <DateIcon className="inline-block align-middle w-6 h-6 mr-2 mb-2" />
          {formatDate(startDate)} - {endDate ? formatDate(endDate) : "Current"}
        </div>
      </div>
      <h1 className="text-current">{title}</h1>

      <Markdown className="text-white">{markdown}</Markdown>
      <div className="text-white">
        {techStackTools.map((item) => (
          <span className=" bg-gray-400 text-white inline-block mr-2 mb-2 p-1 rounded-md">
            {item}
          </span>
        ))}
      </div>
      {jobProjects.length ? (
        <>
          <h2
            style={{
              color: `${hex}`,
            }}
          >
            Projects:{" "}
          </h2>
          <ol>
            {jobProjects.map((project, index) => {
              return (
                <li>
                  <h4
                    style={{
                      color: `${hex}`,
                    }}
                  >
                    {project.title}
                  </h4>
                  <Markdown className="text-white">
                    {project.content.markdown}
                  </Markdown>
                </li>
              );
            })}
          </ol>
        </>
      ) : null}
      {teamMembersJobTitles.length ? (
        <div className="text-white text-lg">
          <h3
            style={{
              color: `${hex}`,
            }}
          >
            Team size and roles:{" "}
          </h3>
          <ul>
            {teamMembersJobTitles.map((role) => (
              <li>{role}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {projectManagement ? (
        <div className="text-white text-lg">
          <h3
            style={{
              color: `${hex}`,
            }}
            className=" inline-block"
          >
            Project Management:{" "}
          </h3>{" "}
          {projectManagement}
        </div>
      ) : null}
      <div className="text-white text-lg">
        <h3
          style={{
            color: `${hex}`,
          }}
          className=" inline-block"
        >
          Industry:
        </h3>{" "}
        {industry}
      </div>
    </article>
  );
};
