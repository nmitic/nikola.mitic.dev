import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/footer";
import { footerLinks } from "../static-data/footer-links";

import "../styles/globals.css";
import { AuthProvider } from "../context/AuthProvider";
import { Header } from "../components/Header";

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
          <div className="container mx-auto grid h-screen grid-rows-[auto,1fr] gap-4 p-4 md:gap-10">
            <Header />
            <main>{children}</main>
            <Footer links={footerLinks} />
            <Analytics />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
