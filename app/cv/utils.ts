import { getAllMarkdowns } from "../../utils/getMarkdown";
import { jobsType } from "./types";

export const getAllJobsAndSortThemByStartDate = ():jobsType => {
    const jobs = getAllMarkdowns("jobs") as jobsType;
    const sortedJobsByStartDate = jobs.sort(
      // using + as unary operator here to convert date into a number
      (a, b) => +new Date(b.data.startDate) - +new Date(a.data.startDate)
    );

    return sortedJobsByStartDate;
}