import { GraphQLClient, gql } from "graphql-request";

type PostData = {
  post: {
    id: number;
    content: {
      html: string;
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
          html
        }
      }
    }
  `;
  const data: PostData = await client.request(query, { slug });

  return (
    <article
      className="prose prose-invert mx-auto grid grid-cols-1"
      dangerouslySetInnerHTML={{ __html: data.post.content.html }}
    />
  );
};

export default PostPage;
