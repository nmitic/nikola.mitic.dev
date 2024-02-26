import { GraphQLClient } from "graphql-request";

export const hygraphClient = new GraphQLClient(
  process.env.HYGRAPH_ENDOINT as string,
  {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
  }
);
