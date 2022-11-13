import { Fragment, KeyboardEvent, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { NFTCollection } from "../interfaces/NFTCollection";
import fetcher from "../utils/fetcher";
import useSWR from "swr";

type Props = {
  selectedCollection?: NFTCollection;
  onChange: (value: NFTCollection) => void;
};

export default function SearchAutocomplete({
  selectedCollection,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");

  const { data, error } = useSWR(
    `/api/NFTCollections/`,
    fetcher<NFTCollection[]>
  );

  if (error) {
    console.error(error);
    return (
      <span className="items-center justify-center gap-2 text-white py-2">
        Ups sorry something went wrong. Please try again
      </span>
    );
  }

  if (!data) {
    return <p className="text-white"> Loading... </p>;
  }

  const filteredCollections =
    query === ""
      ? data
      : data.filter((collection) =>
          collection.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selectedCollection} onChange={onChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            placeholder="Search Collection"
            displayValue={(collection: any) => collection.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {query.length > 0 && (
              <Combobox.Option
                value={{ id: null, name: query, address: query }}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-teal-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {query}
              </Combobox.Option>
            )}
            {filteredCollections.map((collection) => (
              <Combobox.Option
                key={collection.slug}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-teal-600 text-white" : "text-gray-900"
                  }`
                }
                value={collection}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {collection.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-teal-600"
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
