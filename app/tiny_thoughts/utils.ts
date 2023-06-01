import { getAllMarkdowns } from "../../utils/getMarkdown";
import { singsType } from "./types";

export const getAllThoughtsAndSortThemByStartDate = ():singsType => {
    const jobs = getAllMarkdowns("tiny_thoughts") as singsType;
    const sortedJobsByStartDate = jobs.sort(
      // using + as unary operator here to convert date into a number
      (a, b) => +new Date(b.data.date) - +new Date(a.data.date)
    );

    return sortedJobsByStartDate;
}