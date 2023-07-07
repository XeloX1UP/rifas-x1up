import { getUser } from "@/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { comparePass } from "@/utils/hash";
import jwt from "jsonwebtoken";
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method != "GET")
      res.status(500).json({ message: "Metodo no soportado", passed: false });
    const { user, password } = req.query;
    const savedUser = await getUser(`${user}`);
    if (savedUser.passed) {
      const match = await comparePass(`${password}`, `${savedUser.pwd}`);
      if (match) {
        const expirationDate = new Date(
          new Date().getTime() + 7 * 24 * 60 * 1000
        );
        const dateString = expirationDate.toUTCString();
        res.setHeader(
          "Set-Cookie",
          `usuario=${jwt.sign(
            { premium: savedUser.premium, userEmail: savedUser.email },
            `${process.env.JWT_SECRET}`
          )}; expires=${dateString}; path=/`
        );
        return res.status(200).json({ ...savedUser, pwd: "" });
      } else {
        return res
          .status(505)
          .json({ passed: false, message: "La contraseña no coincide" });
      }
    } else {
      return res.status(500).json(savedUser);
    }
  } catch (error) {
    return res.status(600).json({ passed: false, message: `${error}` });
  }
};
export default handle;
