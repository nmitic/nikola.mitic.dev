export type Portfolio = {
  imagePreview: {
    url: string
  }
  imagePreviewGif: {
    url: string
  }
  title: string
  techStackTools: string[]
  sourceCodeLink: string
  liveLink: string
  description: {
    html: string
  }
  slug: string
}

export type PortfolioData = {
  portfolio: Portfolio
}

export type PortfoliosData = {
  portfolios: Portfolio[]
}
