import Image from "next/image";
import { ClientDate } from "./ClientDate";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { AddTipTap, RichTextEditor } from "./Tiptap";
import { LoadMoreBtn } from "./LoadMoreBtn";

const TinyThoughtsListItem = ({
  tinyThought,
}: {
  tinyThought: tinyThought;
}) => {
  return (
    <article className="mx-auto max-w-xl border-[1px] p-4 flex">
      <div>
        <section className="mb-4 flex items-center justify-between">
          <div>
            <Image
              className="rounded-full mr-3 self-start inline-block"
              src={profilePhoto}
              alt="Nikola Mitic profile photo"
              width={40}
            />
            <span className="text-gray-500">
              <ClientDate date={tinyThought.createdAt} />
            </span>
          </div>
        </section>
        <section className="prose prose-invert max-w-none">
          <RichTextEditor
            initialContent={tinyThought.content}
            id={tinyThought.id}
          />
        </section>
      </div>
    </article>
  );
};

const TinyThoughtsList = ({
  tinyThoughts,
  isLoggedIn,
  showLoadMoreBtn,
}: {
  tinyThoughts: tinyThought[];
  isLoggedIn: boolean;
  showLoadMoreBtn: boolean;
}) => {
  return (
    <div>
      {isLoggedIn ? (
        <div className=" mb-6">
          <AddTipTap />
        </div>
      ) : null}

      {tinyThoughts.map((tinyThought) => {
        return (
          <TinyThoughtsListItem
            key={tinyThought.id}
            tinyThought={tinyThought}
          />
        );
      })}

      {showLoadMoreBtn && <LoadMoreBtn />}
    </div>
  );
};

export default TinyThoughtsList;
