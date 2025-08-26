import React, { useState, useMemo } from 'react'
import { useStore } from '../store/appStore'
import AppCard from '../components/AppCard'
import AdminPanel from './AdminPanel'

export default function App() {
  const [adminMode, setAdminMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'price'>('name')
  const apps = useStore((s) => s.apps)

  const categories = ['All', 'Free', 'Paid', 'Tech', 'Living', 'Tools']

  const filteredAndSortedApps = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? apps 
      : apps.filter(app => app.category === selectedCategory)

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
  }, [apps, selectedCategory, sortBy])

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
    <div className="min-h-screen p-4 bg-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">App Store</h1>
        <button
          onClick={handleAdminToggle}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-white"
        >
          {adminMode ? 'User View' : 'Admin'}
        </button>
      </header>

      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Admin Access</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-900"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handlePasswordCancel}
                  className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
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
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded px-3 py-1 text-gray-900"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'price')}
              className="bg-white border border-gray-300 rounded px-3 py-1 text-gray-900"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredAndSortedApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  )
}
