// example.ts
import { GraphQLClient, gql } from "graphql-request";
import {
  Document,
  VectorStoreIndex,
  storageContextFromDefaults,
} from "llamaindex";
import { NextRequest, NextResponse } from "next/server";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const jobsQuery = gql`
  query Jobs {
    page(where: { slug: "tiny-thoughts" }) {
      description {
        text
      }
    }
    jobs(orderBy: startDate_DESC) {
      job_description_and_responsibilities: description {
        text
      }
      companyName
      companyWebsite
      industry
      location
      date_when_you_started_working_here: startDate
      date_when_you_ended_working_here: endDate
      tools_programming_languages_frameworks_you_used_in_this_job: techStackTools
      job_position_title: title
    }
    nikola_mitic_thoughts_on_various_subjects: tinyThoughts(first: 100) {
      content {
        text
      }
    }
  }
`;

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // // get user query
    const query = searchParams.get("query");

    if (query === null || query === undefined) {
      return NextResponse.json(
        { error: "Query parameter is missing" },
        { status: 400 }
      );
    }

    // load jobs data
    const data = await client.request(jobsQuery);

    // Check if the data is empty or not in the expected format
    if (!data) {
      return NextResponse.json(
        { error: "Error in fetching jobs data" },
        { status: 500 }
      );
    }
    // Create Document object with essay
    const document = new Document({ text: JSON.stringify(data) });
    const storageContext = await storageContextFromDefaults({
      persistDir: "./public/storage",
    });
    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index = await VectorStoreIndex.fromDocuments([document], {
      storageContext,
    });

    // Query the index
    const queryEngine = index.asQueryEngine();

    const chunks = await queryEngine.query({
      query: `Answer the following question: ${query}. Rules: You are Nikola Mitic, answers related to work experience is to be found under jobs data, be very straight forward of your answers, question will be asked to Nikola Mitic.`,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        for await (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk.response));
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
