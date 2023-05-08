import { markdown } from "../../utils/getMarkdown";

export type jobType = {
    startDate: string;
    slug: string;
    themeColor: string;
    companyName: string;
  };
  
  export type jobsType = markdown<jobType>[];