import React, { ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="bg-black">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {children}
      </main>
    </div>
    <footer className="flex h-24 w-full items-center justify-center border-t">
      <hr />
      <span className="flex items-center justify-center gap-2 text-white">
        Powered by Blinks
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </footer>
  </div>
);

export default Layout;
