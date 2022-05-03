import { BlogInfo } from "../types/BlogInfo";
import path from 'path';
import {promises as fs} from 'fs';

let blogInfoList: BlogInfo[] | null = null;

export const getBlogInfoList: () => Promise<BlogInfo[]> = async () => {
  if (blogInfoList !== null) {
    return blogInfoList;
  } else {
    const blogInfoFile = path.join(process.cwd(), "blogInfo.json");
    const fileContent = await fs.readFile(blogInfoFile, "utf-8");
    blogInfoList = JSON.parse(fileContent) as BlogInfo[];
    return blogInfoList;
  }
};
