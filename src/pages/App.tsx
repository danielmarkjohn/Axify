
import React, { useState, useMemo, useEffect } from 'react'
import { useStore } from '../store/appStore'
import AppCard from '../components/AppCard'
import AdminPanel from './AdminPanel'
import ThemeToggle from '../components/ThemeToggle'
import DetailsModal from '../components/DetailsModal'
import AddAppModal from '../components/AddAppModal'
import WallpaperCard from '../components/WallpaperCard'
import { appConfig } from '../config/appConfig'
import type { AppType } from '../types/app'
import Loader from '../components/Loader'

export default function App() {
  // Move ALL hooks to the top before any conditional returns
  const [adminMode, setAdminMode] = useState(false)
  const [primary, setPrimary] = useState<'apps' | 'wallpapers'>('apps')
  const [search, setSearch] = useState('')
  const [wallSearch, setWallSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [detailsApp, setDetailsApp] = useState<any>(null)
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState('')
  
  const apps = useStore((s) => s.apps)
  const wallpapers = useStore((s) => s.wallpapers)
  const { apiConfig, isLoadingConfig, fetchConfig, configError } = useStore()
  
  // Use API config or fallback to local config
  const currentConfig = appConfig

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  const filteredApps = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return apps
    
    return apps.filter(app => {
      const inName = app.name.toLowerCase().includes(q)
      const inCategory = app.category.toLowerCase().includes(q)
      const inTags = app.tags?.some(t => t.toLowerCase().includes(q))
      return inName || inCategory || inTags
    })
  }, [apps, search])

  // NOW we can do conditional returns after all hooks are declared
  if (isLoadingConfig) {
    return <Loader message="Loading configuration..." />
  }

  // Show error state if config failed to load
  if (configError && !apiConfig) {
    console.warn('Failed to load API config, using local config:', configError)
  }

  const handleAdminToggle = () => {
    if (adminMode) {
      setAdminMode(false)
    } else {
      setShowPasswordPrompt(true)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === currentConfig.adminPassword) {
      setAdminMode(true)
      setShowPasswordPrompt(false)
      setPassword('')
    } else {
      alert(currentConfig.text.incorrectPasswordMessage)
    }
  }

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false)
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Gaming-style header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-600/20"></div>
        <div className="relative p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            {/* Title and Admin Button Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
                {currentConfig.title}
              </h1>
            </div>

            {/* Navigation Tabs - Vertical on Mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <nav className="flex flex-col sm:flex-row rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 overflow-hidden">
                <button 
                  onClick={() => setPrimary('apps')} 
                  className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    primary === 'apps' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  🎮 Apps
                </button>
                <button 
                  onClick={() => setPrimary('wallpapers')} 
                  className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    primary === 'wallpapers' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  🖼️ Wallpapers
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-500/30 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {currentConfig.text.adminPasswordPrompt}
            </h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder={currentConfig.text.adminPasswordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-500/30 rounded-lg mb-4 bg-black/50 text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
                >
                  {currentConfig.text.loginButton}
                </button>
                <button
                  type="button"
                  onClick={handlePasswordCancel}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
                >
                  {currentConfig.text.cancelButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-6">
        {adminMode ? (
          <AdminPanel />
        ) : primary === 'apps' ? (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="🔍 Search apps..."
                  className="w-full pl-4 pr-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-all duration-200"
                />
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
        ) : (
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
              {wallpapers
                .filter(w => wallSearch.trim() ? (w.title.toLowerCase().includes(wallSearch.trim().toLowerCase()) || (w.tags||[]).some(t=>t.toLowerCase().includes(wallSearch.trim().toLowerCase()))) : true)
                .map((w) => (
                  <WallpaperCard key={w.id} wp={w} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
