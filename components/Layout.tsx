import React, { ReactNode } from "react";
import Image from "next/image";
import Head from "next/head";
import { BlinkNode } from "../interfaces/blink";

type Props = {
  children?: ReactNode;
  title?: string;
  showHeader?: boolean;
  blinkHeader?: BlinkNode;
};

const Layout = ({ children, title = "Blinks", showHeader = false, blinkHeader }: Props) => (
  <div className="bg-slate-900 flex flex-col h-screen justify-between">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      {showHeader && blinkHeader && (
        <div className="flex h-16 w-full items-center justify-center border-t">
          <span className="flex-auto items-center justify-center gap-2 text-slate-400 py-2 text-xl text-center">
            {"Explore NFTs related to "}
            <a
            href={blinkHeader?.meta?.opensea_url as string || (blinkHeader.address ? `https://opensea.io/assets/ethereum/${blinkHeader.address}/1` : "")}
            className="text-slate-100 hover:text-violet-300"
            target="_blank"
            rel="noreferrer"
            >
              {blinkHeader.name}
            </a>
          </span>
        </div>
      )}
    </header>
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 py-2 text-center mb-auto">
      {children}
    </main>
    <footer className="flex flex-row h-20 w-full items-center justify-center border-t">
      <span className="flex-1 items-center justify-center gap-2 text-white py-2 text-xs text-right font-mono">
        Powered by a couple of Mfers
      </span>
      <div className="flex-1 pb-2 pl-2">
        <Image
          src="/mfer.svg"
          alt="Mfers Logo"
          width={40}
          height={10}
          className="rounded-2xl"
        />
      </div>
    </footer>
  </div>
);

export default Layout;
