// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Blink } from '../../../interfaces/blink';

const HOST = "https://blinksio-api.herokuapp.com"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Blink | { error: any }>
) {
  try {
    const { address } = req.query;
    const response = await fetch(`${HOST}/nodes/${address}/graph`);
    const graphNodes = await response.json();

    res.status(200).json(graphNodes);
  } catch (error) {
    res.status(400).send({ error });
  }
}
