import Head from "next/head";
import React from "react";
import Blog from "../../src/component/Blog";
import Nav from "../../src/component/Nav";
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from "querystring";
import path from 'path';
import { promises as fs } from 'fs';
import type { BlogInfo } from '../../src/component/BlogList';

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
  blogPath: string,
  title: string
}

export const getStaticProps: GetStaticProps<BlogPageProps, Params> = async (context) => {
  const blogPath = context.params?.blogPath ?? '';
  const title = context.params?.title ?? '';
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
  const blogInfoFile = path.join(process.cwd(), 'blogInfo.json');
  const fileContent = await fs.readFile(blogInfoFile, "utf-8");
  const blogInfoList: BlogInfo[] = JSON.parse(fileContent);
  const paths = blogInfoList.map((blogInfo) => {
    return {
      params: {
        blogPath: blogInfo.path,
        title: blogInfo.title
      }
    };
  })
  return {
    paths,
    fallback: false
  }
}