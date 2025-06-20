import React from "react";

interface GameCardProps {
  game: {
    id: string;
    whitePlayer: string;
    blackPlayer: string;
    result: string;
    date: string;
    opening: string;
    duration: string;
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="border p-4 rounded shadow cursor-pointer"
      onClick={() => {
        window.location.href = `/game/${game.id}`;
      }}
    >
      <h2 className="text-lg font-bold">
        {game.whitePlayer} vs {game.blackPlayer}
      </h2>
      <p>Result: {game.result}</p>
      <p>Date: {new Date(game.date).toLocaleString()}</p>
      <p>Opening: {game.opening}</p>
      <p>Duration: {game.duration}</p>
    </div>
  );
};

export default GameCard;