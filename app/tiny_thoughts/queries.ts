import { gql } from "graphql-request";

export const QUERY_ALL_TT = gql`
  query TinyThoughtsQuery($first: Int, $skip: Int) {
    tinyThoughts(first: $first, orderBy: createdAt_DESC, skip: $skip) {
      id
      createdAt
      content {
        html
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

export const UPDATE_TT = gql`
  mutation updateTinyThought($content: RichTextAST, $id: ID) {
    data: updateTinyThought(data: { content: $content }, where: { id: $id }) {
      id
      createdAt
      content {
        html
        markdown
      }
    }
  }
`;

export const DELETE_TT = gql`
  mutation deleteTinyThought($id: ID) {
    data: deleteTinyThought(where: { id: $id }) {
      id
      createdAt
      content {
        html
        markdown
      }
    }
  }
`;

export const CREATE_NEW_TT = gql`
  mutation createTinyThought($content: RichTextAST) {
    data: createTinyThought(data: { content: $content }) {
      id
      createdAt
      content {
        html
        markdown
      }
    }
  }
`;

export const PUBLISH_TT = gql`
  mutation publishTinyThought($id: ID) {
    data: publishTinyThought(where: { id: $id }) {
      id
      createdAt
      content {
        html
        markdown
      }
    }
  }
`;
