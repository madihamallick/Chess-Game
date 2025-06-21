import React from "react"
import { Calendar, Clock, Star, Gift, CheckCircle } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  maxProgress: number
  reward: {
    xp: number
    coins?: number
    item?: string
  }
  timeLeft: string
  completed: boolean
  difficulty: "easy" | "medium" | "hard"
}

const challenges: Challenge[] = [
  {
    id: "daily-win",
    title: "Daily Victory",
    description: "Win 3 games today",
    progress: 2,
    maxProgress: 3,
    reward: { xp: 100, coins: 50 },
    timeLeft: "18h 32m",
    completed: false,
    difficulty: "easy",
  },
  {
    id: "opening-master",
    title: "Opening Master",
    description: "Play 5 different openings",
    progress: 5,
    maxProgress: 5,
    reward: { xp: 200, item: "Chess Set Skin" },
    timeLeft: "18h 32m",
    completed: true,
    difficulty: "medium",
  },
  {
    id: "blitz-champion",
    title: "Blitz Champion",
    description: "Win 10 blitz games",
    progress: 7,
    maxProgress: 10,
    reward: { xp: 300, coins: 150 },
    timeLeft: "18h 32m",
    completed: false,
    difficulty: "hard",
  },
]

const difficultyColors = {
  easy: "from-green-400 to-green-600",
  medium: "from-yellow-400 to-orange-500",
  hard: "from-red-400 to-red-600",
}

const DailyChallenges: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Daily Challenges</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Resets in 18h 32m</span>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => {
          const progressPercentage = (challenge.progress / challenge.maxProgress) * 100

          return (
            <div
              key={challenge.id}
              className={`relative rounded-xl p-4 border-2 transition-all duration-300 ${
                challenge.completed
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300"
              }`}
            >
              {challenge.completed && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-800">{challenge.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${difficultyColors[challenge.difficulty]} text-white`}
                    >
                      {challenge.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{challenge.timeLeft}</span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>
                    {challenge.progress}/{challenge.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      challenge.completed
                        ? "bg-green-500"
                        : `bg-gradient-to-r ${difficultyColors[challenge.difficulty]}`
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{challenge.reward.xp} XP</span>
                  </div>
                  {challenge.reward.coins && (
                    <div className="flex items-center space-x-1 text-sm">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <span className="font-semibold">{challenge.reward.coins}</span>
                    </div>
                  )}
                  {challenge.reward.item && (
                    <div className="flex items-center space-x-1 text-sm">
                      <Gift className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-purple-600">{challenge.reward.item}</span>
                    </div>
                  )}
                </div>

                {challenge.completed && (
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                    Claim Reward
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyChallenges
