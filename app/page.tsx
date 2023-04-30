import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/blog">Blog</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/cv">Cv</Link>
    </main>
  );
}
