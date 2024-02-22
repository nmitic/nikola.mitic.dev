"use client";

import Image from "next/image";
import ProfilePicture from "../public/cv_photo_nikola_mitic.jpeg";

const contactEmail = "nikola.mitic.dev@gmail.com";

export const CvInfo = () => {
  return (
    <aside className="text-center mb-10 lg:col-span-2">
      <div key="cv-info" className="sticky top-[232px] text-center">
        <Image
          src={ProfilePicture}
          alt="Nikola Mitic profile picture"
          className="rounded-full mb-4 inline-block"
          width={240}
          height={240}
          priority
          placeholder="blur"
        />
        <p className="font-mono text-3xl uppercase">Nikola Mitić</p>
        <p>Berlin, Germany</p>
        <a
          className="hover:underline block mb-4"
          href={`mailto:${contactEmail}`}
        >
          {contactEmail}
        </a>
      </div>
    </aside>
  );
};
