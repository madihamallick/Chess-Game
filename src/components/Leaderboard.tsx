import React from "react"
import { Trophy, Crown, Medal, TrendingUp } from "lucide-react"

interface Player {
  rank: number
  name: string
  avatar: string
  rating: number
  gamesPlayed: number
  winRate: number
  change: number
  isCurrentUser?: boolean
}

const players: Player[] = [
  {
    rank: 1,
    name: "ChessMaster2024",
    avatar: "/images/chessmaster.jpg",
    rating: 2847,
    gamesPlayed: 1247,
    winRate: 87.3,
    change: 12,
  },
  {
    rank: 2,
    name: "QueenGambit",
    avatar: "/images/queengambit.webp",
    rating: 2834,
    gamesPlayed: 892,
    winRate: 85.1,
    change: -3,
  },
  {
    rank: 3,
    name: "KnightRider",
    avatar: "/images/knightrider.webp",
    rating: 2821,
    gamesPlayed: 1456,
    winRate: 83.7,
    change: 8,
  },
  {
    rank: 4,
    name: "You",
    avatar: "/images/profile.webp",
    rating: 1847,
    gamesPlayed: 234,
    winRate: 72.4,
    change: 15,
    isCurrentUser: true,
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-500" />
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-gray-600">#{rank}</span>
  }
}

const Leaderboard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
        </div>
        <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
          <option>This Week</option>
          <option>This Month</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
              player.isCurrentUser
                ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center w-12">{getRankIcon(player.rank)}</div>

            <img
              src={player.avatar || "/placeholder.svg"}
              alt={player.name}
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className={`font-bold ${player.isCurrentUser ? "text-blue-800" : "text-gray-800"}`}>
                  {player.name}
                </h3>
                {player.isCurrentUser && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">YOU</span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{player.gamesPlayed} games</span>
                <span>{player.winRate}% win rate</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-gray-800">{player.rating}</div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  player.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp className={`w-3 h-3 ${player.change < 0 ? "rotate-180" : ""}`} />
                <span>
                  {player.change >= 0 ? "+" : ""}
                  {player.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
          View Full Leaderboard
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
