import React from 'react'
import { AppType } from '../types/app'

export default function DetailsModal({ app, onClose }: { app: AppType | null, onClose: () => void }) {
  if (!app) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-lg w-full p-5">
        <div className="flex items-start gap-4">
          <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl object-cover shadow-md" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{app.name}</h3>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-block bg-badge text-badge-text text-xs px-2 py-0.5 rounded-full">{app.category}</span>
              {app.price != null && (
                <span className="text-success font-semibold text-sm">${app.price}</span>
              )}
              {app.tags?.map((t) => (
                <span key={t} className="text-xs border border-border rounded px-2 py-0.5">#{t}</span>
              ))}
            </div>
            {app.description && (
              <p className="text-sm text-muted mb-3">{app.description}</p>
            )}
          </div>
          <button onClick={onClose} className="text-foreground opacity-70 hover:opacity-100">✕</button>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <a href={app.link} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 rounded">Open</a>
          <button onClick={onClose} className="bg-secondary text-secondary-foreground hover:bg-secondary-hover px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  )
}

