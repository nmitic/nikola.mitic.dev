import Markdown from "markdown-to-jsx";
import { GraphQLClient, gql } from "graphql-request";
import { DownloadCvLink } from "../../../components/DownloadCv";
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
      }
    }
  `;
  const data: JobData = await client.request(query, { slug });

  return (
    <section className="md:flex md:flex-row">
      <div>
        <div className="md:sticky md:top-5 mb-4">
          <DownloadCvLink />
        </div>
      </div>
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
