import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import Layout from "../../components/Layout";
import { Blink } from "../../interfaces/blink";
import dynamic from "next/dynamic";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchBox from "../../components/SearchBox";

const fetcher: Fetcher<Blink> = async (url: string) => {
  const res = await fetch(url);
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      "An error occurred while fetching the data."
    );
    // Attach extra info to the error object.
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const AddressesGraph = () => {
  const FocusGraph = dynamic(() => import("../../components/FocusGraph"), {
    ssr: false,
  });
  const router = useRouter();
  const address = router.query.address as string;
  const { data, error } = useSWR(`/api/blink/${address}`, fetcher);

  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  if (error) {
    console.error(error);
    return (
      <Layout>
        <div className="flex flex-col">
          <span className="items-center justify-center gap-2 text-white py-2">
            Ups sorry something went wrong. Please try again
          </span>

          <div className="max-w-2xl mx-auto mt-8 lg:mx-0 lg:mt-12 rounded-xl">
            <SearchBox />
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p className="text-white"> Loading... </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="container mx-auto content-center h-full"
        ref={measuredRef}
      >
        <FocusGraph
          blink={data}
          backgroundColor={"#0f172a"}
          width={width}
          height={height}
        />
      </div>
    </Layout>
  );
};

export default AddressesGraph;
