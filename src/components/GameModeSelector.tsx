"use client"

import React from "react"
import { Clock, Bot, Zap, Trophy } from "lucide-react"

interface GameMode {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  timeControl: string
  xpReward: number
  difficulty?: string
  color: string
}

const gameModes: GameMode[] = [
  {
    id: "blitz",
    name: "Blitz",
    description: "Fast-paced 5-minute games",
    icon: <Zap className="w-6 h-6" />,
    timeControl: "5+0",
    xpReward: 25,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "rapid",
    name: "Rapid",
    description: "Balanced 10-minute games",
    icon: <Clock className="w-6 h-6" />,
    timeControl: "10+0",
    xpReward: 35,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "computer",
    name: "vs Computer",
    description: "Practice against AI",
    icon: <Bot className="w-6 h-6" />,
    timeControl: "Unlimited",
    xpReward: 15,
    difficulty: "Adjustable",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "tournament",
    name: "Tournament",
    description: "Compete for prizes and glory",
    icon: <Trophy className="w-6 h-6" />,
    timeControl: "15+10",
    xpReward: 50,
    color: "from-yellow-500 to-orange-500",
  },
]

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {gameModes.map((mode) => (
        <div
          key={mode.id}
          onClick={() => onSelectMode(mode)}
          className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          <div className={`bg-gradient-to-br ${mode.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">{mode.icon}</div>
              <div className="text-right">
                <div className="text-sm opacity-75">+{mode.xpReward} XP</div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2">{mode.name}</h3>
            <p className="text-sm opacity-90 mb-3">{mode.description}</p>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Time Control:</span>
                <span className="font-semibold">{mode.timeControl}</span>
              </div>
              {mode.difficulty && (
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="font-semibold">{mode.difficulty}</span>
                </div>
              )}
            </div>

            <div className="mt-4 bg-white/20 rounded-lg p-2 text-center group-hover:bg-white/30 transition-colors">
              <span className="text-sm font-semibold">Play Now</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GameModeSelector
