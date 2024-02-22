import { GraphQLClient, gql } from "graphql-request";
import { JobData } from "../../../types/cv";
import { JobView, JobViewMenu } from "../../../components/JobView";
import { Job } from "../../../types/cv";
import { CvInfo } from "../../../components/CvInfo";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const JobPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const query = gql`
    query GetJobBySlugAndHobs($slug: String) {
      job(where: { slug: $slug }) {
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
  const data: { job: Job; jobs: Job[] } = await client.request(query, { slug });

  return (
    <>
      <section className="print:hidden grid grid-cols-12">
        <div
          style={{
            color: `${data.job.themeColor.hex}`,
          }}
          className="col-span-3"
        >
          <div className="sticky top-[232px] hidden lg:block">
            <JobViewMenu />
          </div>
        </div>
        <div className=" col-span-12 lg:col-span-6">
          <JobView job={data.job} />
        </div>
      </section>
      <section className="lg:grid-cols-6 gap-5 hidden print:lg:grid">
        <CvInfo />
        <div className="lg:col-span-4">
          {data.jobs.map((job) => (
            <div className="border-b-2 mb-10 pb-10 last:border-b-0">
              <JobView job={job} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export const generateStaticParams = async () => {
  const query = gql`
    query Jobs {
      jobs {
        slug
      }
    }
  `;

  const data: { jobs: { slug: string }[] } = await client.request(query);

  return data.jobs.map((jobs) => ({ slug: jobs.slug }));
};

export default JobPage;

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const slug = params.slug;
  const query = gql`
    query GetJobBySlug($slug: String) {
      job(where: { slug: $slug }) {
        location
        companyName
        companyWebsite
        endDate
        title
        startDate
        industry
      }
    }
  `;
  const {
    job: {
      location,
      companyName,
      companyWebsite,
      endDate,
      title,
      startDate,
      industry,
    },
  }: JobData = await client.request(query, { slug });

  return {
    title: `Nikola Mitic - ${companyName} - ${location} - ${title} - ${industry}`,
    description: `See Nikola Mitic experiance at ${companyName}, ${location} for the job role ${title}, where he worked from ${startDate} until ${endDate}`,
  };
};
