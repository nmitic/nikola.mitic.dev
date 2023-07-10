import { markdown } from "../../utils/getMarkdown";

export type tinyThought = {
  date: string
};

export type tinyThoughts = markdown<tinyThought>[];
