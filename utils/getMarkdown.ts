import matter from "gray-matter";
import fs from 'fs';

export const getAllMarkdowns = (mdFolder: string) => {
    const files = fs.readdirSync(mdFolder, "utf8");
    const markdownPosts = files.filter((file) => file.endsWith("md"));
  
    return markdownPosts.map((post) => {
      return {
        ...matter(fs.readFileSync(`${mdFolder}/${post}`, "utf8"))
      };
    });
  }