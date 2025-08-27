export type AppType = {
  id: string
  name: string
  icon: string
  link: string
  category: 'Free' | 'Paid' | 'Tech' | 'Living' | 'Tools'
  price?: number
  description?: string
  tags?: string[]
}
