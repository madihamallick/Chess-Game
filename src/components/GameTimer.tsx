"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Clock, Play, Pause } from "lucide-react"

interface GameTimerProps {
  initialTime: number // in seconds
  isActive: boolean
  onTimeUp: () => void
  playerTurn: "white" | "black"
}

const GameTimer: React.FC<GameTimerProps> = ({ initialTime, isActive, onTimeUp, playerTurn }) => {
  const [whiteTime, setWhiteTime] = useState(initialTime)
  const [blackTime, setBlackTime] = useState(initialTime)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      if (playerTurn === "white") {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            onTimeUp()
            return 0
          }
          return prev - 1
        })
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            onTimeUp()
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, playerTurn, onTimeUp])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getTimeColor = (time: number) => {
    if (time <= 30) return "text-red-500"
    if (time <= 60) return "text-yellow-500"
    return "text-gray-800"
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800">Game Timer</span>
        </div>
        {isActive ? <Play className="w-5 h-5 text-green-500" /> : <Pause className="w-5 h-5 text-gray-500" />}
      </div>

      <div className="space-y-3">
        {/* Black Player Timer */}
        <div
          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
            playerTurn === "black" && isActive ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Black</span>
            <div className={`text-2xl font-bold ${getTimeColor(blackTime)}`}>{formatTime(blackTime)}</div>
          </div>
          {playerTurn === "black" && isActive && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* White Player Timer */}
        <div
          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
            playerTurn === "white" && isActive ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">White</span>
            <div className={`text-2xl font-bold ${getTimeColor(whiteTime)}`}>{formatTime(whiteTime)}</div>
          </div>
          {playerTurn === "white" && isActive && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameTimer
