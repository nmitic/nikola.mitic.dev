import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import LinkIcon from "../../../public/link-icon.svg";
import CodeIcon from "../../../public/code.svg";
import ToolIcon from "../../../public/tool.svg";
import { PortfolioData } from "../../../types/portfolio";
import PortfolioView from "../../../components/portfolioView";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const PortfolioPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const query = gql`
    query GetJobBySlug($slug: String) {
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

export default PortfolioPage;
