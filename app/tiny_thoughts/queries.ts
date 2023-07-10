import { gql } from "graphql-request";

export const QUERY_ALL_TT = gql`
  query TinyThoughtsQuery {
    tinyThoughts(orderBy: createdAt_DESC, first: 3) {
      id
      createdAt
      content {
        markdown
      }
    }
    tinyThoughtsConnection {
      aggregate {
        count
      }
    }
  }
`;