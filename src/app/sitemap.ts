import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://industryscope.io'
  const now = new Date()
  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1, alternates: { languages: { 'fa-IR': base, en: base } } },
  ]
  // Include published articles as deep links (hash routes)
  try {
    const articles = await db.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })
    for (const a of articles) {
      entries.push({ url: `${base}/#intelligence/${a.slug}`, lastModified: a.updatedAt, changeFrequency: 'monthly', priority: 0.7 })
    }
  } catch { /* db may be mid-seed */ }
  return entries
}
