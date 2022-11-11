import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import Layout from "../../components/Layout";
import { Blink } from "../../interfaces/blink";
import dynamic from "next/dynamic";

const fetcher: Fetcher<Blink> = (url: string) =>
  fetch(url).then((res) => res.json());

const AddressesGraph = () => {
  const FocusGraph = dynamic(() => import("../../components/FocusGraph"), {
    ssr: false,
  });
  const router = useRouter();
  const address = router.query.address as string;
  const { data, error } = useSWR(`/api/blink/${address}`, fetcher);

  if (error) {
    console.error(error);
    return (
      <Layout>
        <p> Error </p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p> Loading... </p>
      </Layout>
    );
  }

  return (
  <Layout>
    <FocusGraph blink={data} />
  </Layout>
  );
};

export default AddressesGraph;
