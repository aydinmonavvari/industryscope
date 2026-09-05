import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const articles = await db.article.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ articles: articles.map((a) => ({ ...a })) })
}

// Single article by slug
import { NextRequest } from 'next/server'
export async function POST(req: NextRequest) {
  const { slug } = await req.json().catch(() => ({}))
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
  const article = await db.article.findUnique({ where: { slug } })
  if (!article) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({ article })
}
