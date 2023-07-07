"use client";
import { UserInfoProps } from "@/utils/interfaces";
import { createContext, useState } from "react";

export type UserInfoCtxType = {
  user: UserInfoProps;
  setUser: (usr: UserInfoProps) => void;
};
const userInit: UserInfoProps = {
  personalInfo: {
    fullName: "",
    password: "",
    email: "",
    phoneNumber: "",
    rut: "",
    bornDate: "",
    premium: false,
  },
};
export const UserInfoCtx = createContext<UserInfoCtxType>({
  user: userInit,
  setUser: () => {},
});
type ProviderProps = {
  children: React.ReactNode;
};
export function UserInfoProvider({ children }: ProviderProps) {
  const [user, setUser] = useState(userInit);
  return (
    <UserInfoCtx.Provider value={{ user, setUser }}>
      {children}
    </UserInfoCtx.Provider>
  );
}
