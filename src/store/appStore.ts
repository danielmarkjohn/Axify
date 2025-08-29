import { create } from 'zustand'
import { AppType } from '../types/app'
import { Wallpaper } from '../types/wallpaper'
import { defaultApps } from '../config/defaultApps'
import { defaultWallpapers } from '../config/defaultWallpapers'
import { apiService, ApiAppConfig } from '../services/api'

type State = {
  // Apps
  apps: AppType[]
  favorites: Record<string, boolean>
  toggleFavorite: (id: string) => void
  addApp: (app: AppType) => void
  removeApp: (id: string) => void
  // Wallpapers
  wallpapers: Wallpaper[]
  addWallpaper: (wall: Wallpaper) => void
  removeWallpaper: (id: string) => void
  // API Config
  apiConfig: ApiAppConfig | null
  isLoadingConfig: boolean
  configError: string | null
  fetchConfig: () => Promise<void>
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
  wallpapers: defaultWallpapers,
  apiConfig: null,
  isLoadingConfig: false,
  configError: null,
  
  fetchConfig: async () => {
    set({ isLoadingConfig: true, configError: null })
    try {
      const config = await apiService.getAppConfig()
      set({ apiConfig: config, isLoadingConfig: false })
    } catch (error) {
      set({ 
        configError: error instanceof Error ? error.message : 'Failed to load config',
        isLoadingConfig: false 
      })
    }
  },
  
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
  addWallpaper: (wall) =>
    set((state) => {
      const exists = state.wallpapers.find((w) => w.id === wall.id)
      if (exists) {
        return { wallpapers: state.wallpapers.map((w) => (w.id === wall.id ? wall : w)) }
      }
      return { wallpapers: [...state.wallpapers, wall] }
    }),
  removeWallpaper: (id) =>
    set((state) => ({ wallpapers: state.wallpapers.filter((w) => w.id !== id) })),
}))
