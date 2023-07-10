"use client";

import Image from "next/image";
import { ClientDate } from "./ClientDate";
import Markdown from "markdown-to-jsx";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { useEffect, useRef, useState } from "react";
import { getTinyThoughtsData } from "../app/tiny_thoughts/date_getters";

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
}: {
  tinyThoughts: tinyThought[];
}) => {
  const [data, setData] = useState(tinyThoughts);
  const [page, setPage] = useState(0);
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
          if (page == Math.ceil(count / LIMIT)) {
            stopObserving();
          }
        }
      )
      .catch((e) => console.log(e));
  }, [page]);

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
      <div ref={observerTarget as React.RefObject<HTMLDivElement>} />
    </>
  );
};

export default TinyThoughtsList;
