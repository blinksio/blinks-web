import { KeyboardEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Web3Utils from "web3-utils";

const SearchBox = () => {
  const router = useRouter();
  const [address, setAddress] = useState<string>("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key === "Enter" && isValidAddress) {
      router.push(`/address/${encodeURIComponent(address || "")}`);
    }
  };

  useEffect(() => {
    setIsValidAddress(Web3Utils.isAddress(address));
  }, [address]);

  return (
    <div className="p-4 sm:p-2 sm:border-2 sm:border-transparent sm:rounded-sm">
      <div className="flex flex-col items-start sm:flex-row">
        <div className="flex-1 w-full min-w-0">
          <div className="relative text-white focus-within:text-gray-400">
            <input
              name="address"
              id="address"
              placeholder="Collection Address"
              className={`block w-full px-4 py-4 text-base text-center bg-slate-900 text-white placeholder-white border-transparent outline-0 transition-all duration-200 sm:text-left`}
              onChange={(event) => setAddress(event.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              onFocus={() => {
                setShowToolTip(false);
              }}
            />
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
