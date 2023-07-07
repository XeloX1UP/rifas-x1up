"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./finder.module.css";
import { ActiveGameProps } from "@/utils/interfaces";
import { searchGame } from "@/utils/fetchs";
import GameCard from "./cards/gameCard";
export default function Finder() {
  const router = useRouter();
  const [textToSearch, setTextToSearch] = useState("");
  const [text, setText] = useState("");
  const [activeGameData, setActiveGameData] = useState<
    ActiveGameProps[] | undefined
  >(undefined);
  useEffect(() => {
    console.log(activeGameData);
  }, [activeGameData]);
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setText(textToSearch);
    const response = await searchGame(textToSearch.trim());
    if (response) setActiveGameData([...response]);
  };
  return (
    <div
      className={`mt-5 mt-md-0 d-flex flex-column align-items-center justify-content-center gap-5 w-100 ${styles.container}`}
    >
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => {
            setTextToSearch(e.target.value);
          }}
          type="text"
          id="textToSearch"
          placeholder="Buscar rifa..."
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-binoculars-fill"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z" />
          </svg>
        </button>
      </form>
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 container-md">
        {activeGameData ? (
          activeGameData.length > 0 ? (
            activeGameData.map((game) => {
              return (
                <GameCard
                  key={game.gameID}
                  author={game.author}
                  gameID={game.gameID}
                  players={game.players}
                  price={game.price}
                  slots={game.slots}
                  title={game.title}
                  type={game.type}
                />
              );
            })
          ) : (
            <h1>No se encotraron rifas que coincidan con {`"${text}"`}</h1>
          )
        ) : null}
      </div>
    </div>
  );
}
