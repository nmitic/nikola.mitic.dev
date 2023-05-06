import matter from "gray-matter";
import fs from 'fs';

export const getMarkdown = (mdFolder: string) => {
    const files = fs.readdirSync(mdFolder);
    const markdownPosts = files.filter((file) => file.endsWith("md"));
  
    return markdownPosts.map((post) => {
      return {
        ...matter(fs.readFileSync(`${mdFolder}/${post}`, "utf8"))
      };
    });
  }