import Link from "next/link";
import { getPostMetaData } from "../../utils/getPostMetaData";

const Blog = () => {
  return (
    <section>
      {getPostMetaData().map((post) => {
        return (
          <ul>
            <li>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          </ul>
        );
      })}
    </section>
  );
};

export default Blog;
