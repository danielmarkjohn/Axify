import React from 'react'
import { AppType } from '../types/app'
import { appConfig } from '../config/appConfig'

export default function DetailsModal({ app, onClose }: { app: AppType | null, onClose: () => void }) {
  if (!app) return null
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-border/20 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with large icon */}
        <div className="relative p-6 pb-4">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <img 
                src={app.icon} 
                alt={app.name} 
                className="w-24 h-24 rounded-3xl object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-foreground">{app.name}</h3>
            
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {app.category}
              </span>
              {app.price != null && (
                <span className="text-success font-bold text-lg">${app.price}</span>
              )}
            </div>
            
            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {app.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-muted/20 text-muted px-2 py-1 rounded-lg text-xs hover:bg-muted/30 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {app.description && (
          <div className="px-6 pb-4">
            <p className="text-muted leading-relaxed text-center">{app.description}</p>
          </div>
        )}

        {/* Action button */}
        <div className="p-6 pt-2">
          <a 
            href={app.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>{appConfig.text.openButton}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

