import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ownerAuthOk } from '@/lib/config'
import { z } from 'zod'

// GET: list all articles (admin sees unpublished too) — passcode optional
export async function GET(req: Request) {
  const passcode = req.headers.get('x-owner-passcode')
  const authed = ownerAuthOk(passcode)
  const where = authed ? {} : { published: true }
  const articles = await db.article.findMany({ where, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ articles })
}

const articleSchema = z.object({
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/),
  category: z.string().min(1).max(120),
  title: z.string().min(2).max(300),
  insight: z.string().min(2).max(500),
  body: z.string().min(2),
  stat: z.string().max(40).optional(),
  statLabel: z.string().max(120).optional(),
  delta: z.string().max(40).optional(),
  readMins: z.number().int().min(1).max(120).optional(),
  published: z.boolean().optional(),
  metaDescription: z.string().max(500).optional(),
  keywords: z.string().max(500).optional(),
  ogImage: z.string().max(500).optional(),
  externalLinks: z.string().max(2000).optional(),
})

// POST: create or update (upsert by slug). Owner-gated.
export async function POST(req: Request) {
  const passcode = req.headers.get('x-owner-passcode')
  if (!ownerAuthOk(passcode)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const parsed = articleSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_input', issues: parsed.error.issues }, { status: 400 })
  const d = parsed.data
  const article = await db.article.upsert({
    where: { slug: d.slug },
    create: { ...d },
    update: { ...d, updatedAt: new Date() },
  })
  return NextResponse.json({ ok: true, article })
}

// DELETE: by slug
export async function DELETE(req: Request) {
  const passcode = req.headers.get('x-owner-passcode')
  if (!ownerAuthOk(passcode)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
  await db.article.delete({ where: { slug } })
  return NextResponse.json({ ok: true })
}
