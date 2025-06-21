"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Smile, Settings, Users, MessageCircle } from "lucide-react"

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
  type: "message" | "system" | "emoji"
  avatar?: string
}

interface EnhancedChatProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  currentUser: string
}

const emojis = ["😊", "😢", "😮", "👍", "👎", "🔥", "💯", "🎯", "⚡", "🏆"]

const EnhancedChat: React.FC<EnhancedChatProps> = ({ messages, onSendMessage, currentUser }) => {
  const [inputValue, setInputValue] = useState("")
  const [showEmojis, setShowEmojis] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  const handleEmojiClick = (emoji: string) => {
    onSendMessage(emoji)
    setShowEmojis(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-800">Game Chat</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">2 online</span>
          <Settings className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-3 py-2 rounded-2xl ${
                message.type === "system"
                  ? "bg-gray-100 text-gray-600 text-center text-sm"
                  : message.sender === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.type !== "system" && message.sender !== currentUser && (
                <div className="text-xs font-semibold mb-1 opacity-75">{message.sender}</div>
              )}
              <div className={message.type === "emoji" ? "text-2xl" : ""}>{message.text}</div>
              <div
                className={`text-xs mt-1 opacity-75 ${
                  message.sender === currentUser ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showEmojis && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiClick(emoji)}
                className="text-2xl hover:bg-gray-200 rounded-lg p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-2 border-t border-gray-200">
        <div className="flex space-x-1 flex-wrap">
          <button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className=" hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-2 py-2 border w-[11rem] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default EnhancedChat
