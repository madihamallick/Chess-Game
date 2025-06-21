import React from "react"
import { Trophy, Star, Zap, Crown, Medal, Award } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  progress: number
  maxProgress: number
  unlocked: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
  xpReward: number
}

const achievements: Achievement[] = [
  {
    id: "first-win",
    name: "First Victory",
    description: "Win your first game",
    icon: <Trophy className="w-6 h-6" />,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    rarity: "common",
    xpReward: 50,
  },
  {
    id: "win-streak-5",
    name: "Hot Streak",
    description: "Win 5 games in a row",
    icon: <Zap className="w-6 h-6" />,
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    rarity: "rare",
    xpReward: 100,
  },
  {
    id: "checkmate-scholar",
    name: "Scholar's Mate",
    description: "Win with Scholar's Mate",
    icon: <Crown className="w-6 h-6" />,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    rarity: "epic",
    xpReward: 150,
  },
  {
    id: "grandmaster",
    name: "Grandmaster",
    description: "Reach 2500 rating",
    icon: <Medal className="w-6 h-6" />,
    progress: 1847,
    maxProgress: 2500,
    unlocked: false,
    rarity: "legendary",
    xpReward: 500,
  },
]

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-500",
}

const rarityBorders = {
  common: "border-gray-400",
  rare: "border-blue-400",
  epic: "border-purple-400",
  legendary: "border-yellow-400",
}

const AchievementSystem: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Award className="w-4 h-4" />
          <span>
            {achievements.filter((a) => a.unlocked).length}/{achievements.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

          return (
            <div
              key={achievement.id}
              className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} text-white ${rarityBorders[achievement.rarity]}`
                  : "bg-gray-50 border-gray-200 hover:border-gray-300"
              }`}
            >
              {achievement.unlocked && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Star className="w-4 h-4 text-yellow-800" />
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${achievement.unlocked ? "bg-white/20" : "bg-gray-200"}`}>
                  <div className={achievement.unlocked ? "text-white" : "text-gray-500"}>{achievement.icon}</div>
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${achievement.unlocked ? "text-white" : "text-gray-800"}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm mb-2 ${achievement.unlocked ? "text-white/90" : "text-gray-600"}`}>
                    {achievement.description}
                  </p>

                  {!achievement.unlocked && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        achievement.unlocked ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {achievement.rarity.toUpperCase()}
                    </span>
                    <span className={`text-xs font-semibold ${achievement.unlocked ? "text-white" : "text-gray-600"}`}>
                      +{achievement.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AchievementSystem
