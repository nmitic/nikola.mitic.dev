import Link from "next/link";

const MenuItem = ({ href, text }: { href: string; text: string }) => {
  return (
    <li className="group relative">
      <Link
        href={href}
        className="text-6xl group-hover:translate-x-8 transition w-full block group-hover:underline"
      >
        {text}
      </Link>
    </li>
  );
};

export default MenuItem;
