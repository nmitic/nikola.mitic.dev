"use client";

import Image from "next/image";
import { ClientDate } from "./ClientDate";
import Markdown from "markdown-to-jsx";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { useState } from "react";
import { getTinyThoughtsData } from "../app/tiny_thoughts/date_getters";

const TinyThoughtsList = ({
  tinyThoughts,
}: {
  tinyThoughts: tinyThought[];
}) => {
  const [data, setData] = useState(tinyThoughts);
  const [page, setPage] = useState(0);

  return (
    <>
      {data.map((tinyThought) => (
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
      <button
        onClick={async () => {
          const {
            data: { tinyThoughts },
          } = await getTinyThoughtsData(page + 1);
          setPage(page + 1);
          setData([...data, ...tinyThoughts]);
        }}
      >
        Load more
      </button>
    </>
  );
};

export default TinyThoughtsList;
