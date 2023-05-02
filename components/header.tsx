import Image from "next/image";
import logoIcon from "../public/logo-inverted.svg";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-4">
      <Image priority src={logoIcon} alt="nikola.mitic.dev logo" width={200} />
    </header>
  );
};

export default Header;
