import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

// Public inbound lead capture. Validates, dedups newsletter, persists.
const schema = z.object({
  type: z.enum(['contact', 'demo', 'quote', 'newsletter', 'partnership']),
  name: z.string().min(2).max(120).optional(),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional(),
  company: z.string().max(200).optional(),
  role: z.string().max(120).optional(),
  country: z.string().max(120).optional(),
  message: z.string().max(4000).optional(),
  tier: z.enum(['starter', 'growth', 'enterprise']).optional(),
  sites: z.number().int().min(1).max(10000).optional(),
}).refine((d) => {
  if (d.type === 'newsletter') return !!d.email
  return !!d.email && !!d.name
}, { message: 'name and email required for non-newsletter leads' })

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid_input', issues: parsed.error.issues }, { status: 400 })
    }
    const d = parsed.data

    if (d.type === 'newsletter') {
      const existing = await db.newsletterSubscriber.findUnique({ where: { email: d.email } })
      if (existing) return NextResponse.json({ ok: true, duplicate: true })
      await db.newsletterSubscriber.create({ data: { email: d.email, source: 'footer' } })
      return NextResponse.json({ ok: true })
    }

    const lead = await db.lead.create({
      data: {
        type: d.type, name: d.name, email: d.email, phone: d.phone, company: d.company,
        role: d.role, country: d.country, message: d.message, tier: d.tier, sites: d.sites,
        status: 'new',
      },
    })
    return NextResponse.json({ ok: true, id: lead.id })
  } catch (e) {
    console.error('lead error', e)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
