import { GraphQLClient, gql } from "graphql-request";
import { PortfolioData } from "../../../types/portfolio";
import PortfolioView from "../../../components/portfolioView";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const PortfolioPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const query = gql`
    query GetPortfolioBySlug($slug: String) {
      portfolio(where: { slug: $slug }) {
        imagePreview {
          url
          width
        }
        title
        techStackTools
        sourceCodeLink
        liveLink
        description {
          html
        }
      }
    }
  `;
  const data: PortfolioData = await client.request(query, { slug });

  return <PortfolioView data={data} />;
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const slug = params.slug;
  const query = gql`
    query GetPortfolioBySlug($slug: String) {
      portfolio(where: { slug: $slug }) {
        title
        techStackTools
      }
    }
  `;
  const {
    portfolio: { title, techStackTools },
  }: PortfolioData = await client.request(query, { slug });

  return {
    title: `${title} - Nikola Mitic - portfolio - projects`,
    description: `${title} project build with ${techStackTools.map(
      (item) => ` ${item}`
    )}`,
  };
};

export default PortfolioPage;
