import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex h-full justify-center items-center">
      <nav>
        <ul className="leading-10">
          <li className="hover:translate-x-8 transition">
            <Link href="/cv/gymondo" className="text-6xl hover:underline">
              CV
            </Link>
          </li>
          <li className="hover:translate-x-8 transition">
            <Link href="/tiny_thoughts" className="text-6xl hover:underline">
              TINY THOUGHTS
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
