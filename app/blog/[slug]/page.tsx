import { GraphQLClient, gql } from "graphql-request";
import Markdown from "markdown-to-jsx";

type PostData = {
  post: {
    id: number;
    content: {
      markdown: string;
    };
  };
};

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_READ_ONLY as string
);

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const query = gql`
    query GetJobBySlug($slug: String) {
      post(where: { slug: $slug }) {
        id
        content {
          markdown
        }
      }
    }
  `;
  const data: PostData = await client.request(query, { slug });

  return (
    <article className="prose prose-invert mx-auto grid grid-cols-1">
      <Markdown>{data.post.content.markdown}</Markdown>
    </article>
  );
};

export default PostPage;
