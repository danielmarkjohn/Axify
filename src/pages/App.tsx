import React, { useState } from 'react'
import { useStore } from '../store/appStore'
import AppCard from '../components/AppCard'
import AdminPanel from './AdminPanel'

export default function App() {
  const [adminMode, setAdminMode] = useState(false)
  const apps = useStore((s) => s.apps)

  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">App Store</h1>
        <button
          onClick={() => setAdminMode(!adminMode)}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
        >
          {adminMode ? 'User View' : 'Admin'}
        </button>
      </header>

      {adminMode ? (
        <AdminPanel />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  )
}
