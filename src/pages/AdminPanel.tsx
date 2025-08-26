import React, { useState } from 'react'
import { useStore } from '../store/appStore'
import { AppType } from '../types/app'

export default function AdminPanel() {
  const { apps, addApp, removeApp } = useStore()
  const [form, setForm] = useState<any>({
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
    <div className="bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          className="w-full p-2 text-gray-900 border border-gray-300 rounded"
          placeholder="App Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-2 text-gray-900 border border-gray-300 rounded"
          placeholder="Icon URL"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
        />
        <input
          className="w-full p-2 text-gray-900 border border-gray-300 rounded"
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <select
          className="w-full p-2 text-gray-900 border border-gray-300 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as AppType['category'] })}
        >
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
          <option value="Tech">Tech</option>
          <option value="Living">Living</option>
          <option value="Tools">Tools</option>
        </select>
        <button className="bg-green-600 px-3 py-1 rounded text-white hover:bg-green-700" type="submit">
          Add / Update App
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {apps.map((a) => (
          <div key={a.id} className="p-3 rounded-lg bg-gray-100 border border-gray-200">
            <img src={a.icon} alt={a.name} className="w-12 h-12 rounded-lg object-cover mb-2" />
            <p className="font-medium text-gray-900">{a.name}</p>
            <p className="text-sm text-gray-600 mb-1">{a.category}</p>
            {a.price && <p className="text-sm text-green-600 mb-2">${a.price}</p>}
            <button
              onClick={() => removeApp(a.id)}
              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm transition-colors text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
