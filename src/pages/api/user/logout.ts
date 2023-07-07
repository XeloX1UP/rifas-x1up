import { NextApiRequest, NextApiResponse } from "next";

const handle = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", `usuario=; expires=; path=/`);
  res.status(200).end();
};
export default handle;
