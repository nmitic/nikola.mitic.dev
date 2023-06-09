import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import logoIcon from "../public/logo-inverted.svg?url";
import Footer from "../components/footer";
import { footerLinks } from "../static-data/footer-links";

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid gap-4 md:gap-10 h-screen grid-rows-[auto,1fr] container mx-auto p-4">
          <header>
            <Link href="/" className="inline-block">
              <Image
                priority
                src={logoIcon}
                alt="nikola.mitic.dev logo"
                width={200}
              />
            </Link>
          </header>
          <main>{children}</main>
          <Footer links={footerLinks} />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
