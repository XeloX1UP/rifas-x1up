"use client";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import type { PersonalInfoProps } from "@/utils/interfaces";
import { addNewUserToFirebase } from "@/utils/fetchs";
import { getDateFormat } from "@/utils/stringControl";
import styles from "@/components/modules/newUserForm.module.css";

const NewUserForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [reEmail, setReEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [rut, setRut] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bornDate, setBornDate] = useState("");

  const router = useRouter();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "user") setEmail(value.trim());
    if (id === "reUser") setReEmail(value.trim());
    if (id === "password") setPassword(value.trim());
    if (id === "rePassword") setRePassword(value.trim());
    if (id === "fullName") setFullName(value.trim());
    if (id === "rut") setRut(value.trim());
    if (id === "phoneNumber") setPhoneNumber(value.trim());
    if (id === "bornDate") setBornDate(getDateFormat(value.trim()));
  };
  const formEventHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email != reEmail) {
      alert("Los correos no coinciden");
      return;
    }
    if (password != rePassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const personalInfo: PersonalInfoProps = {
      fullName,
      email,
      password,
      rut,
      phoneNumber,
      bornDate,
      premium: false,
    };

    //enviar a firebase
    const result = await addNewUserToFirebase(personalInfo);
    if (!result || !result.message) {
      alert("Error inesperado");
      return;
    }
    if (!result.passed) {
      const message = `Se han detectado los siguientes errores: *${
        typeof result.message === "object"
          ? result.message.join(". *")
          : result.message
      }`;
      alert(message);
      return;
    } else {
      alert("Usuario agregado con éxito");
      router.push("/user/login");
    }
  };
  return (
    <form
      onSubmit={formEventHandler}
      className={`d-flex flex-row flex-wrap justify-content-around align-items-strech gap-3 ${styles.form}`}
    >
      <div className="formInput">
        <label htmlFor="user">Correo</label>
        <input
          type="email"
          id="user"
          defaultValue={email}
          onChange={onChangeHandler}
        />
      </div>
      <div className="formInput">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          defaultValue={password}
          onChange={onChangeHandler}
          maxLength={8}
        />
      </div>
      <div className="formInput">
        <label htmlFor="reUser">Repetir correo</label>
        <input
          type="email"
          id="reUser"
          defaultValue={reEmail}
          onChange={onChangeHandler}
        />
      </div>
      <div className="formInput">
        <label htmlFor="rePassword">Repetir contraseña</label>
        <input
          type="password"
          id="rePassword"
          defaultValue={rePassword}
          onChange={onChangeHandler}
          maxLength={8}
        />
      </div>
      <div className="formInput">
        <label htmlFor="fullName">Nombre completo</label>
        <input
          type="text"
          id="fullName"
          defaultValue={fullName}
          onChange={onChangeHandler}
        />
      </div>
      <div className="formInput">
        <label htmlFor="rut">RUT</label>
        <input
          type="text"
          id="rut"
          defaultValue={rut}
          onChange={onChangeHandler}
        />
      </div>
      <div className="formInput">
        <label htmlFor="phoneNumber">Numero telefónico</label>
        <input
          type="number"
          id="phoneNumber"
          defaultValue={phoneNumber}
          onChange={onChangeHandler}
          maxLength={9}
        />
      </div>
      <div className="formInput">
        <label htmlFor="bornDate">Fecha de nacimiento</label>
        <input
          type="date"
          id="bornDate"
          defaultValue={bornDate}
          onChange={onChangeHandler}
        />
      </div>
      <div className={`formInput ${styles.btn}`}>
        <button type="submit" className="mt-md-4">
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
export default NewUserForm;
