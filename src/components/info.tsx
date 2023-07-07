import { useContext, useEffect } from "react";
import { UserInfoCtx, UserInfoCtxType } from "@/contexts/userData";
import { calcularEdad } from "@/utils/helpers";
import styles from "@/components/modules/info.module.css";

const UserInfo: React.FC = () => {
  const { user, setUser } = useContext<UserInfoCtxType>(UserInfoCtx);
  const { personalInfo } = user;
  useEffect(() => {}, [user]);
  return (
    <>
      <hr />
      <div
        className="d-flex flex-md-row flex-wrap gap-md-5 gap-2 justify-content-center"
        style={{ padding: "1rem" }}
      >
        <h1>Información personal</h1>
        <div
          className={`d-flex flex-column justify-content-center align-items-start gap-md-4 gap-3 ${styles.dataContainer}`}
        >
          <label>
            Nombre: <span>{personalInfo.fullName}</span>
          </label>
          <label>
            Correo: <span>{personalInfo.email}</span>
          </label>
          <label>
            Telefono: <span>{personalInfo.phoneNumber}</span>
          </label>
          <label>
            RUT/DNI: <span>{personalInfo.rut}</span>
          </label>
          <label>
            Edad: <span>{calcularEdad(personalInfo.bornDate)} años</span>
          </label>
          <label>
            Tipo de cuenta:{" "}
            <span>{personalInfo.premium ? "Premium" : "Basico"}</span>
          </label>
        </div>
        {user.gamesInfo ? (
          <div>
            <h2>Información de juegos</h2>
          </div>
        ) : null}
        {user.walletInfo ? (
          <div>
            <h2>Billetera</h2>
          </div>
        ) : null}
      </div>
      <hr />
    </>
  );
};
export default UserInfo;
