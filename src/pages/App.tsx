import React, { useState, useMemo } from 'react'
import { useStore } from '../store/appStore'
import AppCard from '../components/AppCard'
import AdminPanel from './AdminPanel'
import ThemeToggle from '../components/ThemeToggle'
import DetailsModal from '../components/DetailsModal'
import AddAppModal from '../components/AddAppModal'
import WallpaperCard from '../components/WallpaperCard'
import { appConfig } from '../config/appConfig'
import type { AppType } from '../types/app'
import type { Wallpaper } from '../types/wallpaper'

export default function App() {
  const [adminMode, setAdminMode] = useState(false)
  const [primary, setPrimary] = useState<'apps' | 'wallpapers'>('apps')
  const [selectedCategory, setSelectedCategory] = useState<string>(appConfig.text.allCategory)
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'price'>('name')
  const apps = useStore((s) => s.apps)
  const favorites = useStore((s) => s.favorites)
  const wallpapers = useStore((s) => s.wallpapers)

  const categories = [appConfig.text.allCategory, ...appConfig.categories]

  const [search, setSearch] = useState('')
  const [wallSearch, setWallSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [onlyFavs, setOnlyFavs] = useState(false)
  const [detailsApp, setDetailsApp] = useState<AppType | null>(null)

  const filteredAndSortedApps = useMemo(() => {
    let filtered = [...apps]

    if (selectedCategory !== appConfig.text.allCategory) {
      filtered = filtered.filter(app => app.category === selectedCategory)
    }

    if (onlyFavs) {
      filtered = filtered.filter(app => favorites[app.id])
    }

    const q = search.trim().toLowerCase()
    if (q) {
      filtered = filtered.filter(app => {
        const inName = app.name.toLowerCase().includes(q)
        const inCategory = app.category.toLowerCase().includes(q as any)
        const inTags = app.tags?.some(t => t.toLowerCase().includes(q))
        return inName || inCategory || inTags
      })
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'category':
          return a.category.localeCompare(b.category)
        case 'price':
          return (a.price || 0) - (b.price || 0)
        default:
          return 0
      }
    })
  }, [apps, favorites, selectedCategory, sortBy, search, onlyFavs])

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState('')

  const handleAdminToggle = () => {
    if (adminMode) {
      setAdminMode(false)
    } else {
      setShowPasswordPrompt(true)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === appConfig.adminPassword) {
      setAdminMode(true)
      setShowPasswordPrompt(false)
      setPassword('')
    } else {
      alert(appConfig.text.incorrectPasswordMessage)
    }
  }

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false)
    setPassword('')
  }

  return (
    <div className="min-h-screen p-2 sm:p-4 bg-background text-foreground">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">{appConfig.title}</h1>
          <nav className="inline-flex rounded-lg border border-border overflow-hidden">
            <button onClick={()=>setPrimary('apps')} className={`px-3 py-1 text-sm ${primary==='apps'?'bg-primary text-primary-foreground':'bg-card hover:bg-card-hover'}`}>Apps</button>
            <button onClick={()=>setPrimary('wallpapers')} className={`px-3 py-1 text-sm ${primary==='wallpapers'?'bg-primary text-primary-foreground':'bg-card hover:bg-card-hover'}`}>Wallpapers</button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleAdminToggle}
            className="bg-primary px-3 py-1 rounded hover:bg-primary-hover text-primary-foreground"
          >
            {adminMode ? appConfig.text.userViewButton : appConfig.text.adminButton}
          </button>
        </div>
      </header>

      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h2 className="text-lg font-bold mb-4">{appConfig.text.adminPasswordPrompt}</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder={appConfig.text.adminPasswordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-border rounded mb-4 bg-background text-foreground"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-primary px-4 py-2 rounded text-primary-foreground hover:bg-primary-hover"
                >
                  {appConfig.text.loginButton}
                </button>
                <button
                  type="button"
                  onClick={handlePasswordCancel}
                  className="bg-secondary px-4 py-2 rounded text-secondary-foreground hover:bg-secondary-hover"
                >
                  {appConfig.text.cancelButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!adminMode && primary==='apps' && (
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={appConfig.text.searchPlaceholder}
            className="w-full sm:w-auto bg-background border border-border rounded px-3 py-1"
          />

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={onlyFavs}
                onChange={(e) => setOnlyFavs(e.target.checked)}
              />
              {appConfig.text.favoritesOnlyLabel}
            </label>

            <div className="flex items-center gap-2">
              <label className="font-medium">{appConfig.text.categoryLabel}</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-background border border-border rounded px-3 py-1"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-medium">{appConfig.text.sortByLabel}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'price')}
                className="bg-background border border-border rounded px-3 py-1"
              >
                <option value="name">{appConfig.text.sortOptions.name}</option>
                <option value="category">{appConfig.text.sortOptions.category}</option>
                <option value="price">{appConfig.text.sortOptions.price}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {adminMode ? (
        <AdminPanel />
      ) : primary==='apps' ? (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            {filteredAndSortedApps.map((app) => (
              <AppCard key={app.id} app={app} onDetails={(a) => setDetailsApp(a)} />
            ))}
          </div>
          <DetailsModal app={detailsApp} onClose={() => setDetailsApp(null)} />
          <AddAppModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
        </>
      ) : (
        <>
          {!adminMode && (
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
              <input
                type="text"
                value={wallSearch}
                onChange={(e) => setWallSearch(e.target.value)}
                placeholder="Search wallpapers..."
                className="w-full sm:w-auto bg-background border border-border rounded px-3 py-1"
              />
            </div>
          )}
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
  )
}
