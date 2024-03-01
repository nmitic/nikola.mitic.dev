import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const pdf = await fs.readFile(
      process.cwd() +
        "/public/nikola_mitic_senior_software_developer_resume.pdf"
    );

    const response = new NextResponse(pdf);
    response.headers.set("content-type", "application/pdf");

    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse("Server encounter error while fetching pdf", {
      status: 500,
    });
  }
}
