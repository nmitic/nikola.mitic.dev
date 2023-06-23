import { GraphQLClient, gql } from "graphql-request";
import {
  JobData,
  SplitTestingsData,
  JobWithSplitTesting,
  Job,
} from "../../../types/cv";
import { JobView } from "../../../components/JobView";

type WeightedObject<T> = {
  weight: number;
  value: T;
};

function getRandomItem<T>(weightedArray: WeightedObject<T>[]): T | null {
  const totalWeight = weightedArray.reduce((sum, item) => sum + item.weight, 0);
  let randomValue = Math.random() * totalWeight;

  for (const item of weightedArray) {
    randomValue -= item.weight;
    if (randomValue <= 0) {
      return item.value;
    }
  }

  return null;
}

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const JobPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const querySPLIT_TESTINGS = gql`
    query GetSplitTestings($id: ID) {
      splitTestings(where: { resource: { id: $id } }) {
        id
        name
        enableSplitTesting
      }
    }
  `;
  const queryJOB = gql`
    query GetJobBySlug($slug: String) {
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
    { id: data.job.id }
  );

  const hasSplitTestRunning =
    splitTestingData.splitTestings[0]?.enableSplitTesting;

  console.log({ hasSplitTestRunning });

  const variants: WeightedObject<Job>[] = [
    { weight: data.job.originalVariantWeight, value: data.job },
    ...data.job.splitTesting.map((item) => ({
      weight: item.weight,
      value: item.variantResource,
    })),
  ];

  const randomizedJobContent = getRandomItem(variants);

  console.log({ randomizedJobContent });

  return (
    <section>
      <JobView job={randomizedJobContent} />
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
