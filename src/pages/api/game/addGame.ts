import { writeNewGame } from "@/firebase";
import { GameProps } from "@/utils/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST")
    res.status(500).json({ message: "Metodo no soportado", passed: false });
  const body: GameProps = JSON.parse(req.body);
  const result = await writeNewGame(body);
  result
    ? res.status(200).json({ message: "Rifa guardada con éxito", passed: true })
    : res.status(200).json({ message: "No se pudo guardar", passed: false });
}
