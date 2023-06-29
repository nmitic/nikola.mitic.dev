import { Metadata } from "next";
import MenuItem from "../components/MenuItem";

const MENU_ITEMS = [
  {
    href: "/cv/gymondo",
    text: "CV",
  },
  {
    href: "/portfolio",
    text: "Portfolio",
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

export const metadata: Metadata = {
  title: "Nikola Mitic - Senior Frontend Developer",
  description:
    "Discover the impressive expertise and talent of a seasoned professional in web development. Explore a captivating portfolio showcasing a wide range of skills and accomplishments. Unlock the possibilities of collaborating with an accomplished individual passionate about web development.",
};
