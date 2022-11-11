// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Blink } from '../../../interfaces/blink';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Blink>
) {
  res.status(200).json({
    nodes: [
      {
        id: 0,
        address: "0x9b1fe6fac3af7219b1a3e10956733b643798cc57",
        name: "Thug Pugs",
        symbol: "THUGPUGS",
        image_url:
          "https://i.seadn.io/gae/Qig7g74L1XUWI0ko5bratE8wM9-Ry863virLC9TTHuyIlm0ngMeqi8ZJA1mNAvJXgoU7DPAdOCtj0pnzyngEgZYeHILPqjWv4P_q?auto=format&w=3840",
      },
      {
        id: 1,
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        name: "Bored Ape Yacht Club",
        symbol: "BAYC",
        image_url:
          "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=3840",
      },
      {
        id: 2,
        address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
        name: "Mutant Ape Yacht Club",
        symbol: "MAYC",
        image_url:
          "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?auto=format&w=3840",
      },
      {
        id: 3,
        address: "0xed5af388653567af2f388e6224dc7c4b3241c544",
        name: "Azuki",
        symbol: "AZUKI",
        image_url:
          "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&w=3840",
      },
      {
        id: 4,
        address: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        name: "Doodles",
        symbol: "DOODLE",
        image_url:
          "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=3840",
      },
    ],
    links: [
      {
        source: 1,
        target: 0,
      },
      {
        source: 2,
        target: 1,
      },
      {
        source: 3,
        target: 0,
      },
      {
        source: 4,
        target: 2,
      },
    ],
  });
}
