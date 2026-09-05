import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IndustryScope — AI Operating System for Industry & Supply Chain',
    short_name: 'IndustryScope',
    description: 'See Your Entire Operation. Understand Every Signal. Act Before the Problem.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070b12',
    theme_color: '#10b981',
    lang: 'fa',
    dir: 'rtl',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    categories: ['business', 'productivity', 'utilities'],
  }
}
