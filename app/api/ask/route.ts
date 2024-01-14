// example.ts
import { GraphQLClient, gql } from "graphql-request";
import { Document, VectorStoreIndex, jsonToNode, ObjectType } from "llamaindex";
import { NextRequest, NextResponse } from "next/server";

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
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // get user query
    const query = searchParams.get("query");

    if (query === null || query === undefined) {
      return NextResponse.json({ error: "Query parameter is missing" }, { status: 400 });
    }

    // load jobs data
    const data = await client.request(jobsQuery);

    // Check if the data is empty or not in the expected format
    if (!data) {
      return NextResponse.json({ error: "Error in fetching jobs data" }, { status: 500 });
    }

    // Create Document object with essay
    const document = new Document({ text: JSON.stringify(data) });

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index = await VectorStoreIndex.fromDocuments([document]);

    // Query the index
    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query(query);

    return NextResponse.json({ response: response.response }, { status: 200 });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
