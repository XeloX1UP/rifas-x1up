import { PersonalInfoProps } from "@/utils/interfaces";
import { MouseEventHandler, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "@/components/modules/buyNumbers.module.css";
import { formatoMonetario } from "@/utils/stringControl";
type BuyNumbersProps = {
  children: string;
  players: PersonalInfoProps[];
  slots: number;
  price: number;
  gameID: string;
};

function BuyNumbers({
  children,
  players,
  slots,
  price,
  gameID,
}: BuyNumbersProps) {
  const [show, setShow] = useState(false);
  const [disp, setDisp] = useState<string[]>([]);
  const [numbersToBuy, setNumbersToBuy] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const handleClose = () => {
    setShow(false);
    setNumbersToBuy([]);
    setTotal(0);
  };
  const handleShow = () => setShow(true);
  const handlePayBtn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log({ numbersToBuy, total, gameID });
  };
  useEffect(() => {
    let disponibleNumbers: string[] = [];
    for (let i = 0; i < slots; i++) {
      if (!players[i]?.email) disponibleNumbers.push(`${i + 1}`);
    }
    setDisp(() => {
      return disponibleNumbers;
    });
  }, [players, slots]);
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const btn = e.target as HTMLDivElement;
    const isActive = btn.classList.contains(`${styles.selected}`);
    if (!isActive) {
      btn.classList.add(`${styles.selected}`);
      setNumbersToBuy((curr) => {
        curr.push(parseInt(btn.innerText));
        return curr;
      });
    } else {
      btn.classList.remove(`${styles.selected}`);
      setNumbersToBuy((curr) => {
        const index = curr.indexOf(parseInt(btn.innerText));
        if (index !== -1) {
          curr.splice(index, 1);
        }
        return curr;
      });
    }
    setTotal((curr) => {
      curr = price * numbersToBuy.length;
      return curr;
    });
  };
  return (
    <>
      <Button
        style={{ background: "#2E3840", padding: "2px 4px" }}
        onClick={handleShow}
      >
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ background: "#4E6E81" }}>
          <Modal.Title>Números disponibles</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#2E3840" }}>
          <div className="container-fluid d-flex flex-wrap gap-md-4 gap-2 justify-content-center">
            {disp.map((num) => {
              return (
                <div
                  className={`fs-4 cnt rounded-pill border d-flex justify-content-center align-items-center ${styles.btn}`}
                  key={num}
                  onClick={handleClick}
                >
                  {num}
                </div>
              );
            })}
          </div>
          <div className="d-flex justify-content-center align-items-center pt-3">
            <p className="fs-2">{`Total: ${formatoMonetario(total)}`}</p>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ background: "#4E6E81" }}>
          <Button
            style={{
              background: "#FF0303",
              color: "#2E3840",
              fontWeight: "bold",
              border: "none",
            }}
            onClick={handleClose}
          >
            Cerrar
          </Button>
          <Button
            style={{
              background: "#2E3840",
              color: "#F9DBBB",
              paddingLeft: "80px",
              paddingRight: "80px",
            }}
            onClick={handlePayBtn}
          >
            Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BuyNumbers;
