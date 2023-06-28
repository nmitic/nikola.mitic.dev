export type Portfolio = {
  id: string
  imagePreview: {
    url: string
    width: number
    height: number
  }
  imagePreviewGif: {
    url: string
    width: number
    height: number
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
