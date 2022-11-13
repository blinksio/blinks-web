// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Blink, BlinkLinks } from "../../../interfaces/blink";

const HOST = "https://blinksio-api.herokuapp.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Blink | {}>
) {
  try {
    const { address } = req.query;

    if (address === "undefined") {
      console.error(address);
      throw new Error("No Address");
    }

    const response = await fetch(`${HOST}/nodes/${address}/graph`);
    const graphNodes: Blink = await response.json();

    if (!graphNodes || !graphNodes.nodes || !graphNodes.links) {
      throw new Error("Graph had no nodes");
    }

    graphNodes.links.forEach((link: BlinkLinks) => {
      const a = graphNodes.nodes.find((node) => node.id === link.source);
      const b = graphNodes.nodes.find((node) => node.id === link.target);

      if (!a || !b) {
        throw new Error("Failed to match link to node");
      }

      a.links = [...(a.links || []), link];
      b.links = [...(b.links || []), link];
    });

    graphNodes.nodes[0].main = true;

    res.status(200).json(graphNodes);
  } catch (error) {
    console.error(error);
    res.status(400).send({});
  }
}
