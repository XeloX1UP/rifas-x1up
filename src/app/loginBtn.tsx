"use client";
import { UserInfoCtx, UserInfoCtxType } from "@/contexts/userData";
import { useContext, useEffect } from "react";
import { getUser, logout } from "@/utils/fetchs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buscarCookie } from "@/utils/stringControl";
// type LoginBtnProps = {
//   userJwt: string;
// };
// type UserProps = {
//   bornDate: string;
//   email: string;
//   fullName: string;
//   message: string;
//   passed: boolean;
//   phoneNumber: string;
//   premium: boolean;
//   pwd: string;
//   rut: string;
// };
const LoginBtn: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useContext<UserInfoCtxType>(UserInfoCtx);
  // useEffect(() => {

  //   const handleFetch = async () => {
  //     if (userJwt != "" && user.personalInfo.email === "") {
  //       const userRecived: UserProps = await getUser(userJwt);
  //       if (userRecived && userRecived.passed)
  //         setUser({
  //           ...user,
  //           personalInfo: {
  //             bornDate: userRecived.bornDate,
  //             email: userRecived.email,
  //             fullName: userRecived.fullName,
  //             password: "",
  //             premium: false,
  //             phoneNumber: userRecived.phoneNumber,
  //             rut: userRecived.rut,
  //           },
  //         });
  //     }
  //   };
  //   handleFetch();
  // }, [user]);
  useEffect(() => {
    const cookie = buscarCookie(document.cookie, "usuario");
    const validateCookie = async () => {
      const result = await fetch("/api/valJWT", {
        body: cookie,
        method: "POST",
      }).then((data) => data.json());
      if (result) {
        setUser({ ...result });
      }
    };
    if (cookie) {
      validateCookie();
    } else {
      router.push("/user/login");
    }
  }, []);
  const handle = async () => {
    await logout();
  };

  if (user.personalInfo.email) {
    return (
      <Link
        href={"/"}
        onClick={() => {
          handle();
        }}
        prefetch={false}
        className="btn btn-secondary my-4"
        style={{ backgroundColor: "#FF0303", border: "none", color: "black" }}
      >
        Cerrar sesion
      </Link>
    );
  }
  return null;
};
export default LoginBtn;
