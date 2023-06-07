import { GraphQLClient, gql } from "graphql-request";
import CvSwitch from "../../components/CvSwitch/CvSwitch";
import TimeLine from "../../components/Timeline/Timeline";
import { markdown } from "../../utils/getMarkdown";
import { JobsData } from "../../types/cv";

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

const CvLayout = async ({ children }: { children: React.ReactNode }) => {
  const query = gql`
    query GetJobsForTimeLine {
      jobs {
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
    <section className="h-full">
      <div>
        <CvSwitch />
      </div>
      <div className="grid sm:grid-cols-[auto,1fr] gap-3 lg:flex lg:flex-col">
        <TimeLine jobs={data.jobs} />

        {children}
      </div>
    </section>
  );
};

export default CvLayout;
