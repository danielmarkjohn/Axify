import React, { useState } from 'react'
import { useStore } from '../store/appStore'
import { AppType } from '../types/app'

export default function AdminPanel() {
  const { apps, addApp, removeApp } = useStore()
  const [form, setForm] = useState<AppType>({
    id: '',
    name: '',
    icon: '',
    link: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.id) form.id = Date.now().toString()
    addApp(form)
    setForm({ id: '', name: '', icon: '', link: '' })
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          className="w-full p-2 text-black"
          placeholder="App Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-2 text-black"
          placeholder="Icon URL"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />
        <input
          className="w-full p-2 text-black"
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <button className="bg-green-600 px-3 py-1 rounded" type="submit">
          Add / Update App
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {apps.map((a) => (
          <div key={a.id} className="border p-2 rounded bg-gray-800">
            <img src={a.icon} alt={a.name} className="w-12 h-12" />
            <p>{a.name}</p>
            <button
              onClick={() => removeApp(a.id)}
              className="bg-red-600 px-2 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
