import Head from "next/head";
import React from "react";
import Blog from "../../../src/component/Blog";
import Nav from "../../../src/component/Nav";
import type { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from "querystring";
import path from 'path';
import { promises as fs } from 'fs';
import { getBlogInfoList } from "../../../src/util/getBlogInfoList";

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

export const getStaticProps: GetStaticProps<BlogPageProps, Params> = async () => {
  const blogFile = path.join(process.cwd(), 'blog', 'test.html');
  const fileContent: string = await fs.readFile(blogFile, "utf-8");
  return {
    props: {
      contentHTML: fileContent,
      title: 'test'
    }
  }
}