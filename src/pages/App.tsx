import React, { useState, useMemo } from 'react'
import { useStore } from '../store/appStore'
import AppCard from '../components/AppCard'
import AdminPanel from './AdminPanel'
import ThemeToggle from '../components/ThemeToggle'
import DetailsModal from '../components/DetailsModal'
import AddAppCard from '../components/AddAppCard'
import AddAppModal from '../components/AddAppModal'
import type { AppType } from '../types/app'


export default function App() {
  const [adminMode, setAdminMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'price'>('name')
  const apps = useStore((s) => s.apps)
  const favorites = useStore((s) => s.favorites)

  const categories = ['All', 'Free', 'Paid', 'Tech', 'Living', 'Tools']

  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const [onlyFavs, setOnlyFavs] = useState(false)
  const [detailsApp, setDetailsApp] = useState<AppType | null>(null)

  const filteredAndSortedApps = useMemo(() => {
    let filtered = [...apps]

    if (selectedCategory !== 'All') {
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
    if (password === 'admin123') {
      setAdminMode(true)
      setShowPasswordPrompt(false)
    } else {
      alert('Incorrect password')
    }
  }

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false)
  }

  return (
    <div className="min-h-screen p-4 bg-background text-foreground">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">App Store</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleAdminToggle}
            className="bg-primary px-3 py-1 rounded hover:bg-primary-hover text-primary-foreground"
          >
            {adminMode ? 'User View' : 'Admin'}
          </button>
        </div>
      </header>

      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h2 className="text-lg font-bold mb-4">Admin Access</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Enter admin password"
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
                  Login
                </button>
                <button
                  type="button"
                  onClick={handlePasswordCancel}
                  className="bg-secondary px-4 py-2 rounded text-secondary-foreground hover:bg-secondary-hover"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!adminMode && (
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search apps..."
            className="bg-background border border-border rounded px-3 py-1"
          />

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={onlyFavs}
              onChange={(e) => setOnlyFavs(e.target.checked)}
            />
            Favorites only
          </label>

          <div className="flex items-center gap-2">
            <label className="font-medium">Category:</label>
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
            <label className="font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'price')}
              className="bg-background border border-border rounded px-3 py-1"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      )}

      {adminMode ? (
        <AdminPanel />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AddAppCard onClick={() => setShowAdd(true)} />
            {filteredAndSortedApps.map((app) => (
              <AppCard key={app.id} app={app} onDetails={(a) => setDetailsApp(a)} />
            ))}
          </div>
          <DetailsModal app={detailsApp} onClose={() => setDetailsApp(null)} />
          <AddAppModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
        </>
      )}
    </div>
  )
}
