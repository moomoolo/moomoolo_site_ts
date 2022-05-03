import Head from 'next/head';
import React from 'react';
import BlogList from '../src/component/BlogList';
import { BlogInfo } from '../src/types/BlogInfo';
import Nav from '../src/component/Nav';
import type { GetStaticProps } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { getBlogInfoList } from '../src/util/getBlogInfoList';

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
  const blogInfoList = await getBlogInfoList();
  return {
    props: {
      blogInfoList
    }
  }
}