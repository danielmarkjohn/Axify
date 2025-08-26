import React from 'react'
import { AppType } from '../types/app'

export default function AppCard({ app }: { app: AppType }) {
  return (
    <a
      href={app.link}
      target="_blank"
      rel="noopener noreferrer"
      className="border p-4 rounded-lg bg-gray-800 hover:shadow-lg transition"
    >
      <img src={app.icon} alt={app.name} className="w-16 h-16 mx-auto mb-2" />
      <h3 className="text-center">{app.name}</h3>
    </a>
  )
}
