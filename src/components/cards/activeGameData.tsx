import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "@/components/modules/activeGame.module.css";
import { formatoMonetario } from "@/utils/stringControl";
import { PersonalInfoProps } from "@/utils/interfaces";
import BuyNumbers from "../modals/buyNumbers";
type ActiveGameDataProps = {
  type: string;
  title: string;
  id: string;
  autor: string;
  price: number;
  players: PersonalInfoProps[];
  slots: number;
};
export default function ActiveGameData({
  id,
  autor,
  players,
  price,
  title,
  type,
  slots,
}: ActiveGameDataProps) {
  return (
    <Card className="text-center">
      <Card.Header style={{ background: "#2E3840", color: "whitesmoke" }}>
        {type}
      </Card.Header>
      <Card.Body style={{ background: "#F9DBBB" }}>
        <Card.Title>{title}</Card.Title>
        <div className={`my-4 ${styles.data}`}>
          <div className="row">
            <div className="col fw-bolder">Id</div>
            <div className="col text-muted badge">{id}</div>
          </div>
          <div className="row">
            <div className="col fw-bolder">Autor</div>
            <div className="col">{autor}</div>
          </div>
          <div className="row">
            <div className="col fw-bolder">Valor</div>
            <div className="col">{`${formatoMonetario(price)}`}</div>
          </div>
          <div className="row">
            <div className="col fw-bolder">{"Disponibilidad"}</div>
            <div className="col">{`${players.length}/${slots}`}</div>
          </div>
        </div>
        <BuyNumbers players={players} slots={slots} price={price} gameID={id}>
          Comprar números
        </BuyNumbers>
      </Card.Body>
      <Card.Footer
        className=""
        style={{
          background: "#2E3840",
          color: "rgba(245, 245, 245, 0.753)",
          userSelect: "none",
        }}
      >
        {"**Insertar fecha de sorteo aquí**"}
      </Card.Footer>
    </Card>
  );
}
