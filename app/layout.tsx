import Link from "next/link";
import Image from "next/image";
import logoIcon from "../public/logo-inverted.svg";
import SoLogoIcon from "../public/so-logo.svg";
import CodepenLogoIcon from "../public/codepen-logo.svg";
import GithubLogo from "../public/GitHub_Logo_White.png";
import LinkedinLogo from "../public/LI-Logo.png";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid h-screen grid-rows-[auto,1fr] container mx-auto p-4">
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
          <footer>
            <ul className="text-right">
              <li>
                <a
                  href="https://github.com/nmitic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className=" w-20 aspect-[5/2] object-contain inline-block"
                    src={GithubLogo}
                    alt="Github logo"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://stackoverflow.com/users/5794392/nikola-mitic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={SoLogoIcon}
                    alt="stack overflow icon"
                    className=" w-20 aspect-[5/2] object-contain inline-block"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://codepen.io/nikolamitic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    className=" w-20 aspect-[5/2] object-contain inline-block"
                    src={CodepenLogoIcon}
                    alt="codepen logo"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/nikola-mitic-6a5b11119/"
                >
                  <Image
                    className=" w-20 aspect-[5/2] object-contain inline-block"
                    src={LinkedinLogo}
                    alt="Linkedin logo"
                  />
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  );
}
