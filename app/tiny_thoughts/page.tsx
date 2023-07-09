import { Metadata } from "next";
import Image from "next/image";
import { gql } from "graphql-request";
import Markdown from "markdown-to-jsx";

import coverPhoto from "../../public/cover_photo.jpeg";
import profilePhoto from "../../public/profile_photo.jpeg";
import emailIcon from "../../public/email-icon.svg?url";
import workIcon from "../../public/work-icon.svg?url";
import locationIcon from "../../public/location-icon.svg?url";
import linkIcon from "../../public/link-icon.svg?url";
import { tinyThoughtsData } from "../../types/tt";
import { ClientDate } from "../../components/ClientDate";

const TinyThoughts = async () => {
  const query = gql`
    query TinyThoughtsQuery {
      tinyThoughts(orderBy: createdAt_DESC) {
        id
        createdAt
        content {
          markdown
        }
      }
    }
  `;
  const response = await fetch(
    process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
      next: {
        revalidate: 0,
      },
    }
  );
  const {
    data: { tinyThoughts },
  }: { data: tinyThoughtsData } = await response.json();

  return (
    <div className="container max-w-3xl mx-auto">
      <div className="sticky top-0 z-10 bg-black/60 backdrop-blur-sm">
        <section className="px-4 py-2 flex flex-col">
          <span className="fullName text-2xl">Nikola Mitic</span>
          <span className="text-sm text-slate-500">
            {tinyThoughts.length} thoughts
          </span>
        </section>
      </div>
      <div>
        <div className="relative">
          <Image
            className="object-cover max-h-96 rounded-lg"
            src={coverPhoto}
            alt="Nikola Mitic cover photo"
            placeholder="blur"
            priority
          />
          <Image
            className="border-solid border-4 border-black rounded-full absolute left-3 md:left-6 bottom-[-50px] md:bottom-[-75px] w-[100px] md:w-[150px]"
            src={profilePhoto}
            alt="Nikola Mitic profile photo"
            placeholder="blur"
            priority
          />
        </div>
      </div>
      <div className="contact sticky top-0 z-50 flex justify-end py-4 items-center mb-4">
        <a
          href="mailto:nikola.mitic.dev@gmail.com"
          className="mr-2 hover:opacity-90"
        >
          <Image src={emailIcon} alt="email icon" width={30} />
        </a>
        <button className="bg-white hover:opacity-90 transition-opacity text-black font-bold py-2 px-4 rounded-full">
          Subscribe
        </button>
      </div>
      <div className="mb-5 md:mb-10">
        <span className="text-3xl block">Nikola Mitic</span>
        <span className="block mb-10 text-gray-500">@nmitic</span>
        <p className="text mb-2">
          Greetings! I'm Nikola, also known as Niko to my wife and Johney to my
          family. Feel free to choose your own moniker for me. Here, I present a
          collection of my random thoughts, providing an opportunity for you to
          discover more about me beyond my work as a UI developer. Rest assured,
          these thoughts are entirely my own!
        </p>
        <div className="meta py-4">
          <Image
            src={workIcon}
            alt="work icon"
            className="inline-block align-middle mr-2"
          />
          <span className="occupation mr-3">UI developer</span>
          <Image
            src={locationIcon}
            alt="work icon"
            className="inline-block align-middle mr-2"
          />
          <span className="mr-3">Berlin</span>
          <Image
            src={linkIcon}
            alt="work icon"
            className="inline-block align-middle mr-2"
          />
          <span className="web mr-3">
            <a href="https://nikola-mitic.dev/">nikola-mitic.dev</a>
          </span>
        </div>
      </div>
      {tinyThoughts.map((tinyThought) => (
        <article className="mx-auto max-w-xl border-[1px] p-4 flex">
          <Image
            className="rounded-full mr-3 self-start"
            src={profilePhoto}
            alt="Nikola Mitic profile photo"
            width={40}
          />
          <div>
            <section className="mb-4">
              <span className="text-white text-xl">Nikola Mitic </span>
              <span className="text-gray-500">@nmitic - </span>
              <span className="text-gray-500">
                <ClientDate date={tinyThought.createdAt} />
              </span>
            </section>
            <section className="prose prose-invert max-w-none">
              <Markdown className="text-white">
                {tinyThought.content.markdown}
              </Markdown>
            </section>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TinyThoughts;

export const metadata: Metadata = {
  title: "Nikola Mitic - Senior Frontend Developer",
  description:
    "Discover more about who Nikola is as a person outside of web development by browsing his tiny thoughts and picking his brain.",
};
