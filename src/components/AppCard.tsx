import React from 'react'
import { AppType } from '../types/app'

export default function AppCard({ app }: { app: AppType }) {
  return (
    <a
      href={app.link}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 hover:shadow-lg transition-all duration-200 block border border-gray-200"
    >
      <div className="flex flex-col items-center">
        <img 
          src={app.icon} 
          alt={app.name} 
          className="w-16 h-16 rounded-xl mb-3 object-cover shadow-md" 
        />
        <h3 className="text-center font-medium text-gray-900 mb-2">{app.name}</h3>
        <div className="text-center">
          <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-700 mb-1">
            {app.category}
          </span>
          {app.price && (
            <div className="text-green-600 font-semibold text-sm">
              ${app.price}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}
