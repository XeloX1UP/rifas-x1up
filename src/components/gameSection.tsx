"use client";
import { getAllActiveGames } from "@/utils/fetchs";
import { AllGamesSnapProps } from "@/utils/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import GameCard from "./cards/gameCard";

export function GameSection() {
  const [games, setGames] = useState<AllGamesSnapProps[]>([]);
  useEffect(() => {
    const fetchingGames = async () => {
      const listOfGames: AllGamesSnapProps[] = await getAllActiveGames();
      if (listOfGames.length > 0) {
        setGames(listOfGames);
      }
    };
    fetchingGames();
  }, []);
  if (games.length <= 0)
    return (
      <section>
        <p>No se encontraron juegos</p>
      </section>
    );
  return (
    <section className="d-flex align-items-strech justify-content-center gap-2 gap-md-4 flex-wrap">
      {games.map(({ author, id, price, slots, title, type, players }) => {
        return (
          <GameCard
            key={id}
            author={author}
            price={price}
            slots={slots}
            title={title}
            type={type}
            gameID={id}
            players={players}
          />
        );
      })}
    </section>
  );
}
