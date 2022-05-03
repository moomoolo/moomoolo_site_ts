import Head from "next/head";
import React from "react";
import Blog from "../../src/component/Blog";
import Nav from "../../src/component/Nav";
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from "querystring";
import path from 'path';
import { promises as fs } from 'fs';
import { BlogInfo } from "../../src/types/BlogInfo";
import { getBlogInfoList } from "../../src/util/getBlogInfoList";

interface BlogPageProps {
  contentHTML: string;
  title: string;
}

export default function BlogPage({ contentHTML, title }: BlogPageProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>{title}</title>
      </Head>
      <Nav />
      <Blog contentHTML={contentHTML} />
    </>
  );
}

interface Params extends ParsedUrlQuery {
  blogPath: string
}

export const getStaticProps: GetStaticProps<BlogPageProps, Params> = async (context) => {
  const blogPath = context.params?.blogPath ?? '';
  // nextjs无法从getStaticPaths传递除路径之外的参数
  // 故此处需要重新查找
  const blogInfoList = await getBlogInfoList();
  const title = blogInfoList.filter((blogInfo) => blogInfo.path === blogPath)[0].title;
  // 未做错误处理
  // 需要保证blogInfo.json中的数据与blog文件夹中的文件相符
  const blogFile = path.join(process.cwd(), 'blog', blogPath + '.html');
  const fileContent: string = await fs.readFile(blogFile, "utf-8");
  return {
    props: {
      contentHTML: fileContent,
      title: title
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogInfoList = await getBlogInfoList();
  const paths = blogInfoList.map((blogInfo) => {
    return {
      params: {
        blogPath: blogInfo.path
      }
    };
  })
  return {
    paths,
    fallback: false
  }
}