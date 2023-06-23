export type Job = {
  description: {
    markdown: string
  },
  companyName: string
  companyWebsite: string
  endDate: string
  slug: string
  location: string
  title: string
  startDate: string
  id: string
  industry: string
  techStackTools: string[]
  themeColor: {
    hex: string
  }
}

export type JobWithSplitTesting = {
  originalVariantWeight: number
  description: {
    markdown: string
  },
  companyName: string
  companyWebsite: string
  endDate: string
  slug: string
  location: string
  title: string
  startDate: string
  id: string
  industry: string
  techStackTools: string[]
  themeColor: {
    hex: string
  }
  splitTesting: SplitTestingOnJob
}

export type SplitTestingOnJob = {
  weight: number
  variantName: string
  variantResource: {
    description: {
      markdown: string
    },
    companyName: string
    companyWebsite: string
    endDate: string
    slug: string
    location: string
    title: string
    startDate: string
    id: string
    industry: string
    techStackTools: string[]
    themeColor: {
      hex: string
    }
  }
}[]

export type JobData<T> = {
  job: T
}

export type JobsData = {
  jobs: Job[]
}

export type SplitTesting = {
  id: string
  name: string
  enableSplitTesting: boolean
  splittingTestingResource: Job
}

export type SplitTestingsData = {
  splitTestings: SplitTesting[]
}
