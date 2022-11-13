import React from "react";
import SearchBox from "./SearchBox";

const SearchPage = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="flex flex-col items-stretch sm:min-h-[641px]">
        <div className="relative flex items-center justify-center w-full">
          <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
            <h1 className="text-6xl text-center font-bold text-white sm:text-7xl xl:text-9xl">
              Blinks
              <br />
            </h1>
            <div className="max-w-2xl mx-auto mt-8 lg:mx-0 lg:mt-12 rounded-xl">
              <SearchBox/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
