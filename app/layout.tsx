import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import logoIcon from "../public/logo-inverted.svg?url";
import Footer from "../components/footer";
import { footerLinks } from "../static-data/footer-links";

import "../styles/globals.css";
import { ProfileImage } from "../components/ProfileImage";
import { AuthProvider } from "../context/AuthProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/base16/default-dark.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
      </head>
      <body>
        <AuthProvider>
          <div className="grid gap-4 md:gap-10 h-screen grid-rows-[auto,1fr] container mx-auto p-4">
            <header className=" flex justify-between">
              <Link href="/" className="inline-block">
                <Image
                  priority
                  src={logoIcon}
                  alt="nikola.mitic.dev logo"
                  width={200}
                />
              </Link>
              <ProfileImage />
            </header>
            <main>{children}</main>
            <Footer links={footerLinks} />
            <Analytics />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
