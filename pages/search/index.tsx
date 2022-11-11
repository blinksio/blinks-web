import Link from "next/link";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useState } from "react";
import Layout from "../../components/Layout";
const SearchPage = () => {
  const router = useRouter();
  const [address, setAddress] = useState<string>('');

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key;

    if (key === "Enter") {
      router.push(`/address/${encodeURIComponent(address || '')}`);
    }
  }

  return (
    <Layout>
      <section className="bg-black overflow-hidden">
        <div className="flex flex-col items-stretch lg:min-h-[900px] sm:min-h-[641px]">
          <div className="relative flex items-center justify-center w-full">
            <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
              <h1 className="text-4xl font-bold text-white sm:text-6xl xl:text-8xl">
                Blinks.
                <br />
              </h1>
              <div className="max-w-xl mx-auto mt-8 bg-black lg:mx-0 sm:bg-transparent lg:mt-12 rounded-xl">
                <div className="p-4 sm:p-2 sm:bg-black sm:border-2 sm:border-transparent sm:rounded-sm">
                  <div className="flex flex-col items-start sm:flex-row">
                    <div className="flex-1 w-full min-w-0">
                      <div className="relative text-white focus-within:text-gray-400">
                        <label htmlFor="address" className="sr-only"></label>
                        <input
                          name="address"
                          id="address"
                          placeholder="Collection Address"
                          className="block w-full px-4 py-4 text-base text-center bg-black text-white placeholder-white transition-all duration-200 border-transparent rounded-full sm:text-left focus:border-transparent focus:ring-0 caret-orange-500"
                          onChange={(event) => setAddress(event.target.value)}
                          onKeyPress={(e) => handleKeyPress(e)}
                        />
                      </div>
                    </div>
                    <Link
                      href={`/address/${encodeURIComponent(address)}`}
                      className="inline-flex items-center justify-center w-full px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-gray-400 border border-transparent rounded-full sm:w-auto sm:ml-4 sm:mt-0 hover:bg-orange-600 focus:bg-orange-600"
                    >
                      Search
                    </Link>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-xl text-white">ENS NFT Collection</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;
