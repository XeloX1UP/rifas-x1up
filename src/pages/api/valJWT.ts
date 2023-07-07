import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUser } from "@/firebase";
import { PersonalInfoProps, UserInfoProps } from "@/utils/interfaces";
type UserProps = {
  premium: boolean;
  userEmail: string;
  iat: number;
};
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.body;
    const user = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (typeof user === "object") {
      const validUser = user as UserProps;
      const dbUser = await getUser(validUser.userEmail);
      if (dbUser.passed) {
        const personalInfo: UserInfoProps = {
          personalInfo: {
            bornDate: dbUser.bornDate,
            email: dbUser.email,
            fullName: dbUser.fullName,
            password: "",
            phoneNumber: dbUser.phoneNumber,
            premium: dbUser.premium,
            rut: dbUser.rut,
          },
        };
        return res.status(200).json(personalInfo);
      }
    }
    return res.status(200).json(undefined);
  } catch (error) {
    return res.status(200).json(undefined);
  }
}
