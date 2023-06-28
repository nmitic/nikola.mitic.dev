import { GraphQLClient, gql } from "graphql-request";
import { PortfolioData } from "../../../types/portfolio";

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
        }
        imagePreviewGif {
          url
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

  return (
    <article
      className="prose prose-invert mx-auto grid grid-cols-1"
      dangerouslySetInnerHTML={{ __html: data.portfolio.description.html }}
    />
  );
};

export default PortfolioPage;
