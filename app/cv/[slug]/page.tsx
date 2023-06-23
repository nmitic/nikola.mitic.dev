import { GraphQLClient, gql } from "graphql-request";
import {
  JobData,
  SplitTestingsData,
  JobWithSplitTesting,
  Job,
} from "../../../types/cv";
import { JobView } from "../../../components/JobView";
import { CookieSetter } from "../../../components/CookieSetter";
import { SplitTestData } from "../classes";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const JobPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const Query = gql`
    query Query($slug: String) {
      splitTestings(where: { resource: { slug: $slug } }) {
        id
        name
        enableSplitTesting
      }
      job(where: { slug: $slug }) {
        originalVariantWeight
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
          }
        }
      }
    }
  `;
  const data: JobData<JobWithSplitTesting> = await client.request(Query, {
    slug,
  });

  const JobViewData = new SplitTestData(data);

  return (
    <section>
      <CookieSetter
        name={`split.test.${JobViewData.splitTestId}`}
        value={JobViewData.splitTestContent.id}
        enabled={JobViewData.hasSplitTestRunning}
      />

      <JobView job={JobViewData.splitTestContent} />
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
