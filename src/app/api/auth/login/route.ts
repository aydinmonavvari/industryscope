import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { verifyPassword, genToken } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
    const { email, password } = parsed.data

    const user = await db.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 })

    const ok = await verifyPassword(password, user.passwordHash)
    if (!ok) return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 })

    const token = genToken()
    const expiresAt = new Date(Date.now() + 30 * 86400000)
    await db.session.create({ data: { userId: user.id, token, expiresAt } })

    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
    res.cookies.set('is_token', token, { httpOnly: true, sameSite: 'lax', path: '/', expires: expiresAt, secure: process.env.NODE_ENV === 'production' })
    return res
  } catch (e) {
    console.error('login error', e)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
