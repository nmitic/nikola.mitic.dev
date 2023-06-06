import Markdown from "markdown-to-jsx";
import { GraphQLClient, gql } from "graphql-request";
import { DownloadCvLink } from "../../../components/DownloadCv";
import { JobData } from "../../../types/cv";

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
  const {
    job: {
      description: { markdown },
      companyName,
      location,
      companyWebsite,
      endDate,
      title,
      startDate,
      industry,
      techStackTools,
    },
  } = data;

  return (
    <section className="md:flex md:flex-row">
      <div>
        <div className="md:sticky md:top-5 mb-4">
          <DownloadCvLink />
        </div>
      </div>
      <article className="prose prose-invert mx-auto">
        <h1>{title}</h1>
        <h2>{companyName}</h2>
        <h3>{location}</h3>
        <a href={companyWebsite}>{companyWebsite}</a>
        <div>
          {new Date(startDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
          })}
          -
          {new Date(endDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
          })}
        </div>
        <article>
          <Markdown>{markdown}</Markdown>
        </article>
        <p>{industry}</p>
        <div>
          {techStackTools.map((item) => (
            <span>{item},</span>
          ))}
        </div>
      </article>
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
