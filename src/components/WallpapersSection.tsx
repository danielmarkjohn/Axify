import React, { useState, useMemo } from 'react'
import { useStore } from '../store/appStore'
import WallpaperCard from './WallpaperCard'

export default function WallpapersSection() {
  const [wallSearch, setWallSearch] = useState('')
  
  const wallpapers = useStore((s) => s.wallpapers)

  const filteredWallpapers = useMemo(() => {
    const q = wallSearch.trim().toLowerCase()
    if (!q) return wallpapers
    
    return wallpapers.filter(w => 
      w.title.toLowerCase().includes(q) || 
      (w.tags || []).some(t => t.toLowerCase().includes(q))
    )
  }, [wallpapers, wallSearch])

  return (
    <>
      {/* Wallpaper Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            value={wallSearch}
            onChange={(e) => setWallSearch(e.target.value)}
            placeholder="🔍 Search wallpapers..."
            className="w-full pl-4 pr-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Wallpapers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {filteredWallpapers.map((w) => (
          <WallpaperCard key={w.id} wp={w} />
        ))}
      </div>
    </>
  )
}