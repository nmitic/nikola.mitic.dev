import Image, { StaticImageData } from "next/image";

type FooterLink = {
  href: string;
  logo: StaticImageData;
  logoAltText: string;
};

type FooterProps = {
  links: FooterLink[];
};

const Footer = ({ links }: FooterProps): JSX.Element => {
  return (
    <footer>
      <ul>
        {links.map(({ href, logo, logoAltText }) => {
          return (
            <li>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Image
                  className="w-20 aspect-[5/2] object-contain inline-block"
                  src={logo}
                  alt={logoAltText}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
