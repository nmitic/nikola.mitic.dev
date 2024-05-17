import Image from "next/image";
import profilePhoto from "../../../public/profile_photo.jpeg";

import Avatar from "boring-avatars";

type ChatItem = {
  answer: React.ReactNode | string;
  question: string;
};

export const ChatItem = ({ answer, question }: ChatItem) => {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="mr-4 inline-block w-[30px] align-middle">
          <Avatar
            size={40}
            name="Grace Hopper"
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>

        <span className="font-bold">You</span>
        <p className="ml-14 mt-6 whitespace-pre-line">{question}</p>
      </div>
      <div>
        <Image
          className="mr-4 inline-block w-[35px] rounded-full"
          src={profilePhoto}
          alt="Nikola Mitic profile photo"
          placeholder="blur"
          priority
          width={35}
        />
        <span className="align-middle font-bold">Nikola Mitic</span>
        <p className="ml-14 mt-6 whitespace-pre-line">{answer}</p>
      </div>
    </div>
  );
};
