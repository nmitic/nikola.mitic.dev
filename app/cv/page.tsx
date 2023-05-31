import Markdown from "markdown-to-jsx";
import Image from "next/image";
import ProfilePicture from "../../public/cv_photo_nikola_mitic.jpeg";
import { getAllJobsAndSortThemByStartDate } from "./utils";
import { DownloadCvLink } from "../../components/DownloadCv";

const contactEmail = "nikola.mitic.dev@gmail.com";

const CvPage = () => {
  const jobs = getAllJobsAndSortThemByStartDate();

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
        {jobs.map((job) => (
          <article className="prose prose-invert">
            <Markdown>{job.content}</Markdown>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CvPage;
