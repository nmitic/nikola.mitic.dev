"use client";

import Image from "next/image";
import { ClientDate } from "./ClientDate";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { useEffect, useRef, useState } from "react";
import { getTinyThoughtsData } from "../app/tiny_thoughts/data_getters";
import Tiptap, { AddTipTap } from "./Tiptap";
import Markdown from "markdown-to-jsx";
import EditIcon from "../public/edit-icon.svg";

const LIMIT = 6;

function useOnScreen(ref: React.RefObject<HTMLElement>) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const stopObserving = () => {
    observerRef.current?.disconnect();
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if (ref.current) {
      observerRef.current?.observe(ref.current);
    }

    return () => {
      stopObserving();
    };
  }, [ref]);

  return { isOnScreen, stopObserving };
}

const TinyThoughtsListItem = ({
  tinyThought,
  isLoggedIn,
  setData,
}: {
  tinyThought: tinyThought;
  isLoggedIn: boolean;
  setData: React.Dispatch<React.SetStateAction<tinyThought[]>>;
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

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
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            <EditIcon className=" w-6 h-6" />
          </button>
        </section>
        {isLoggedIn ? (
          <Tiptap
            initialContent={tinyThought.content}
            id={tinyThought.id}
            updateTT={setData}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          <section className="prose prose-invert max-w-none">
            <Markdown className="text-white">
              {tinyThought.content.markdown}
            </Markdown>
          </section>
        )}
      </div>
    </article>
  );
};

const TinyThoughtsList = ({
  tinyThoughts,
  isLoggedIn,
}: {
  tinyThoughts: tinyThought[];
  isLoggedIn: boolean;
}) => {
  const [data, setData] = useState<tinyThought[]>(tinyThoughts);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLElement>(null);
  const { isOnScreen, stopObserving } = useOnScreen(observerTarget);

  useEffect(() => {
    if (isOnScreen) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isOnScreen]);

  useEffect(() => {
    getTinyThoughtsData(page, LIMIT)
      .then(
        ({
          data: {
            tinyThoughts: tinyThoughtsData,
            tinyThoughtsConnection: {
              aggregate: { count },
            },
          },
        }) => {
          setData((prevData) => [...prevData, ...tinyThoughtsData]);

          const endReached = page == Math.ceil(count / LIMIT);

          if (endReached) {
            stopObserving();
          }
        }
      )
      .catch((e) => console.log(e));
  }, [page]);

  return (
    <div>
      {isLoggedIn ? (
        <div className=" mb-6">
          <AddTipTap updateTT={setData} />
        </div>
      ) : null}

      {data.map((tinyThought) => {
        return (
          <TinyThoughtsListItem
            tinyThought={tinyThought}
            isLoggedIn={isLoggedIn}
            setData={setData}
          />
        );
      })}
      <div ref={observerTarget as React.RefObject<HTMLDivElement>} />
    </div>
  );
};

export default TinyThoughtsList;
