import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <ul>
        <li>
          <Link href="/blog" className="">
            BLOG
          </Link>
        </li>
        <li>
          <Link href="/portfolio">PORTFOLIO</Link>
        </li>
        <li>
          <Link href="/cv">CV</Link>
        </li>
      </ul>
    </section>
  );
}
