import Markdown from "markdown-to-jsx";
import Image from "next/image";
import ProfilePicture from "../../public/cv_photo_nikola_mitic.jpeg";
import { getAllJobsAndSortThemByStartDate } from "./utils";
import Link from "next/link";

const contactEmail = "nikola.mitic.dev@gmail.com";

const CvPage = () => {
  const jobs = getAllJobsAndSortThemByStartDate();

  return (
    <section>
      <div className="grid md:grid-cols-[auto,1fr] gap-6 mt-5">
        <aside className="flex items-center flex-col">
          <div className="sticky top-5 text-center">
            <Image
              src={ProfilePicture}
              alt="Nikola Mitic profile picture"
              className="rounded-full mb-4"
              width={240}
              height={240}
            />
            <p className="font-mono text-3xl uppercase">Nikola Mitic</p>
            <p>Berlin, Germany</p>
            <a
              className="hover:underline block mb-4"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
            <a
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow self-start"
              href="/nikola_mitic_cv.pdf"
              download="nikola_mitic_cv"
            >
              Download CV
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
