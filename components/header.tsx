import Image from "next/image";
import logoIcon from "../public/logo-inverted.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-4">
      <Link href="/">
        <Image
          priority
          src={logoIcon}
          alt="nikola.mitic.dev logo"
          width={200}
        />
      </Link>
    </header>
  );
};

export default Header;
