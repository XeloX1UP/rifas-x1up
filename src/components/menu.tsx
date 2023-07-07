"use client";
import { MouseEventHandler, useEffect, useState } from "react";
import MenuOpt from "./menuOpt";

interface MenuProps {
  user?: "string";
}
const Menu: React.FC = ({ user }: MenuProps) => {
  const [option, setOption] = useState<string>("info");

  useEffect(() => {}, [option, user]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const button = e.target as HTMLButtonElement;
    setOption(button.value);
  };
  return (
    <div className="container-md">
      <nav>
        <ul className="d-flex justify-content-end gap-3 flex-wrap">
          <li>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#2E3840",
                border: "none",
                color: "whitesmoke",
              }}
              value={"info"}
              onClick={handleClick}
            >
              Mis datos
            </button>
          </li>
          <li>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#2E3840",
                border: "none",
                color: "whitesmoke",
              }}
              onClick={handleClick}
              value={"new"}
            >
              Crear rifa
            </button>
          </li>
          <li>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#2E3840",
                border: "none",
                color: "whitesmoke",
              }}
              value={"history"}
              onClick={handleClick}
            >
              Historial de rifas
            </button>
          </li>
        </ul>
      </nav>
      <MenuOpt option={option} />
    </div>
  );
};
export default Menu;
