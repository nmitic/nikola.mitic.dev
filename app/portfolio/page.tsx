import { GraphQLClient, gql } from "graphql-request";
import PortfolioItem from "../../components/PortfolioItem";
import { PortfoliosData } from "../../types/portfolio";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const Portfolio = async () => {
  const query = gql`
    query PortfoliosQuery {
      portfolios {
        id
        imagePreview {
          url
        }
        imagePreviewGif {
          url
          width
          height
        }
        title
        techStackTools
        sourceCodeLink
        liveLink
        description {
          html
        }
        slug
      }
    }
  `;
  const { portfolios }: PortfoliosData = await client.request(query);

  return (
    <div className="grid sm:grid-cols-3 gap-6 container max-w-5xl mx-auto mb-auto mt-auto">
      {portfolios.map((portfolio) => {
        return <PortfolioItem portfolio={portfolio} key={portfolio.id} />;
      })}
    </div>
  );
};

export default Portfolio;
