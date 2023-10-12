"use client";

import Image from "next/image";
import { ClientDate } from "./ClientDate";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { useEffect, useRef, useState } from "react";
import { getTinyThoughtsData } from "../app/tiny_thoughts/data_getters";
import Tiptap, { AddTipTap } from "./Tiptap";
import Markdown from "markdown-to-jsx";

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
      {isLoggedIn ? <AddTipTap updateTT={setData} /> : null}

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
            {isLoggedIn ? (
              <Tiptap
                initialContent={tinyThought.content}
                id={tinyThought.id}
                updateTT={setData}
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
      ))}
      <div ref={observerTarget as React.RefObject<HTMLDivElement>} />
    </div>
  );
};

export default TinyThoughtsList;
