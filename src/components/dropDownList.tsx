import { MouseEventHandler } from "react";
import { Button, Dropdown } from "react-bootstrap";
import style from "@/components/modules/newGameForm.module.css";

type DropDownProps = {
  text: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};
export default function DropDownList({ text, handleClick }: DropDownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        style={{
          backgroundColor: "#2E3840",
          color: "whitesmoke",
          border: "none",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
        className="text-wrap"
      >
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu className={style.select}>
        <Dropdown.Item onClick={handleClick}>Para un tercero</Dropdown.Item>
        <Dropdown.Item onClick={handleClick}>{`Para mí`}</Dropdown.Item>
        <Dropdown.Item onClick={handleClick}>
          Prefiero no especificar
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
