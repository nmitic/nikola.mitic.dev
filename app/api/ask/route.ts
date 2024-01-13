// example.ts
import fs from "fs/promises";
import { Document, VectorStoreIndex } from "llamaindex";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function POST(request: Request) {
  // Load essay from abramov.txt in Node
  const essay = await fs.readFile(
    "node_modules/llamaindex/examples/abramov.txt",
    "utf-8",
  );

  // Create Document object with essay
  const document = new Document({ text: essay });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  const index = await VectorStoreIndex.fromDocuments([document]);

  // Query the index
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query(
    "What did the author do in college?",
  );

  // Do whatever you want
  return NextResponse.json({ response: response.response }, { status: 200 });
}