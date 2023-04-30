import Link from "next/link";
import { getPostMetaData } from "../../utils/getPostMetaData";

const Blog = () => {
  return (
    <main>
      {getPostMetaData().map((post) => {
        return (
          <ul>
            <li>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          </ul>
        );
      })}
    </main>
  );
};

export default Blog;
