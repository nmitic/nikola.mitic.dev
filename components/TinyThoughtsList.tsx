"use client";

import Image from "next/image";
import { ClientDate } from "./ClientDate";
import Markdown from "markdown-to-jsx";
import profilePhoto from "../public/profile_photo.jpeg";
import { tinyThought } from "../types/tt";
import { useEffect, useRef, useState } from "react";
import { getTinyThoughtsData } from "../app/tiny_thoughts/data_getters";
import { useSession } from "next-auth/react";
import { TinyThoughtsListItem } from "./TinyThoughtsListItem";

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
    <>
      {data.map((tinyThought) => (
        <TinyThoughtsListItem tinyThought={tinyThought} />
      ))}
      <div ref={observerTarget as React.RefObject<HTMLDivElement>} />
    </>
  );
};

export default TinyThoughtsList;
