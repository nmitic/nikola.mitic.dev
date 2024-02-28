import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(process.env.PDF_GENERATION_PATH as string, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A3", printBackground: true });

  await browser.close();
  return pdf;
}

export async function GET() {
  try {
    const pdf = await printPDF();

    const response = new NextResponse(pdf);
    response.headers.set("content-type", "application/pdf");

    return response;
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 });
  }
}
