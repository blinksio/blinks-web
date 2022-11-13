import React, { ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="bg-slate-900 flex flex-col h-screen justify-between">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header></header>
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 py-2 text-center mb-auto">
      {children}
    </main>
    <footer className="flex flex-col h-32 w-full items-center justify-center border-t">
      <span className="items-center justify-center gap-2 text-white py-2">
        Powered by a couple of Mfers
      </span>

      <div className="flex-auto pb-2">
      <Image src="/mfer.svg" alt="Mfers Logo" width={72} height={16} className="rounded-2xl"/>
      </div>
    </footer>
  </div>
);

export default Layout;
