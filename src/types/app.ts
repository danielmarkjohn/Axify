export type AppType = {
  id: string
  name: string
  icon: string
  link: string
  category: 'Gaming' | 'Apps'
  price?: number
  description?: string
  tags?: string[]
}
