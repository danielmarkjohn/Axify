
import React, { useState, useEffect } from 'react'
import { useStore } from '../store/appStore'
import AdminPanel from './AdminPanel'
import { appConfig } from '../config/appConfig'
import Loader from '../components/Loader'
import AppsSection from '../components/AppsSection'
import WallpapersSection from '../components/WallpapersSection'

export default function App() {
  const [adminMode, setAdminMode] = useState(false)
  const [primary, setPrimary] = useState<'apps' | 'wallpapers'>('apps')
  
  const { apiConfig, isLoadingConfig, fetchConfig, configError } = useStore()
  
  // Use API config or fallback to local config
  const currentConfig = appConfig

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  // // NOW we can do conditional returns after all hooks are declared
  // if (isLoadingConfig) {
  //   return <Loader message="Loading configuration..." />
  // }

  // Show error state if config failed to load
  if (configError && !apiConfig) {
    console.warn('Failed to load API config, using local config:', configError)
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

            {/* Enhanced Navigation Tabs */}
            {!adminMode && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                <nav className="flex rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 p-1 shadow-2xl">
                  <button 
                    onClick={() => setPrimary('apps')} 
                    className={`relative px-8 py-4 text-sm font-semibold transition-all duration-300 rounded-xl ${
                      primary === 'apps' 
                        ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-xl shadow-purple-500/25 transform scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-102'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      🎮 <span>Apps & Games</span>
                    </span>
                    {primary === 'apps' && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl"></div>
                    )}
                  </button>
                  <button 
                    onClick={() => setPrimary('wallpapers')} 
                    className={`relative px-8 py-4 text-sm font-semibold transition-all duration-300 rounded-xl ${
                      primary === 'wallpapers' 
                        ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-xl shadow-purple-500/25 transform scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-102'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      🖼️ <span>Wallpapers</span>
                    </span>
                    {primary === 'wallpapers' && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl"></div>
                    )}
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>


      <div className="p-4 sm:p-6">
        {adminMode ? (
          <AdminPanel />
        ) : primary === 'apps' ? (
          <AppsSection />
        ) : (
          <WallpapersSection />
        )}
      </div>
    </div>
  )
}
