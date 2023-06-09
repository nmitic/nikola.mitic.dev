import Link from "next/link";

const MenuItem = ({ href, text }: { href: string; text: string }) => {
  return (
    <li className="transition lg:hover:translate-x-8">
      <Link href={href} className="text-6xl hover:underline">
        {text}
      </Link>
    </li>
  );
};

const MENU_ITEMS = [
  {
    href: "/cv/gymondo",
    text: "CV",
  },
  {
    href: "/tiny_thoughts",
    text: "TINY THOUGHTS",
  },
];

export default function Home() {
  return (
    <section className="flex h-full justify-center items-center">
      <nav>
        <ul className="leading-10">
          {MENU_ITEMS.map((item) => {
            return (
              <MenuItem href={item.href} text={item.text} key={item.href} />
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
