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
    <html lang="en" className="h-full scroll-pt-[224px]">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/base16/default-dark.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>
      </head>
      <body className="h-full">
        <AuthProvider>
          <div className="container mx-auto flex flex-col h-full gap-4 p-4 md:gap-10">
            <Header />
            {children}
            <Footer links={footerLinks} />
            <Analytics />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
