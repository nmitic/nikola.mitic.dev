import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

async function getBrowser() {
  // local development is broken for this 👇
  // but it works in vercel so I'm not gonna touch it
  return puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
    ),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

async function printPDF() {
  const browser = await getBrowser();
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
    console.error(error);
    return new NextResponse("error generating pdf", { status: 500 });
  }
}
