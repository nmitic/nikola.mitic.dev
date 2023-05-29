import Link from "next/link";
import { getAllMarkdowns } from "../../utils/getMarkdown";

const Blog = () => {
  const allBlogPosts = getAllMarkdowns("posts");
  return (
    <section className="grid md:grid-cols-3 grid-cols-1 mx-auto gap-4">
      {allBlogPosts.map((post) => {
        return (
          <>
            <Link
              href={`/blog/${post.data.slug}`}
              className="border-[1px] p-4 hover:scale-[1.1] bg-black transition-transform flex flex-col justify-between"
            >
              <div className=" mb-3">
                <h1 className="text-2xl mb-3 decoration-orange-300 underline-offset-4 decoration-4 underline">
                  {post.data.title}
                </h1>
                <p>{post.data.intro}</p>
              </div>
              <small className="self-end">{post.data.date}</small>
            </Link>
          </>
        );
      })}
    </section>
  );
};

export default Blog;
