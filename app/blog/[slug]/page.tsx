import Markdown from "markdown-to-jsx";
import fs from "fs";
import matter from "gray-matter";
import { getPostMetaData } from "../../../utils/getPostMetaData";

const getPost = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}/${slug}.md`;

  return matter(fs.readFileSync(file, "utf8"));
};

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPost(slug);

  return (
    <article>
      <Markdown>{post.content}</Markdown>
    </article>
  );
};

export const generateStaticParams = async () => {
  const posts = getPostMetaData();

  return posts.map((post) => ({ slug: post.slug }));
};

export default PostPage;
