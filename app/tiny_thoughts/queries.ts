import { gql } from "graphql-request";

export const QUERY_ALL_TT = gql`
  query TinyThoughtsQuery($first: Int, $skip: Int) {
    tinyThoughts(first: $first, orderBy: createdAt_DESC, skip: $skip) {
      id
      createdAt
      content {
        markdown
        raw
      }
    }
    tinyThoughtsConnection {
      aggregate {
        count
      }
    }
  }
`;
