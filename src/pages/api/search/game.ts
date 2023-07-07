import { findGames } from "@/firebase";
import type { NextApiRequest, NextApiResponse } from "next";
interface HandlerProps extends NextApiRequest {
  query: {
    textToFind: string;
  };
}

export default async function handler(req: HandlerProps, res: NextApiResponse) {
  if (req.method != "GET") return res.status(401).end();
  const response = await findGames(req.query.textToFind);
  res.status(200).json(response);
}
