import { getAllGames } from "@/firebase";
import { NextApiRequest, NextApiResponse } from "next";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Invalid" });
  }
  const games = await getAllGames();
  if (!games) return res.json({ message: "No se encontraron juegos" });
  return res.json(games);
}
