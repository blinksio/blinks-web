import { useEffect, useState } from "react";
import Link from "next/link";
import Web3Utils from "web3-utils";
import SearchAutocomplete from "./Combobox";
import { NFTCollection } from "../interfaces/NFTCollection";

const SearchBox = () => {
  const [address, setAddress] = useState<string>("");
  const [selectedCollection, setSelectedCollection] = useState<NFTCollection>(
    {} as any
  );
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);

  const onChangeSearchAutoComplete = (value: NFTCollection) => {
    setSelectedCollection(value);
    setAddress(value.address);
  };

  useEffect(() => {
    setIsValidAddress(Web3Utils.isAddress(address));
  }, [address]);

  return (
    <div className="p-4 sm:p-2 sm:border-2 sm:border-transparent sm:rounded-sm">
      <div className="flex flex-col items-start sm:flex-row">
        <div className="flex-1 w-full min-w-0">
          <div className="relative text-white focus-within:text-gray-400">
            <div className="relative block w-full py-2">
              <SearchAutocomplete
                selectedCollection={selectedCollection}
                onChange={onChangeSearchAutoComplete}
              />
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-full px-8 py-2 mt-2 font-bold text-slate-900 transition-all duration-200 bg-violet-200 border border-transparent rounded-2xl sm:w-auto sm:ml-4 sm:mt-2 hover:bg-violet-300 focus:bg-violet-500">
          {isValidAddress ? (
            <Link href={`/address/${encodeURIComponent(address)}`}>Search</Link>
          ) : (
            <>
              <button
                className="inline-block opacity-60 w-full"
                onClick={() => {
                  setShowToolTip(!isValidAddress);
                }}
              >
                Search
              </button>
            </>
          )}
        </div>
      </div>
      {showToolTip && <p className="text-pink-500">Not a valid address</p>}
    </div>
  );
};

export default SearchBox;
