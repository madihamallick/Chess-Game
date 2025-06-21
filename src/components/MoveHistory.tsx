"use client"

import React from "react"
import { History, RotateCcw, Eye } from "lucide-react"

interface Move {
  moveNumber: number
  white: string
  black?: string
  evaluation?: number
}

interface MoveHistoryProps {
  moves: Move[]
  currentMove: number
  onMoveClick: (moveIndex: number) => void
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves, currentMove, onMoveClick }) => {
  const getEvaluationColor = (evaluation: number) => {
    if (evaluation > 2) return "text-green-600"
    if (evaluation > 0.5) return "text-green-400"
    if (evaluation > -0.5) return "text-gray-600"
    if (evaluation > -2) return "text-red-400"
    return "text-red-600"
  }

  const getEvaluationText = (evaluation: number) => {
    if (Math.abs(evaluation) > 5) return evaluation > 0 ? "+M" : "-M"
    return evaluation > 0 ? `+${evaluation.toFixed(1)}` : evaluation.toFixed(1)
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800">Move History</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-1">
        {moves.map((move, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
              index === currentMove ? "bg-blue-100 border border-blue-300" : "hover:bg-gray-50"
            }`}
            onClick={() => onMoveClick(index)}
          >
            <span className="text-sm font-semibold text-gray-500 w-6">{move.moveNumber}.</span>

            <div className="flex-1 flex space-x-3">
              <span className="font-mono text-sm font-semibold text-gray-800">{move.white}</span>
              {move.black && <span className="font-mono text-sm font-semibold text-gray-800">{move.black}</span>}
            </div>

            {move.evaluation !== undefined && (
              <span className={`text-xs font-bold ${getEvaluationColor(move.evaluation)}`}>
                {getEvaluationText(move.evaluation)}
              </span>
            )}
          </div>
        ))}
      </div>

      {moves.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No moves yet</p>
        </div>
      )}
    </div>
  )
}

export default MoveHistory
