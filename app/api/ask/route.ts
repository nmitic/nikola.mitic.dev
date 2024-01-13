// example.ts
import fs from "fs/promises";
import { GraphQLClient, gql } from "graphql-request";
import { Document, VectorStoreIndex, jsonToNode, ObjectType } from "llamaindex";
import { NextResponse } from "next/server";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const jobsQuery = gql`
  query Jobs {
    page(where: {slug: "tiny-thoughts"}) {
      description {
        text
      }
    }
    jobs {
      description {
        text
      }
      companyName
      endDate
      startDate
      techStackTools
      title
    }
    tinyThoughts(first: 100) {
    content {
      text
    }
  }
  }
`

// To handle a GET request to /api
export async function POST(request: Request) {
  // load jobs data
  const data = await client.request(jobsQuery)

  // Create Document object with essay
  const document = new Document({ text: JSON.stringify(data) });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Query the index
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query(
    "What are Nikola's biggest frustration and how is he solving them?",
  );


  return NextResponse.json({ response: response.response }, { status: 200 });
}