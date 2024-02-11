import { Metadata } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { JobsData } from "../../types/cv";
import { JobView } from "../../components/JobView";
import { CvInfo } from "../../components/CvInfo";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const CvPage = async () => {
  const query = gql`
    query GetJobs {
      jobs(orderBy: startDate_DESC) {
        description {
          markdown
        }
        location
        companyName
        companyWebsite
        endDate
        title
        startDate
        industry
        techStackTools
        themeColor {
          hex
        }
        projectManagement
        jobProjects {
          ... on Post {
            id
            title
            content {
              markdown
            }
          }
        }
        teamMembersJobTitles
      }
    }
  `;

  const data: JobsData = await client.request(query);

  return (
    <section className="lg:grid lg:grid-cols-6 gap-5">
      <CvInfo />
      <div className=" lg:col-span-4">
        {data.jobs.map((job) => (
          <div className="border-b-2 mb-10 pb-10 last:border-b-0">
            <JobView job={job} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CvPage;

export const metadata: Metadata = {
  title: "Nikola Mitic - Senior Frontend Developer - CV download",
  description:
    "Discover the comprehensive professional journey of Nikola Mitic. Explore a rich portfolio of diverse experiences spanning 7 years in web development. Unlock the potential of collaborating with a seasoned professional to elevate your web development.",
};
