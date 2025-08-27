import { create } from 'zustand'
import { AppType } from '../types/app'
import { defaultApps } from '../config/defaultApps'

type State = {
  apps: AppType[]
  favorites: Record<string, boolean>
  toggleFavorite: (id: string) => void
  addApp: (app: AppType) => void
  removeApp: (id: string) => void
}

const loadFavorites = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem('favorites')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

const persistFavorites = (fav: Record<string, boolean>) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(fav))
  } catch {}
}

export const useStore = create<State>((set, get) => ({
  apps: defaultApps,
  favorites: loadFavorites(),
  toggleFavorite: (id) => {
    const current = { ...get().favorites }
    current[id] = !current[id]
    persistFavorites(current)
    set({ favorites: current })
  },
  addApp: (app) =>
    set((state) => {
      const exists = state.apps.find((a) => a.id === app.id)
      if (exists) {
        return { apps: state.apps.map((a) => (a.id === app.id ? app : a)) }
      }
      return { apps: [...state.apps, app] }
    }),
  removeApp: (id) => set((state) => ({ apps: state.apps.filter((a) => a.id !== id) })),
}))
