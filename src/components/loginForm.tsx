"use client";
import { loggin } from "@/utils/fetchs";
import Link from "next/link";
import { FormEventHandler, useEffect, useState } from "react";
import { useContext } from "react";
import { UserInfoCtx, UserInfoCtxType } from "@/contexts/userData";
import { UserInfoProps } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import style from "@/components/modules/loginForm.module.css";
const LoginForm: React.FC = () => {
  const { user, setUser } = useContext<UserInfoCtxType>(UserInfoCtx);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   if (user.personalInfo.email != "") router.push("/user");
  // }, [user]);

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await loggin(email, password);
    if (result.passed) {
      const personalInfo: UserInfoProps = {
        personalInfo: {
          fullName: result.fullName,
          email: result.email,
          bornDate: result.bornDate,
          password: "",
          phoneNumber: result.phoneNumber,
          premium: result.premium,
          rut: result.rut,
        },
      };

      setUser({ ...personalInfo });
      alert(result.message);
      router.push("/user");
    } else {
      alert(result.message);
    }
  };

  return (
    <form method="POST" onSubmit={submitHandler} className={`${style.form}`}>
      <div className="formInput">
        <input
          type="text"
          placeholder="Usuario"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="formInput">
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div
        className={`formInput btn d-flex flex-md-row flex-column gap-4 ${style.btnGroup}`}
      >
        <button type="submit">Iniciar sesion</button>
        <Link href={"/user/new"}>Cuenta nueva</Link>
      </div>
    </form>
  );
};
export default LoginForm;
