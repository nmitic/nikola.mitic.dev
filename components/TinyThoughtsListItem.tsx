"use client";

import { ClientDate } from "./ClientDate";
import Image from "next/image";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { useSession } from "next-auth/react";

import RichTextEditor from "./RichTextEditor";

export const TinyThoughtsListItem = ({
  tinyThought,
}: {
  tinyThought: tinyThought;
}) => {
  const { data: session } = useSession();

  const isLoggedIn = !!session;

  return (
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
        <section className="prose prose-invert max-w-none mb-4">
          <RichTextEditor
            readOnly={!isLoggedIn}
            initialValue={tinyThought.content.raw.children}
          />
        </section>
        <button
          className=" border-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
          onClick={() => {}}
        >
          SAVE
        </button>
      </div>
    </article>
  );
};
