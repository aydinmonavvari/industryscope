import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ownerAuthOk } from '@/lib/config'

// Owner CRM: list leads + stats. Passcode via x-owner-passcode header.
export async function GET(req: Request) {
  const passcode = req.headers.get('x-owner-passcode')
  if (!ownerAuthOk(passcode)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 500 })
  const subs = await db.newsletterSubscriber.count()
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    won: leads.filter((l) => l.status === 'won').length,
    lost: leads.filter((l) => l.status === 'lost').length,
    byType: {
      contact: leads.filter((l) => l.type === 'contact').length,
      demo: leads.filter((l) => l.type === 'demo').length,
      quote: leads.filter((l) => l.type === 'quote').length,
      partnership: leads.filter((l) => l.type === 'partnership').length,
    },
    newsletterSubscribers: subs,
  }
  return NextResponse.json({ stats, leads: leads.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() })) })
}

// Update lead status (owner)
export async function PATCH(req: Request) {
  const passcode = req.headers.get('x-owner-passcode')
  if (!ownerAuthOk(passcode)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const { id, status } = body as { id?: string; status?: string }
  if (!id || !status) return NextResponse.json({ error: 'id+status required' }, { status: 400 })
  const valid = ['new', 'contacted', 'qualified', 'won', 'lost']
  if (!valid.includes(status)) return NextResponse.json({ error: 'invalid status' }, { status: 400 })
  const updated = await db.lead.update({ where: { id }, data: { status } })
  return NextResponse.json({ ok: true, status: updated.status })
}

// Delete lead (owner)
export async function DELETE(req: Request) {
  const passcode = req.headers.get('x-owner-passcode')
  if (!ownerAuthOk(passcode)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await db.lead.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
