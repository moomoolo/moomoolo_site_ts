import Head from 'next/head';
import React from 'react';
import BlogList from '../src/component/BlogList';
import type { BlogInfo } from '../src/component/BlogList'; 
import Nav from '../src/component/Nav';
import type { GetStaticProps } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

interface Porps {
  blogInfoList: BlogInfo[]
}

export default function Index({ blogInfoList }: Porps) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Moomoo</title>
      </Head>
      <Nav />
      <BlogList blogInfoList={blogInfoList}/>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const blogInfoFile = path.join(process.cwd(), 'blogInfo.json');
  const fileContent = await fs.readFile(blogInfoFile, "utf-8");
  const blogInfoList = JSON.parse(fileContent);
  return {
    props: {
      blogInfoList
    }
  }
}