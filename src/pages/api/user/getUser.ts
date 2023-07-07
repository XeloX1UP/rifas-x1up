import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUser } from "@/firebase";
interface GetUserProps extends NextApiRequest {
  cookies: {
    usuario?: string;
  };
  query: {
    validUser?: string;
  };
}
export default async function getUserApi(
  req: GetUserProps,
  res: NextApiResponse
) {
  const token = req.cookies.usuario;
  const userFromQuery = req.query.validUser;
  if (token) {
    const jwtUser = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (typeof jwtUser == "object") {
      const userFromCookie = jwtUser.userEmail;
      if (userFromQuery == userFromCookie) {
        const userFromDB = await getUser(userFromCookie);
        if (userFromDB.passed) {
          return res.status(200).json(userFromDB);
        }
      }
    }
  }

  res.status(200).json({ message: "Algo malio sal", passed: false });
}
