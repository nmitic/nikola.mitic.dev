import Image from "next/image";
import coverPhoto from "../../public/cover_photo.jpeg";
import profilePhoto from "../../public/profile_photo.jpeg";
import emailIcon from "../../public/email-icon.svg";

const Sings = () => (
  <div className="sings container max-w-3xl mx-auto">
    <div className="sticky top-0 z-10 bg-black/60 backdrop-blur-sm">
      <section className="stickyInfo max-w-xl mx-auto py-2 flex flex-col">
        <span className="fullName text-2xl">Nikola Mitic</span>
        <span className="singsCount text-sm text-slate-500">2459 Sings</span>
      </section>
    </div>
    <div className="hero">
      <div className="relative">
        <Image
          className="object-cover h-96 rounded-lg"
          src={coverPhoto}
          alt="Nikola Mitic cover photo"
        />
        <Image
          className="border-solid border-4 border-black rounded-full absolute left-6 bottom-[-75px]"
          src={profilePhoto}
          alt="Nikola Mitic profile photo"
          width={150}
        />
      </div>
    </div>
    <div className="contact sticky top-0 z-50 flex justify-end py-4 items-center">
      <a
        href="mailto:nikola.mitic.dev@gmail.com"
        className="mr-2 hover:opacity-90"
      >
        <Image src={emailIcon} alt="email icon" width={30} />
      </a>
      <button className="bg-white hover:opacity-90 transition-opacity text-black font-bold py-2 px-4 rounded-full">
        Subscribe
      </button>
    </div>
    <div className="desc">
      <span className="name">Nikola Mitic</span>
      <span className="tagName">@nmitic</span>
      <p className="text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        placeat iusto cum a ducimus, culpa tempore alias.
      </p>
      <div className="meta">
        <span className="occupation">UI developer</span>
        <span className="location">Berlin</span>
        <span className="web">
          <a href="nikola-mitic-dev.vercel.app">nikola-mitic-dev.vercel.app</a>
        </span>
        <span className="dateJoined">31.12.1991</span>
      </div>
    </div>
    <article className="sing">
      <Image src={profilePhoto} alt="Nikola Mitic profile photo" />
      <section className="meta">
        <span className="fullName">Nikola Mitic</span>
        <span className="tagName">@nmitic</span>
        <span className="date"></span>
      </section>
      <section className="content">
        Discipline is the key to success. If you cannot force yourself to do
        something you don’t want to do, how are you ever gonna put yourself
        through the suffering required for greatness?
      </section>
    </article>
  </div>
);

export default Sings;
