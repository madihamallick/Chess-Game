import React, { useState } from "react";
import mockGames from "../data/mockGames.json";
import GameCard from "../components/GameCard";

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  const filteredGames = mockGames
    .filter(
      (game) =>
        game.whitePlayer.toLowerCase().includes(search.toLowerCase()) ||
        game.blackPlayer.toLowerCase().includes(search.toLowerCase()) ||
        game.opening.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "recent"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .slice((page - 1) * 5, page * 5);

  return (
    <div className="p-4 md:p-8">
      <button
        onClick={() => {
          window.location.href = "/game/1";
        }}
        className="px-4 py-1 text-sm h-10 mt-3 mx-20 bg-white text-gray-800 rounded-lg hover:bg-gray-600 border-2 border-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        Play Game
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Match History Dashboard
      </h1>
      <div className="w-11/12 mx-auto my-14 ">
        <div className="flex gap-4 mb-4 md:w-[30rem]">
          <input
            type="text"
            placeholder="Search by player or opening..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGames.map((game) => (
            <div key={game.id} className="relative">
              <img
                src="/images/chess-bg.jpg"
                alt="Chess background"
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
              />
              <div className="relative z-10">
                <GameCard game={game} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="border px-4 py-2 rounded"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="border px-4 py-2 rounded ml-2"
          disabled={filteredGames.length < 5}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
