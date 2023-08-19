import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import logoIcon from "../public/logo-inverted.svg?url";
import Image from "next/image";

export const Header = () => {
  return (
    <header className=" flex justify-between">
      <Link href="/" className="inline-block">
        <Image
          priority
          src={logoIcon}
          alt="nikola.mitic.dev logo"
          width={200}
        />
      </Link>
      <ProfileImage />
    </header>
  );
};
