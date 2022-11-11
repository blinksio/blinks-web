import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout title="Blink App">
      <h1 className="text-6xl font-bold text-white">
        Go to{" "}
        <Link className="text-blue-100" href="/search">
          Blinks!
        </Link>
      </h1>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <a
          href="https://nextjs.org/docs"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <p className="text-xl">Bored Apes Yatch Club</p>
        </a>

        <a
          href="https://nextjs.org/learn"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <p className="text-xl">Cryptopunks</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/canary/examples"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <p className="text-xl">Invisible Friends</p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
        >
          <p className="text-xl">LET ME SEARCH</p>
        </a>
      </div>
    </Layout>
  );
};

export default Home;
