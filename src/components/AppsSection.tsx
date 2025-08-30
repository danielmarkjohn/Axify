import React, { useState, useMemo } from 'react'
import { useStore } from '../store/appStore'
import AppCard from './AppCard'
import DetailsModal from './DetailsModal'
import AddAppModal from './AddAppModal'
import type { AppType } from '../types/app'

export default function AppsSection() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [detailsApp, setDetailsApp] = useState<AppType | null>(null)
  const [appCategory, setAppCategory] = useState<'all' | 'apps' | 'games'>('apps') // Changed default to 'apps'
  const [filterBy, setFilterBy] = useState<'all' | 'category' | 'tags'>('all')
  
  const apps = useStore((s) => s.apps)

  const filteredApps = useMemo(() => {
    const q = search.trim().toLowerCase()
    let filtered = apps
    
    // Filter by app category (Apps vs Games) - now defaults to Apps only
    if (appCategory === 'apps') {
      filtered = filtered.filter(app => app.category === 'Apps')
    } else if (appCategory === 'games') {
      filtered = filtered.filter(app => app.category === 'Gaming')
    }
    
    // Apply search filter
    if (q) {
      filtered = filtered.filter(app => {
        const inName = app.name.toLowerCase().includes(q)
        const inCategory = app.category.toLowerCase().includes(q)
        const inTags = app.tags?.some(t => t.toLowerCase().includes(q))
        
        if (filterBy === 'category') return inCategory
        if (filterBy === 'tags') return inTags
        return inName || inCategory || inTags
      })
    }
    
    return filtered
  }, [apps, search, appCategory, filterBy])

  return (
    <>
      {/* Enhanced Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search apps and games..."
            className="w-full pl-4 pr-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-200"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={appCategory}
              onChange={(e) => setAppCategory(e.target.value as any)}
              className="appearance-none px-4 py-3 pr-10 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-white focus:border-purple-400 focus:outline-none transition-all duration-200 cursor-pointer"
            >
              <option value="apps">Apps</option>
              <option value="games">Games</option>
              <option value="all">All</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} onDetails={(a) => setDetailsApp(a)} />
        ))}
      </div>
      
      <DetailsModal app={detailsApp} onClose={() => setDetailsApp(null)} />
      <AddAppModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
    </>
  )
}
