"use client";
import { getGame } from "@/utils/fetchs";
import { ActiveGameProps } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import ActiveGameData from "./cards/activeGameData";
import TableActiveGame from "./tableActiveGame";

type TypeProp = {
  [key: string]: string;
};

const ActiveGame = ({ gameID }: { gameID: string }) => {
  const [game, setGame] = useState<ActiveGameProps>({
    gameID,
    price: 0,
    slots: 0,
    title: "",
    type: "",
    author: "",
    players: [],
  });
  const types: TypeProp = {
    "Prefiero no especificar": "Gran rifa gran",
    "Para mí": "Rifa a beneficio",
    "Para un tercero": "Rifa a beneficio",
  };
  useEffect(() => {
    const getGameFromDB = async () => {
      const gameResponse = await getGame(gameID);

      if (gameResponse)
        setGame((current) => {
          current = { ...gameResponse };
          return current;
        });
    };
    getGameFromDB();
  }, []);

  return (
    <div className="d-flex flex-md-row-reverse flex-md-nowrap flex-wrap justify-content-center container gap-md-3 gap-1 p-md-5 p-3 bordered-5">
      <div className="datos">
        <ActiveGameData
          type={types[game.type]}
          title={game.title}
          id={game.gameID}
          autor={game.author}
          price={game.price}
          players={game.players}
          slots={game.slots}
        />
      </div>
      <div className="players w-100">
        <TableActiveGame slots={game.slots} />
      </div>
    </div>
  );
};
export default ActiveGame;
