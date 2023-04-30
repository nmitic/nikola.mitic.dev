import matter from "gray-matter";
import fs from 'fs';

export const getPostMetaData = () => {
    const folder = "posts/";
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file) => file.endsWith("md"));
  
    return markdownPosts.map((post) => {
      const {
        data: { title },
      } = matter(fs.readFileSync(`posts/${post}`, "utf8"));
  
      return {
        title,
        slug: post.replace(".md", ""),
      };
    });
  };