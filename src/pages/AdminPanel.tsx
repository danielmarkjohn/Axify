import React, { useState } from 'react'
import { useStore } from '../store/appStore'
import { AppType } from '../types/app'
import { Wallpaper } from '../types/wallpaper'

export default function AdminPanel() {
  const { apps, addApp, removeApp, wallpapers, addWallpaper, removeWallpaper } = useStore()
  const [tab, setTab] = useState<'apps' | 'wallpapers'>('apps')

  const [appForm, setAppForm] = useState<Partial<AppType>>({
    id: '',
    name: '',
    icon: '',
    link: '',
    category: 'Tech'
  })

  const [wallForm, setWallForm] = useState<Partial<Wallpaper>>({
    id: '',
    title: '',
    imageUrl: '',
    resolution: ''
  })

  const handleSubmitApp = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: AppType = {
      id: appForm.id || Date.now().toString(),
      name: appForm.name || 'Untitled',
      icon: appForm.icon || 'https://via.placeholder.com/64',
      link: appForm.link || '#',
      category: (appForm.category as AppType['category']) || 'Tech'
    }
    addApp(payload)
    setAppForm({ id: '', name: '', icon: '', link: '', category: 'Tech' })
  }

  const handleSubmitWall = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: Wallpaper = {
      id: wallForm.id || Date.now().toString(),
      title: wallForm.title || 'Untitled',
      imageUrl: wallForm.imageUrl || 'https://via.placeholder.com/800x600',
      resolution: wallForm.resolution || ''
    }
    addWallpaper(payload)
    setWallForm({ id: '', title: '', imageUrl: '', resolution: '' })
  }

  return (
    <div className="bg-background text-foreground">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <div className="inline-flex rounded-lg border border-border overflow-hidden">
          <button onClick={() => setTab('apps')} className={`px-4 py-2 text-sm ${tab==='apps'?'bg-primary text-primary-foreground':'bg-card hover:bg-card-hover'}`}>Apps</button>
          <button onClick={() => setTab('wallpapers')} className={`px-4 py-2 text-sm ${tab==='wallpapers'?'bg-primary text-primary-foreground':'bg-card hover:bg-card-hover'}`}>Wallpapers</button>
        </div>
      </div>

      {tab === 'apps' ? (
        <>
          <form onSubmit={handleSubmitApp} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="p-2 rounded border border-border bg-background" placeholder="App Name" value={appForm.name||''} onChange={(e)=>setAppForm(f=>({...f,name:e.target.value}))} />
            <input className="p-2 rounded border border-border bg-background" placeholder="Icon URL" value={appForm.icon||''} onChange={(e)=>setAppForm(f=>({...f,icon:e.target.value}))} />
            <input className="p-2 rounded border border-border bg-background" placeholder="Link" value={appForm.link||''} onChange={(e)=>setAppForm(f=>({...f,link:e.target.value}))} />
            <select className="p-2 rounded border border-border bg-background" value={appForm.category} onChange={(e)=>setAppForm(f=>({...f,category:e.target.value as any}))}>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
              <option value="Tech">Tech</option>
              <option value="Living">Living</option>
              <option value="Tools">Tools</option>
            </select>
            <div className="md:col-span-2 flex justify-end gap-2">
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary-hover">Add / Update App</button>
            </div>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {apps.map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-card border border-border">
                <img src={a.icon} alt={a.name} className="w-12 h-12 rounded-lg object-cover mb-2" />
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-muted mb-1">{a.category}</p>
                <button onClick={() => removeApp(a.id)} className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm text-white">Delete</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmitWall} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="p-2 rounded border border-border bg-background" placeholder="Title" value={wallForm.title||''} onChange={(e)=>setWallForm(f=>({...f,title:e.target.value}))} />
            <input className="p-2 rounded border border-border bg-background" placeholder="Image URL" value={wallForm.imageUrl||''} onChange={(e)=>setWallForm(f=>({...f,imageUrl:e.target.value}))} />
            <input className="p-2 rounded border border-border bg-background" placeholder="Resolution (e.g., 3840x2160)" value={wallForm.resolution||''} onChange={(e)=>setWallForm(f=>({...f,resolution:e.target.value}))} />
            <div className="md:col-span-2 flex justify-end gap-2">
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary-hover">Add / Update Wallpaper</button>
            </div>
          </form>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wallpapers.map((w) => (
              <div key={w.id} className="p-2 rounded-lg bg-card border border-border">
                <img src={w.imageUrl} alt={w.title} className="w-full h-24 object-cover rounded mb-2" />
                <p className="font-medium">{w.title}</p>
                {w.resolution && <p className="text-sm text-muted mb-1">{w.resolution}</p>}
                <button onClick={() => removeWallpaper(w.id)} className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm text-white">Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
	  )
	}

