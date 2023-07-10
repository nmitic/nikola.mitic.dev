"use client";

import Markdown from "markdown-to-jsx";
import { motion } from "framer-motion";
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
  },
}: {
  job: Job;
}) => {
  const shouldMakeTextColorWhite = hex !== "#ffffff";
  console.log(formatDate(endDate), endDate);
  return (
    <motion.article
      className="prose prose-invert mx-auto"
      style={{
        color: `${hex}`,
      }}
      initial={{ opacity: 0, scale: 1.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
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
      <p className="text-white text-lg font-bold">
        <span>Industry: </span>
        {industry}
      </p>
      <div className="text-white">
        {techStackTools.map((item) => (
          <span className=" bg-gray-400 text-white inline-block mr-2 mb-2 p-1 rounded-md">
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
};
