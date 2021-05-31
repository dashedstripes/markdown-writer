import React from 'react';
import type { AppProps } from 'next/app'
import Editor from '../components/Editor/Editor';

function Home({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Editor/>
    </div>
  );
}
export default Home
