import { QUERY_ALL_TT } from "./queries";
import { calcPagePagination } from "./utils";

export const getTinyThoughtsData = async (page = 0, limit = 6) => {
  const res = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY_ALL_TT,
      variables: {
        ...calcPagePagination(page, limit)
      }
    }),
    next: {
      revalidate: 0,
    },
  });
  return res.json();
};