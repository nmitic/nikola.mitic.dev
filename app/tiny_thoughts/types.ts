import { markdown } from "../../utils/getMarkdown";

export type singType = {
  date: string
};

export type singsType = markdown<singType>[];
