import { GraphQLClient, gql } from "graphql-request";
import {
  JobData,
  SplitTestingsData,
  JobWithSplitTesting,
  Job,
} from "../../../types/cv";
import { JobView } from "../../../components/JobView";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const JobPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const querySPLIT_TESTINGS = gql`
    query GetSplitTestings {
      splitTestings {
        id
        name
        enableSplitTesting
        splittingTestingResource {
          id
        }
      }
    }
  `;
  const queryJOB = gql`
    query GetJobBySlug($slug: String) {
      job(where: { slug: $slug }) {
        id
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
        splitTesting {
          variantName
          weight
          variantResource {
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
          }
        }
      }
    }
  `;
  const data: JobData<JobWithSplitTesting> = await client.request(queryJOB, {
    slug,
  });
  const splitTestingData: SplitTestingsData = await client.request(
    querySPLIT_TESTINGS,
    { slug }
  );
  const hasRunningSplitTest = splitTestingData.splitTestings.some(
    (item) =>
      item.enableSplitTesting &&
      item.splittingTestingResource.id === data.job.id
  );

  const JobData = hasRunningSplitTest
    ? data.job.splitTesting[0].variantResource
    : data.job;

  return (
    <section>
      <JobView job={JobData} />
    </section>
  );
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
  }: JobData<Job> = await client.request(query, { slug });

  return {
    title: `Nikola Mitic - ${companyName} - ${location} - ${title} - ${industry}`,
    description: `See Nikola Mitic experiance at ${companyName}, ${location} for the job role ${title}, where he worked from ${startDate} until ${endDate}`,
  };
};

export const dynamicParams = false;
