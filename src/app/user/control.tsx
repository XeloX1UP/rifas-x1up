"use client";

import Menu from "@/components/menu";
// import { UserInfoCtx, UserInfoCtxType } from "@/contexts/userData";
// import { useContext, useEffect } from "react";
// import { redirect } from "next/navigation";

const AccessControl: React.FC = () => {
  // const { user } = useContext<UserInfoCtxType>(UserInfoCtx);
  // useEffect(() => {
  //   console.log(user.personalInfo.email);

  //   if (user.personalInfo.email === "") redirect("/user/login");
  // }, [user]);

  return <Menu />;
};
export default AccessControl;
