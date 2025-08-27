import { AppType } from '../types/app'
import { useStore } from '../store/appStore'
import { appConfig } from '../config/appConfig'
import { useState } from 'react'

export default function AppCard({ app, onDetails }: { app: AppType, onDetails: (app: AppType) => void }) {
  const toggleFavorite = useStore((s) => s.toggleFavorite)
  const favorites = useStore((s) => s.favorites)
  const isFav = !!favorites[app.id]
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div 
      className="group p-3 sm:p-4 transition-all duration-300 w-full cursor-pointer hover:scale-105 active:scale-95 relative" 
      onClick={() => window.open(app.link, '_blank')}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <div className="flex flex-col items-center text-center">
        {/* Large App Icon */}
        <div className="relative mb-2 sm:mb-3">
          <img
            src={app.icon}
            alt={app.name}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl object-cover shadow-lg group-hover:shadow-2xl transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Heart - positioned over icon */}
          <button
            aria-label={isFav ? appConfig.text.toggleFavoriteRemove : appConfig.text.toggleFavoriteAdd}
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorite(app.id)
            }}
            className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-200 backdrop-blur-sm"
          >
            <span className="text-xs sm:text-sm">{isFav ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* App Name */}
        <h3 className="font-medium text-xs sm:text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors duration-200 max-w-full">
          {app.name}
        </h3>
      </div>

      {/* Hover Preview Popover */}
      {showPreview && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-card border border-border/20 rounded-xl shadow-2xl p-4 w-64 backdrop-blur-sm">
            <div className="flex items-start gap-3 mb-3">
              <img 
                src={app.icon} 
                alt={app.name} 
                className="w-12 h-12 rounded-xl object-cover shadow-md flex-shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground mb-1 truncate">{app.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-medium">
                    {app.category}
                  </span>
                  {app.price != null && (
                    <span className="text-success font-semibold text-xs">${app.price}</span>
                  )}
                </div>
              </div>
            </div>
            
            {app.description && (
              <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-3">
                {app.description}
              </p>
            )}
            
            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {app.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-muted/20 text-muted px-2 py-0.5 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {app.tags.length > 3 && (
                  <span className="text-muted text-xs">+{app.tags.length - 3} more</span>
                )}
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(app.link, '_blank')
                }}
                className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground text-xs py-2 px-3 rounded-lg transition-colors duration-200 font-medium"
              >
                {appConfig.text.openButton}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDetails(app)
                }}
                className="bg-secondary hover:bg-secondary-hover text-secondary-foreground text-xs py-2 px-3 rounded-lg transition-colors duration-200"
              >
                Details
              </button>
            </div>
            
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
