import matter from "gray-matter";
import fs from 'fs';

export interface markdown<T> {
  data: T
  content: string
}

export const getAllMarkdowns = (mdFolder: string):markdown<{[key: string]: any}>[] => {
    const files = fs.readdirSync(mdFolder, "utf8");
    const markdownPosts = files.filter((file) => file.endsWith("md"));

    return markdownPosts.map((post) => {
      const matterRead = matter(fs.readFileSync(`${mdFolder}/${post}`, "utf8"))
      return {
        data: matterRead.data,
        content: matterRead.content
      };
    });
  }