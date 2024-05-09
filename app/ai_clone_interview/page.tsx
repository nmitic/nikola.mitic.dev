import { Metadata } from "next";
import MenuItem from "../../components/MenuItem";

const MENU_ITEMS = [
  {
    href: `/ai_clone_interview/chat`,
    text: "Chat with me",
  },
  {
    href: "/ai_clone_interview/talk",
    text: "Talk with me",
  },
];

const AICloneInterview = async () => {
  return (
    <section className="flex h-full items-center justify-center mb-auto mt-auto">
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
};

export const metadata: Metadata = {
  title:
    "Interview Nikola Mitic - Senior Frontend Developer - Leveraging Artificial Intelligence for Senior Frontend Developer Interviews",
  description:
    "Discover how artificial intelligence transforms the process of interviewing senior frontend developers. Dive into innovative techniques and strategies powered by AI to conduct insightful and efficient interviews. Explore the benefits of utilizing AI-driven platforms for evaluating technical skills, problem-solving abilities, and cultural fit. Revolutionize your hiring process and streamline candidate assessments with cutting-edge AI technologies.",
};

export default AICloneInterview;
