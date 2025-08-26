import { create } from 'zustand'
import { AppType } from '../types/app'
import { defaultApps } from '../config/defaultApps'

type State = {
  apps: AppType[]
  addApp: (app: AppType) => void
  removeApp: (id: string) => void
}

export const useStore = create<State>((set) => ({
  apps: defaultApps,
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
