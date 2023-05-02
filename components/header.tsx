import Image from "next/image";
import logoIcon from "../public/logo.svg";

const Header = () => {
  return (
    <header>
      <Image priority src={logoIcon} alt="nikola.mitic.dev logo" />
    </header>
  );
};

export default Header;
