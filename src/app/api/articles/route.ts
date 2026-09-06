import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: list published articles (explicit serialization to avoid DateTime issues)
export async function GET() {
  try {
    const articles = await db.article.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
    const safe = articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      category: a.category,
      title: a.title,
      insight: a.insight,
      body: a.body,
      stat: a.stat,
      statLabel: a.statLabel,
      delta: a.delta,
      readMins: a.readMins,
      published: a.published,
      metaDescription: a.metaDescription,
      keywords: a.keywords,
      ogImage: a.ogImage,
      externalLinks: a.externalLinks,
      createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : String(a.createdAt ?? ''),
      updatedAt: a.updatedAt instanceof Date ? a.updatedAt.toISOString() : String(a.updatedAt ?? ''),
    }))
    return NextResponse.json({ articles: safe })
  } catch (e) {
    console.error('articles list error', e)
    return NextResponse.json({ articles: [], error: 'db_error' }, { status: 200 })
  }
}

// POST: single article by slug
import { NextRequest } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json().catch(() => ({}))
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
    const a = await db.article.findUnique({ where: { slug } })
    if (!a) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json({
      article: {
        id: a.id, slug: a.slug, category: a.category, title: a.title, insight: a.insight, body: a.body,
        stat: a.stat, statLabel: a.statLabel, delta: a.delta, readMins: a.readMins, published: a.published,
        metaDescription: a.metaDescription, keywords: a.keywords, ogImage: a.ogImage, externalLinks: a.externalLinks,
        createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : String(a.createdAt ?? ''),
        updatedAt: a.updatedAt instanceof Date ? a.updatedAt.toISOString() : String(a.updatedAt ?? ''),
      },
    })
  } catch (e) {
    console.error('article by slug error', e)
    return NextResponse.json({ error: 'db_error' }, { status: 500 })
  }
}
