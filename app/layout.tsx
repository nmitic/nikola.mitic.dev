import Link from "next/link";
import Image from "next/image";
import logoIcon from "../public/logo-inverted.svg";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid h-screen auto-rows-[auto_1fr] container mx-auto p-4">
          <header>
            <Link href="/">
              <Image
                priority
                src={logoIcon}
                alt="nikola.mitic.dev logo"
                width={200}
              />
            </Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
