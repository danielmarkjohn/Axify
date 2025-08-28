import { Wallpaper } from '../types/wallpaper'

export default function WallpaperCard({ wp }: { wp: Wallpaper }) {
  const download = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const a = document.createElement('a')
      a.href = wp.imageUrl
      a.download = `${wp.title || 'wallpaper'}.jpg`
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch {}
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl transition-all cursor-pointer">
      <img src={wp.imageUrl} alt={wp.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white drop-shadow">{wp.title}</p>
          {wp.resolution && <p className="text-xs text-white/80">{wp.resolution}</p>}
        </div>
        <button onClick={download} className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded hover:bg-primary-hover">
          Download
        </button>
      </div>
    </div>
  )
}

