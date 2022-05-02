import Head from 'next/head';
import React from 'react';
import Nav from '../src/Nav';

export default function Index() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Moomoo</title>
      </Head>
      <Nav />
    </div>
  )
}