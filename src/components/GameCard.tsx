"use client"

import React from "react"
import { Calendar, Clock, Trophy, User, ChevronRight } from "lucide-react"

interface GameCardProps {
  game: {
    id: string
    whitePlayer: string
    blackPlayer: string
    result: string
    date: string
    opening: string
    duration: string
  }
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const getResultColor = (result: string) => {
    if (result === "1-0") return "text-green-600 bg-green-100"
    if (result === "0-1") return "text-red-600 bg-red-100"
    return "text-yellow-600 bg-yellow-100"
  }

  const getResultText = (result: string) => {
    if (result === "1-0") return "White Won"
    if (result === "0-1") return "Black Won"
    return "Draw"
  }

  return (
    <div
      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200"
      onClick={() => {
        window.location.href = `/game/${game.id}`
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-4 h-4 text-gray-500" />
            <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {game.whitePlayer} vs {game.blackPlayer}
            </h3>
          </div>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getResultColor(game.result)}`}
          >
            <Trophy className="w-3 h-3 mr-1" />
            {getResultText(game.result)}
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(game.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{game.duration}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Opening:</span>
            <span className="text-sm font-semibold text-gray-800">{game.opening}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center text-sm text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
          <span>View Game Details</span>
        </div>
      </div>
    </div>
  )
}

export default GameCard
