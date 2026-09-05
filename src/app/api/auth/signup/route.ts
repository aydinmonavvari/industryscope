import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { hashPassword, genToken } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(200),
  name: z.string().min(2).max(120).optional(),
  phone: z.string().max(40).optional(),
  companyName: z.string().min(2).max(200).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'invalid_input', issues: parsed.error.issues }, { status: 400 })
    const { email, password, name, phone, companyName } = parsed.data

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: 'email_taken' }, { status: 409 })

    const passwordHash = await hashPassword(password)
    const user = await db.user.create({ data: { email, passwordHash, name, phone } })

    // Create a Customer record (trial) if company name provided
    if (companyName) {
      const trialEndsAt = new Date(Date.now() + 14 * 86400000) // 14-day trial
      await db.customer.create({ data: { userId: user.id, companyName, status: 'trial', trialEndsAt } })
    }

    // Issue a session token
    const token = genToken()
    const expiresAt = new Date(Date.now() + 30 * 86400000)
    await db.session.create({ data: { userId: user.id, token, expiresAt } })

    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } })
    res.cookies.set('is_token', token, { httpOnly: true, sameSite: 'lax', path: '/', expires: expiresAt, secure: process.env.NODE_ENV === 'production' })
    return res
  } catch (e) {
    console.error('signup error', e)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
