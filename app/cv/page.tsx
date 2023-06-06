import Markdown from "markdown-to-jsx";
import Image from "next/image";
import ProfilePicture from "../../public/cv_photo_nikola_mitic.jpeg";
import { getAllJobsAndSortThemByStartDate } from "./utils";
import { DownloadCvLink } from "../../components/DownloadCv";
import { GraphQLClient, gql } from "graphql-request";
import { JobsData } from "../../types/cv";

const contactEmail = "nikola.mitic.dev@gmail.com";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const CvPage = async () => {
  const query = gql`
    query GetJobsForTimeLine {
      jobs {
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

  const data: JobsData = await client.request(query);

  return (
    <section className="md:grid md:grid-cols-[auto,1fr] gap-5 ">
      <aside className="flex items-center flex-col mb-5">
        <div className="sticky top-5 text-center">
          <Image
            src={ProfilePicture}
            alt="Nikola Mitic profile picture"
            className="rounded-full mb-4"
            width={240}
            height={240}
          />
          <p className="font-mono text-3xl uppercase">Nikola Mitić</p>
          <p>Berlin, Germany</p>
          <a
            className="hover:underline block mb-4"
            href={`mailto:${contactEmail}`}
          >
            {contactEmail}
          </a>
          <DownloadCvLink />
        </div>
      </aside>
      <div>
        {data.jobs.map(
          ({
            title,
            companyName,
            location,
            companyWebsite,
            endDate,
            startDate,
            description: { markdown },
            techStackTools,
            industry,
          }) => (
            <section className="md:flex md:flex-row mb-10 border-b-2 pb-10">
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
          )
        )}
      </div>
    </section>
  );
};

export default CvPage;
