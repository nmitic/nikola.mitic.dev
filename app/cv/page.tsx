import Image from "next/image";
import ProfilePicture from "../../public/cv_photo_nikola_mitic.jpeg";
import { DownloadCvLink } from "../../components/DownloadCv";
import { GraphQLClient, gql } from "graphql-request";
import { JobsData } from "../../types/cv";
import { JobView } from "../../components/JobView";

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
        themeColor {
          hex
        }
      }
    }
  `;

  const data: JobsData = await client.request(query);

  return (
    <section className="md:grid md:grid-cols-6 gap-5">
      <aside className="flex items-center flex-col mb-5  col-span-2">
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
      <div className=" col-span-4">
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
