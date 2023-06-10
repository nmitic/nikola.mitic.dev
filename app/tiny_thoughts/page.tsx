import { Metadata } from "next";
import Sings from "../../components/Sings/Sings";
import { getAllThoughtsAndSortThemByStartDate } from "./utils";

const TinyThoughts = () => {
  const allTinyThoughts = getAllThoughtsAndSortThemByStartDate();
  return <Sings sings={allTinyThoughts} />;
};

export default TinyThoughts;

export const metadata: Metadata = {
  title: "Nikola Mitic - Senior Frontend Developer",
  description:
    "Discover more about who Nikola is as a person outside of web development by browsing his tiny thoughts and picking his brain.",
};
