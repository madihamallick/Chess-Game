"use client";

import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { detectOpening } from "../utils/detectOpening.ts";
import GameTimer from "../components/GameTimer";
import MoveHistory from "../components/MoveHistory";
import EnhancedChat from "../components/EnhancedChat";
import {
  ArrowLeft,
  Settings,
  Flag,
  RotateCcw,
  Handshake,
  Crown,
  Star,
  Zap,
  Trophy,
} from "lucide-react";

const GamePage: React.FC = () => {
  const { id } = useParams();
  const gameId = id || "1";

  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [openingName, setOpeningName] = useState<string>("");
  const [playerMode, setPlayerMode] = useState<"human" | "computer">(
    "computer"
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [playerTurn, setPlayerTurn] = useState<"white" | "black">("white");
  const [moveHistory, setMoveHistory] = useState<any[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "System",
      text: "Game started! Good luck!",
      timestamp: new Date(),
      type: "system" as const,
    },
  ]);

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      handleGameEnd();
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });

    setPlayerTurn(game.turn() === "w" ? "white" : "black");
    updateMoveHistory();
  }

  function onDrop(source: string, target: string) {
    if (gameOver) return false;

    let move: any = null;
    safeGameMutate((g) => {
      move = g.move({ from: source, to: target, promotion: "q" });
    });

    if (move === null) return false;

    if (!gameStarted) setGameStarted(true);

    setPlayerTurn(game.turn() === "w" ? "white" : "black");
    updateMoveHistory();

    const moves = game.history();
    setOpeningName(detectOpening(moves));
    // setMoveHistory(game.history({ verbose: true }));

    if (game.game_over()) {
      handleGameEnd();
      return true;
    }

    if (playerMode === "computer") {
      setTimeout(makeRandomMove, 500);
    }

    return true;
  }

  interface MoveHistory {
    moveNumber: number;
    white: string;
    black: string;
    evaluation: number;
  }

  function updateMoveHistory() {
    const history = game.history({ verbose: true });
    const formattedMoves: MoveHistory[] = [];

    for (let i = 0; i < history.length; i += 2) {
      const moveNumber = Math.floor(i / 2) + 1;
      const whiteMove = history[i];
      const blackMove = history[i + 1];

      formattedMoves.push({
        moveNumber,
        white: whiteMove?.san || "",
        black: blackMove?.san || "",
        evaluation: Math.random() * 4 - 2,
      });
    }

    setMoveHistory(formattedMoves);
    setCurrentMoveIndex(formattedMoves.length - 1);
  }

  function handleGameEnd() {
    setGameOver(true);
    setGameStarted(false);

    let result = "Draw";
    if (game.in_checkmate()) {
      result = game.turn() === "w" ? "Black wins!" : "White wins!";
    } else if (game.in_stalemate()) {
      result = "Stalemate - Draw!";
    } else if (game.insufficient_material()) {
      result = "Insufficient material - Draw!";
    }

    setWinner(result);
    setShowGameOverModal(true);

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "System",
        text: `Game Over: ${result}`,
        timestamp: new Date(),
        type: "system" as const,
      },
    ]);
  }

  function restartGame() {
    const newGame = new Chess();
    setGame(newGame);
    setGameOver(false);
    setGameStarted(false);
    setWinner(null);
    setOpeningName("");
    setPlayerTurn("white");
    setMoveHistory([]);
    setCurrentMoveIndex(-1);
    setShowGameOverModal(false);
  }

  type SystemMessage = {
    id: string;
    sender: string;
    text: string;
    timestamp: Date;
    type: "system";
  };

  type UserMessage = {
    id: string;
    sender: string;
    text: string;
    timestamp: Date;
    type: "emoji" | "message";
  };

  type ChatMessage = SystemMessage | UserMessage;

  function handleTimeUp() {
    const winner =
      playerTurn === "white" ? "Black wins on time!" : "White wins on time!";
    setWinner(winner);
    setGameOver(true);
    setShowGameOverModal(true);
  }

  function handleSendMessage(message: string) {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: message,
      timestamp: new Date(),
      type:
        message.length === 1 &&
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(
          message
        )
          ? "emoji"
          : "message",
    };

    setChatMessages((prev) => [...prev, newMessage]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-800">
                Game #{gameId}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {openingName && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  <Crown className="w-4 h-4" />
                  <span>{openingName}</span>
                </div>
              )}
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-sm">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-700">
                Game Mode:
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  id="mode-toggle"
                  className="hidden"
                  checked={playerMode === "computer"}
                  onChange={() =>
                    setPlayerMode(playerMode === "human" ? "computer" : "human")
                  }
                />
                <label
                  htmlFor="mode-toggle"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <div
                      className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
                        playerMode === "computer"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                        playerMode === "computer" ? "translate-x-6" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {playerMode === "human" ? "vs Human" : "vs Computer"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-3 space-y-6">
            <GameTimer
              initialTime={600}
              isActive={gameStarted && !gameOver}
              onTimeUp={handleTimeUp}
              playerTurn={playerTurn}
            />

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">
                Game Controls
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={restartGame}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Game</span>
                </button>
                <button
                  onClick={() => alert("Draw offered!")}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
                >
                  <Handshake className="w-4 h-4" />
                  <span>Offer Draw</span>
                </button>
                <button
                  onClick={() => alert("Game resigned!")}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors col-span-2"
                >
                  <Flag className="w-4 h-4" />
                  <span>Resign</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Game Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Turn:</span>
                  <span className="font-semibold capitalize">{playerTurn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Moves:</span>
                  <span className="font-semibold">{game.history().length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-semibold ${
                      gameOver ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {gameOver ? "Game Over" : "In Progress"}
                  </span>
                </div>
                {winner && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Result:</span>
                    <span className="font-semibold text-blue-600">
                      {winner}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:col-span-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="relative">
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={onDrop}
                  customBoardStyle={{
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                  customDarkSquareStyle={{ backgroundColor: "#4f46e5" }}
                  customLightSquareStyle={{ backgroundColor: "#e0e7ff" }}
                  customDropSquareStyle={{ backgroundColor: "#fbbf24" }}
                />

                {showGameOverModal && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-xl z-10">
                    <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
                      <div className="mb-4">
                        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Game Over!
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">{winner}</p>
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="text-center">
                          <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                            <Star className="w-4 h-4" />
                            <span className="font-bold">+50 XP</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Experience
                          </span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center space-x-1 text-blue-500 mb-1">
                            <Zap className="w-4 h-4" />
                            <span className="font-bold">+15</span>
                          </div>
                          <span className="text-xs text-gray-500">Rating</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={restartGame}
                          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                        >
                          Play Again
                        </button>
                        <button
                          onClick={() => (window.location.href = "/dashboard")}
                          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                        >
                          Dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:col-span-3 space-y-6">
            <MoveHistory
              moves={moveHistory}
              currentMove={currentMoveIndex}
              onMoveClick={setCurrentMoveIndex}
            />

            <EnhancedChat
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              currentUser="You"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
