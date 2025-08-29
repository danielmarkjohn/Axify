import React from 'react'

interface LoaderProps {
  message?: string
}

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Gaming-style spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Loading text with glow effect */}
        <p className="text-lg font-medium text-white mb-2 animate-pulse">
          Loading
        </p>
        
        {/* Gaming-style dots animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
