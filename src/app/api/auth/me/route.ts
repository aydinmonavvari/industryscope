import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: current user from session cookie
export async function GET(req: Request) {
  const token = req.cookies.get('is_token')?.value
  if (!token) return NextResponse.json({ user: null })
  const session = await db.session.findUnique({
    where: { token },
    include: { user: { include: { customer: { include: { subscriptions: { include: { plan: true } } } } } } },
  })
  if (!session || session.expiresAt < new Date()) return NextResponse.json({ user: null })
  const u = session.user
  return NextResponse.json({
    user: {
      id: u.id, email: u.email, name: u.name, role: u.role,
      customer: u.customer ? {
        id: u.customer.id, companyName: u.customer.companyName, status: u.customer.status,
        trialEndsAt: u.customer.trialEndsAt?.toISOString(),
        subscription: u.customer.subscriptions.find(s => s.status === 'active') ?? u.customer.subscriptions[0] ?? null,
      } : null,
    },
  })
}
