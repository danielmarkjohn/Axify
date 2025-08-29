import { AppType } from '../types/app'

export const defaultApps: AppType[] = [
  {
    id: '1',
    name: 'AxGaming',
    icon: 'https://cu4qgctmgixbz3il.public.blob.vercel-storage.com/gaming',
    link: 'https://gaming.axsphere.in/',
    category: 'Free',
    description: 'Track your Game stats and game library with rich charts.',
    tags: ['games', 'steam', 'charts']
  },
  {
    id: '2',
    name: 'AxTools',
    icon: 'https://cu4qgctmgixbz3il.public.blob.vercel-storage.com/tools',
    link: 'https://tools.axsphere.in/',
    category: 'Free',
    description: 'Advanced toolbox for automation and productivity.',
    tags: ['productivity', 'automation']
  },
  {
    id: '3',
    name: 'AxHub',
    icon: 'https://cu4qgctmgixbz3il.public.blob.vercel-storage.com/axsphere',
    link: 'https://axsphere.in/',
    category: 'Free',
    description: 'Discover AI tools and integrations from Axsphere.',
    tags: ['ai', 'integrations']
  },
  {
    id: '4',
    name: 'Spacer Racing',
    icon: 'https://cu4qgctmgixbz3il.public.blob.vercel-storage.com/ax-spacer',
    link: 'https://spaceracing.axsphere.in/',
    category: 'Free',
    description: 'Racing Game.',
    tags: ['gaming', 'race']
  }
]
