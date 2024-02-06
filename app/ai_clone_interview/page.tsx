import { Metadata } from "next";
import { InterviewerAI } from "../../components/InterviewerAI";

const AICloneInterview = async () => {
  return (
    <section className="">
      <InterviewerAI />
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
