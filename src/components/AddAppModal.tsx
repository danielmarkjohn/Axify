import React, { useState } from 'react'
import { useStore } from '../store/appStore'
import { AppType } from '../types/app'

export default function AddAppModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const addApp = useStore((s) => s.addApp)
  const [form, setForm] = useState<Partial<AppType>>({
    name: '',
    icon: '',
    link: '',
    category: 'Tech',
    price: undefined,
    description: '',
    tags: [],
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = Date.now().toString()
    const tags = (Array.isArray(form.tags) ? form.tags : (form.tags as any)?.split?.(',') || [])
      .map((t: string) => t.trim())
      .filter(Boolean)
    const payload: AppType = {
      id,
      name: form.name || 'Untitled',
      icon: form.icon || 'https://via.placeholder.com/64',
      link: form.link || '#',
      category: (form.category as AppType['category']) || 'Tech',
      price: form.price,
      description: form.description,
      tags,
    }
    addApp(payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Add New App</h3>
          <button onClick={onClose} className="text-foreground opacity-70 hover:opacity-100">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full p-2 rounded border border-border bg-background"
              value={form.name || ''}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Icon URL</label>
              <input
                className="w-full p-2 rounded border border-border bg-background"
                value={form.icon || ''}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Link</label>
              <input
                className="w-full p-2 rounded border border-border bg-background"
                value={form.link || ''}
                onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                className="w-full p-2 rounded border border-border bg-background"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as any }))}
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
                <option value="Tech">Tech</option>
                <option value="Living">Living</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Price (optional)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full p-2 rounded border border-border bg-background"
                value={form.price ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value === '' ? undefined : Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Tags (comma-separated)</label>
              <input
                className="w-full p-2 rounded border border-border bg-background"
                value={Array.isArray(form.tags) ? (form.tags as string[]).join(', ') : (form.tags as any) || ''}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full p-2 rounded border border-border bg-background"
              rows={4}
              value={form.description || ''}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="bg-secondary text-secondary-foreground hover:bg-secondary-hover px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 rounded">Add App</button>
          </div>
        </form>
      </div>
    </div>
  )
}

