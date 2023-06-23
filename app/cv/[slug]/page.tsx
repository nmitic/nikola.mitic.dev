import { GraphQLClient, gql } from "graphql-request";
import { cookies } from "next/headers";
import {
  JobData,
  SplitTestingsData,
  JobWithSplitTesting,
  Job,
} from "../../../types/cv";
import { JobView } from "../../../components/JobView";
import { CookieSetter } from "../../../components/CookieSetter";

type WeightedObject<T> = {
  weight: number;
  value: T;
};

function getRandomItem<T>(weightedArray: WeightedObject<T>[]): T {
  const totalWeight = weightedArray.reduce((sum, item) => sum + item.weight, 0);
  let randomValue = Math.random() * totalWeight;

  for (const item of weightedArray) {
    randomValue -= item.weight;
    if (randomValue <= 0) {
      return item.value;
    }
  }

  // If the loop completes without returning a value, we can assume the array is empty.
  throw new Error("Weighted array is empty");
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
  const data: JobData<JobWithSplitTesting> = await client.request(queryJOB, {
    slug,
  });
  const splitTestingData: SplitTestingsData = await client.request(
    querySPLIT_TESTINGS,
    { id: data.job.id }
  );

  const cookieStore = cookies();

  const hasSplitTestRunning =
    splitTestingData.splitTestings[0]?.enableSplitTesting;

  const variants: WeightedObject<Job>[] = [
    { weight: data.job.originalVariantWeight, value: data.job },
    ...data.job.splitTesting.map((item) => ({
      weight: item.weight,
      value: item.variantResource,
    })),
  ];

  const cookieVariant = cookieStore.get(
    `split.test.${splitTestingData.splitTestings[0].id}`
  );

  const jobViewData = hasSplitTestRunning
    ? cookieVariant
      ? variants.find((item) => item.value.id === cookieVariant?.value)?.value
      : getRandomItem(variants)
    : data.job;

  if (!jobViewData) {
    return null;
  }
  return (
    <section>
      {hasSplitTestRunning ? (
        <CookieSetter
          name={`split.test.${splitTestingData.splitTestings[0].id}`}
          value={jobViewData.id}
        />
      ) : null}

      <JobView job={jobViewData} />
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
