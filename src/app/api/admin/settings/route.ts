import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ownerAuthOk } from '@/lib/config'

// GET: read all site settings (public, so the homepage can render editable content)
export async function GET() {
  const rows = await db.siteSetting.findMany()
  const map: Record<string, string> = {}
  for (const r of rows) map[r.key] = r.value
  return NextResponse.json({ settings: map })
}

// POST: upsert one or many settings. Owner-gated.
export async function POST(req: Request) {
  const passcode = req.headers.get('x-owner-passcode')
  if (!ownerAuthOk(passcode)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = (await req.json().catch(() => ({}))) as { settings?: Record<string, string> }
  if (!body.settings || typeof body.settings !== 'object') {
    return NextResponse.json({ error: 'settings object required' }, { status: 400 })
  }
  for (const [key, value] of Object.entries(body.settings)) {
    await db.siteSetting.upsert({ where: { key }, create: { key, value: String(value) }, update: { value: String(value), updatedAt: new Date() } })
  }
  return NextResponse.json({ ok: true })
}
