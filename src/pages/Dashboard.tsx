"use client";

import React from "react";
import { useState } from "react";
import mockGames from "../data/mockGames.json";
import GameCard from "../components/GameCard";
import UserProfile from "../components/UserProfile";
import GameModeSelector from "../components/GameModeSelector";
import AchievementSystem from "../components/AchievementSystem";
import DailyChallenges from "../components/DailyChallenges";
import Leaderboard from "../components/Leaderboard";
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Trophy,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("play");

  // Mock user data
  const currentUser = {
    name: "ChessPlayer",
    avatar: "/images/profile.webp",
    level: 12,
    xp: 2847,
    xpToNext: 3500,
    rating: 1847,
    gamesPlayed: 234,
    winRate: 72.4,
    currentStreak: 5,
    bestStreak: 12,
    achievements: [
      "first-win",
      "win-streak-5",
      "daily-player",
      "opening-master",
    ],
  };

  const filteredGames = mockGames
    .filter(
      (game) =>
        game.whitePlayer.toLowerCase().includes(search.toLowerCase()) ||
        game.blackPlayer.toLowerCase().includes(search.toLowerCase()) ||
        game.opening.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sort === "recent"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .slice((page - 1) * 6, page * 6);

  const handleGameModeSelect = (mode: any) => {
    window.location.href = `/game/new?mode=${mode.id}`;
  };

  const tabs = [
    { id: "play", label: "Play", icon: <Users className="w-4 h-4" /> },
    { id: "history", label: "History", icon: <Calendar className="w-4 h-4" /> },
    {
      id: "achievements",
      label: "Achievements",
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ChessHub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <UserProfile user={currentUser} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-sm mb-8">
              <div className="flex space-x-1 p-1 flex-wrap">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "play" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Choose Your Game Mode
                  </h2>
                  <GameModeSelector onSelectMode={handleGameModeSelect} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <DailyChallenges />
                  <Leaderboard />
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by player or opening..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <option value="recent">Most Recent</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredGames.map((game) => (
                      <div key={game.id} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <GameCard game={game} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-8 space-x-4">
                    <button
                      className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </button>
                    <button
                      className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={filteredGames.length < 6}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && <AchievementSystem />}

            {activeTab === "leaderboard" && <Leaderboard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
