export type Job = {
  description: {
    markdown: string;
  };
  companyName: string;
  companyWebsite: string;
  endDate: string;
  slug: string;
  location: string;
  title: string;
  startDate: string;
  id: number;
  industry: string;
  techStackTools: string[];
  themeColor: {
    hex: string;
  };
  projectManagement: string;
  jobProjects: {
    title: string;
    content: {
      markdown: string;
    };
  }[];
  teamMembersJobTitles: string[];
};

export type JobData = {
  job: Job;
};

export type JobsData = {
  jobs: Job[];
};
