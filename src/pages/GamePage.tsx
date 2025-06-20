import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { detectOpening } from "../utils/detectOpening.ts";

const App: React.FC = () => {
  const { id } = useParams();
  const gameId = id || "1";

  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [openingName, setOpeningName] = useState<string>("");
  const [playerMode, setPlayerMode] = useState<"human" | "computer">(
    "computer"
  );

  const [chatMessages, setChatMessages] = useState<
    { sender: string; text: string }[]
  >([]);
  const [chatInput, setChatInput] = useState("");

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      setGameOver(true);
      const winner = game.turn() === "w" ? "Black" : "White";
      setWinner(winner);
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(source: string, target: string) {
    if (gameOver) return false;

    let move: any = null;
    safeGameMutate((g) => {
      // optionally includes a promotion to a queen (promotion: "q"). This is common in chess when a pawn reaches the opposite end of the board and can be promoted.
      move = g.move({ from: source, to: target, promotion: "q" });
    });

    if (move === null) return false;

    const moves = game.history();
    setOpeningName(detectOpening(moves));

    if (playerMode === "computer") {
      setTimeout(makeRandomMove, 200);
    }

    return true;
  }

  function restartGame() {
    const newGame = new Chess();
    setGame(newGame);
    setGameOver(false);
    setWinner(null);
    setOpeningName("");
  }

  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
        className="px-4 py-1 text-sm h-10 my-3 mx-10 bg-white text-gray-800 rounded-lg hover:bg-gray-600 border-2 border-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Let's Play Game #{gameId} 🚀
      </h1>

      <div className="flex justify-center my-10">
        <div className="flex items-center">
          <label className="mr-4 font-semibold text-sm text-gray-700">
            Mode
          </label>
          <div className="relative">
            <input
              type="checkbox"
              id="toggle"
              className="hidden"
              checked={playerMode === "computer"}
              onChange={() =>
                setPlayerMode(playerMode === "human" ? "computer" : "human")
              }
            />
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <div
                  className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
                    playerMode === "computer" ? "bg-gray-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                    playerMode === "computer" ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {playerMode === "human"
                  ? "Play with Human"
                  : "Play with Computer"}
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-4 md:mt-6">
        {/* Chessboard */}
        <div className="w-full">
          <div className="relative flex justify-center items-center min-h-[400px]">
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
              customDarkSquareStyle={{ backgroundColor: "gray" }}
              customLightSquareStyle={{ backgroundColor: "#edeed1" }}
            />
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white z-10">
                <p className="text-xl font-bold">Game Over</p>
                <p className="text-lg">Winner: {winner}</p>
                <p className="text-sm">Press Enter to restart</p>
              </div>
            )}
          </div>
        </div>

        {/* Move List */}
        <div className="w-full xl:ml-18">
          <div className="bg-gray-100 rounded-lg shadow-md p-4 h-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Move List</h2>
            <div className="space-y-3 text-base">
              <p>Current Turn: {game.turn() === "w" ? "White" : "Black"}</p>
              <p>Total Moves: {game.history().length}</p>
              {/* In chess.js, the load_pgn() function is used to load a game's moves from a string formatted in Portable Game Notation (PGN) */}
              <p className="break-words">PGN: {game.pgn()}</p>
              <p>FEN: {game.fen().split("-")[1]}</p>
              <p>Status: {gameOver ? "Game Over" : "In Progress"}</p>
              <p>Winner: {winner || "None"}</p>
              <p className="font-semibold">Opening: {openingName || ""}</p>
            </div>
          </div>
        </div>

        {/* Chat + Controls */}
        <div className="w-full xl:ml-16">
          <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col h-full justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">Chat</h2>
              <div className="p-4 border rounded-lg bg-gray-50 mb-4 max-h-48 overflow-y-auto space-y-2">
                {chatMessages.map((msg, idx) => (
                  <p key={idx} className="text-sm">
                    <strong>{msg.sender}:</strong> {msg.text}
                  </p>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (chatInput.trim()) {
                    setChatMessages((prev) => [
                      ...prev,
                      { sender: "Player", text: chatInput },
                    ]);
                    setChatInput("");
                  }
                }}
                className="flex space-x-2 mb-6"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                />
                <button
                  type="submit"
                  className="px-4 text-sm py-2 bg-white text-gray rounded-lg hover:bg-gray-600 border-2 border-gray-600 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>

            <div className="flex justify-around">
              <button
                onClick={restartGame}
                className="px-2 text-sm py-2 h-10 mx-1 bg-white text-gray rounded-lg hover:bg-gray-600 border-2 border-gray-600 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Restart Game
              </button>
              <button
                onClick={() => alert("Draw offered!")}
                className="px-2 text-sm py-2 h-10 mx-1 bg-white text-gray rounded-lg hover:bg-gray-600 border-2 border-gray-600 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Offer Draw
              </button>
              <button
                onClick={() => alert("Game resigned!")}
                className="px-2 text-sm py-2 h-10 mx-1 bg-white text-gray rounded-lg hover:bg-gray-600 border-2 border-gray-600 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Resign Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
