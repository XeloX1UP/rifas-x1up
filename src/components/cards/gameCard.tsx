import styles from "@/components/modules/gameCard.module.css";
import { ActiveGameProps } from "@/utils/interfaces";
import Link from "next/link";
import BuyNumbers from "../modals/buyNumbers";

export default function GameCard({
  author,
  price,
  slots,
  title,
  type,
  gameID,
  players,
}: ActiveGameProps) {
  return (
    <div className={`card ${styles.card}`}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="card-text">
          <ul style={{ listStyle: "none" }} className={`${styles.body}`}>
            <li>
              <label>
                <i className="bi bi-envelope"></i>
                <span>{author}</span>
              </label>
            </li>
            <li>
              <label>
                <i className="bi bi-cash-stack"></i>
                <span>{`$${price}`}</span>
              </label>
            </li>
            <li>
              <label>
                <i className="bi bi-people-fill"></i>
                <span>{slots}</span>
              </label>
            </li>
            <li
              className="mt-3 d-flex gap-3 align-items-strech"
              style={{ marginLeft: "-25px" }}
            >
              {players?.length < slots ? (
                <BuyNumbers
                  players={players}
                  price={price}
                  slots={slots}
                  gameID={gameID}
                >
                  Comprar números
                </BuyNumbers>
              ) : (
                <label>{"No hay números disponibles"}</label>
              )}
              <Link
                href={`/games/${gameID}`}
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover w-50 rounded-pill text-wrap d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#4E6E81",
                  color: "whitesmoke",
                  padding: "0",
                }}
                prefetch={false}
              >
                Ver rifa
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
