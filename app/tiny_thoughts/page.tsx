import Sings from "../../components/Sings/Sings";

import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import { getAllMarkdowns } from "../../utils/getMarkdown";
import { singsType } from "./types";

const TinyThoughts = (props: any) => {
  const allTinyThoughts = getAllMarkdowns("tiny_thoughts") as singsType;
  return <Sings sings={allTinyThoughts} />;
};

export default TinyThoughts;
