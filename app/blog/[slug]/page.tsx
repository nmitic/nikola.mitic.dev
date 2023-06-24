import { GraphQLClient, gql } from "graphql-request";
import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import { getPostMetaData } from "../../../utils/getPostMetaData";

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
    <article className="prose prose-invert mx-auto">
      <Markdown>{data.post.content.markdown}</Markdown>
    </article>
  );
};

export const generateStaticParams = async () => {
  const posts = getPostMetaData();

  return posts.map((post) => ({ slug: post.slug }));
};

export default PostPage;
