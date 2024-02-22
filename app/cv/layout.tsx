"use client";

import { GraphQLClient, gql } from "graphql-request";
import { AnimatePresence } from "framer-motion";
import CvSwitch from "../../components/CvSwitch";
import TimeLine from "../../components/Timeline/Timeline";
import { markdown } from "../../utils/getMarkdown";
import { JobsData } from "../../types/cv";
import { DownloadCvLink } from "../../components/DownloadCv";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

export type jobType = {
  startDate: string;
  slug: string;
  themeColor: string;
  companyName: string;
};

export type jobsType = markdown<jobType>[];

const CvLayout = async (param: { children: React.ReactNode }) => {
  const query = gql`
    query GetJobsForTimeLine {
      jobs(orderBy: startDate_ASC) {
        companyName
        endDate
        startDate
        themeColor {
          hex
        }
        logo {
          url
        }
        slug
      }
    }
  `;

  const data: JobsData = await client.request(query);

  return (
    <AnimatePresence>
      <section className=" mb-auto">
        <div className=" mb-5 sm:mb-10">
          <CvSwitch />
        </div>
        <div className=" mb-5 sm:mb-10">
          <DownloadCvLink />
        </div>
        <div className="grid sm:grid-cols-[auto,1fr] gap-3 lg:flex lg:flex-col">
          <div className="lg:mb-28 sticky top-0 z-10">
            <TimeLine jobs={data.jobs} />
          </div>
          {param?.children ? param.children : null}
        </div>
      </section>
    </AnimatePresence>
  );
};

export default CvLayout;
