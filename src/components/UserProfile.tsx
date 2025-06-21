import React from "react"
import { Trophy, Target, Medal } from "lucide-react"

interface UserProfileProps {
  user: {
    name: string
    avatar: string
    level: number
    xp: number
    xpToNext: number
    rating: number
    gamesPlayed: number
    winRate: number
    currentStreak: number
    bestStreak: number
    achievements: string[]
  }
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const xpPercentage = (user.xp / user.xpToNext) * 100

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <img
            src={user.avatar || "/placeholder.svg?height=80&width=80"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-yellow-400 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {user.level}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <span className="flex items-center">
              <Trophy className="w-4 h-4 mr-1" />
              {user.rating}
            </span>
            <span className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              {user.winRate}% Win Rate
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Level {user.level}</span>
          <span>
            {user.xp}/{user.xpToNext} XP
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-400">{user.currentStreak}</div>
          <div className="text-xs opacity-75">Current Streak</div>
        </div>
        <div className="bg-black/30 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{user.gamesPlayed}</div>
          <div className="text-xs opacity-75">Games Played</div>
        </div>
      </div>

      <div className="flex space-x-2">
        {user.achievements.slice(0, 4).map((achievement, index) => (
          <div key={index} className="bg-yellow-400/20 rounded-lg p-2">
            <Medal className="w-6 h-6 text-yellow-400" />
          </div>
        ))}
        {user.achievements.length > 4 && (
          <div className="bg-gray-700/50 rounded-lg p-2 flex items-center justify-center">
            <span className="text-xs">+{user.achievements.length - 4}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
