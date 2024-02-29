import puppeteer from "puppeteer";

export async function generatePdf() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(process.env.PDF_GENERATION_PATH as string, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    format: "A3",
    printBackground: true,
    path: "./public/nikola_mitic_senior_software_developer_resume.pdf",
  });

  await browser.close();
  return pdf;
}
