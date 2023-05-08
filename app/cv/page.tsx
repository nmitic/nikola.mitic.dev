import Markdown from "markdown-to-jsx";
import Image from "next/image";
import ProfilePicture from "../../public/cv_photo_nikola_mitic.jpeg";
import { getAllJobsAndSortThemByStartDate } from "./utils";

const contactEmail = "nikola.mitic.dev@gmal.com";

const CvPage = () => {
  const jobs = getAllJobsAndSortThemByStartDate();

  return (
    <section>
      <div className="grid md:grid-cols-[auto,1fr] gap-6 mt-5">
        <aside className="flex items-center flex-col">
          <div className="sticky top-5">
            <Image
              src={ProfilePicture}
              alt="Nikola Mitic profile picture"
              className="rounded-full mb-4"
              width={240}
              height={240}
            />
            <p className="font-mono text-3xl uppercase">Nikola Mitic</p>
            <p>Berlin, Germany</p>
            <a className="hover:underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
        </aside>
        <div>
          {jobs.map((job) => (
            <article className="prose prose-invert">
              <Markdown>{job.content}</Markdown>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CvPage;
