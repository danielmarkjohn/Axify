import { AppType } from '../types/app'
import { useStore } from '../store/appStore'

export default function AppCard({ app, onDetails }: { app: AppType, onDetails: (app: AppType) => void }) {
  const toggleFavorite = useStore((s) => s.toggleFavorite)
  const favorites = useStore((s) => s.favorites)
  const isFav = !!favorites[app.id]

  return (
    <div className="p-4 rounded-lg bg-card hover:bg-card-hover hover:shadow-lg transition-all duration-200 border border-border w-full h-full" style={{ minHeight: 170 }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={app.icon}
            alt={app.name}
            className="w-12 h-12 rounded-xl object-cover shadow-md"
          />
          <div>
            <h3 className="font-medium">{app.name}</h3>
            <span className="inline-block bg-badge px-2 py-0.5 rounded-full text-xs text-badge-text">
              {app.category}
            </span>
          </div>
        </div>
        <button
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => toggleFavorite(app.id)}
          className="text-foreground/70 hover:text-foreground"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      {app.price && (
        <div className="text-success font-semibold text-sm mb-3">${app.price}</div>
      )}

      <div className="flex gap-2">
        <a
          href={app.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-primary px-3 py-1 rounded hover:bg-primary-hover text-primary-foreground"
        >
          Open
        </a>
        <button
          onClick={() => onDetails(app)}
          className="px-3 py-1 rounded border border-border bg-background hover:bg-card-hover"
        >
          Details
        </button>
      </div>
    </div>
  )
}
