"use client";

import Image from "next/image";
import { ClientDate } from "./ClientDate";
import Markdown from "markdown-to-jsx";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { useEffect, useRef, useState } from "react";
import { getTinyThoughtsData } from "../app/tiny_thoughts/date_getters";

const useIntersectionObserver = (
  options: IntersectionObserverInit = { threshold: 1 }
): [React.RefObject<HTMLElement>, boolean] => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLElement>(null);
  const [isIntersected, setIsIntersected] = useState<boolean>(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      setIsIntersected(entries[0].isIntersecting);
    }, options);

    const currentObserver = observerRef.current;

    if (targetRef.current) {
      currentObserver.observe(targetRef.current);
    }

    return () => {
      if (currentObserver && targetRef.current) {
        currentObserver.unobserve(targetRef.current);
      }
    };
  }, [options]);

  return [targetRef, isIntersected];
};

const TinyThoughtsList = ({
  tinyThoughts,
}: {
  tinyThoughts: tinyThought[];
}) => {
  const [data, setData] = useState(tinyThoughts);
  const [page, setPage] = useState(0);
  const [observerTarget, isIntersected] = useIntersectionObserver();

  useEffect(() => {
    if (isIntersected) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isIntersected]);

  useEffect(() => {
    getTinyThoughtsData(page)
      .then(({ data: { tinyThoughts: tinyThoughtsData } }) => {
        setData((prevData) => [...prevData, ...tinyThoughtsData]);
      })
      .catch((e) => console.log(e));
  }, [page]);

  useEffect(() => {}, [page]);

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
      <div ref={observerTarget} />
    </>
  );
};

export default TinyThoughtsList;
