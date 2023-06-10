import { GraphQLClient, gql } from "graphql-request";
import { JobData } from "../../../types/cv";
import { JobView } from "../../../components/JobView";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const JobPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const query = gql`
    query GetJobBySlug($slug: String) {
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
      }
    }
  `;
  const data: JobData = await client.request(query, { slug });

  return (
    <section>
      <JobView job={data.job} />
    </section>
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

export const dynamicParams = false;
