import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex h-full justify-center items-center">
      <nav>
        <ul className="leading-10">
          <li>
            <Link href="/blog" className="text-6xl hover:underline">
              SINGS
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className="text-6xl hover:underline">
              PORTFOLIO
            </Link>
          </li>
          <li>
            <Link href="/cv/gymondo" className="text-6xl hover:underline">
              CV
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
