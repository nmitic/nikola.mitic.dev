"use client";

import Markdown from "markdown-to-jsx";
import { ClientDate } from "./ClientDate";
import Image from "next/image";
import profilePhoto from "../public/profile_photo.jpeg";
import { useCallback, useState } from "react";
import { tinyThought } from "../types/tt";
import { useSession } from "next-auth/react";

import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const ParagraphElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component renderer for our code blocks.
const NumberedList = (props: any) => {
  return (
    <ol {...props.attributes}>
      {props.children.map((item: any) => (
        <li>{item}</li>
      ))}
    </ol>
  );
};

export const TinyThoughtsListItem = ({
  tinyThought,
}: {
  tinyThought: tinyThought;
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { data: session } = useSession();

  const [editor] = useState(() => withReact(createEditor()));

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "paragraph":
        return <ParagraphElement {...props} />;
      case "numbered-list":
        return <NumberedList>{props.children}</NumberedList>;
      default:
        return <ParagraphElement {...props} />;
    }
  }, []);

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
          {editMode ? (
            <div className="text-white">
              <Slate
                editor={editor}
                initialValue={tinyThought.content.raw.children}
              >
                <Editable renderElement={renderElement} />
              </Slate>
            </div>
          ) : (
            <Markdown className="text-white">
              {tinyThought.content.markdown}
            </Markdown>
          )}
        </section>
        {editMode ? (
          <button
            className=" border-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            onClick={() => setEditMode(false)}
          >
            SAVE
          </button>
        ) : (
          <button
            className=" border-2 px-4 py-1 hover:bg-white hover:text-black transition-colors"
            onClick={() => setEditMode(true)}
          >
            EDIT
          </button>
        )}
      </div>
    </article>
  );
};
