// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from 'path';
import { promises as fs } from 'fs';
import { NFTCollection } from "../../../interfaces/NFTCollection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTCollection[] | {}>
) {
  try {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/collections.json', 'utf8');
    //Return the content of the data file in json format
    res.status(200).json(JSON.parse(fileContents));
  } catch (error) {
    console.error(error);
    res.status(400).send({});
  }
}
