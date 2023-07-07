import { getGame } from "@/firebase";
import { NextApiRequest, NextApiResponse } from "next";
interface ReqParams extends NextApiRequest {
  query: {
    gameID: string;
  };
}
const handle = async (req: ReqParams, res: NextApiResponse) => {
  const gameID = req.query.gameID;

  const result = await getGame(gameID ? gameID : "");

  return res.status(200).json(result);
};
export default handle;
