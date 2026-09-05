import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  planCode: z.enum(['starter', 'growth', 'enterprise']),
  billingCycle: z.enum(['monthly', 'yearly']).optional(),
})

// POST: subscribe current user to a plan (creates customer + subscription if not present)
export async function POST(req: Request) {
  const token = req.cookies.get('is_token')?.value
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const session = await db.session.findUnique({ where: { token }, include: { user: true } })
  if (!session || session.expiresAt < new Date()) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  const { planCode, billingCycle = 'monthly' } = parsed.data

  const plan = await db.plan.findUnique({ where: { code: planCode } })
  if (!plan) return NextResponse.json({ error: 'plan_not_found' }, { status: 404 })

  let customer = await db.customer.findUnique({ where: { userId: session.user.id } })
  if (!customer) {
    customer = await db.customer.create({ data: { userId: session.user.id, companyName: session.user.name || 'My Company', status: 'active' } })
  }

  const start = new Date()
  const end = new Date(start.getTime() + (billingCycle === 'yearly' ? 365 : 30) * 86400000)

  // deactivate existing active subs
  await db.subscription.updateMany({ where: { customerId: customer.id, status: 'active' }, data: { status: 'ended' } })

  const sub = await db.subscription.create({ data: { customerId: customer.id, planId: plan.id, status: 'active', billingCycle, currentPeriodStart: start, currentPeriodEnd: end } })
  return NextResponse.json({ ok: true, subscriptionId: sub.id, plan: plan.name, billingCycle, endsAt: end.toISOString() })
}

// GET: current user's subscription
export async function GET(req: Request) {
  const token = req.cookies.get('is_token')?.value
  if (!token) return NextResponse.json({ subscription: null })
  const session = await db.session.findUnique({
    where: { token },
    include: {
      user: {
        include: {
          customer: {
            include: {
              subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' } },
            },
          },
        },
      },
    },
  })
  if (!session || session.expiresAt < new Date()) return NextResponse.json({ subscription: null })
  const sub = session.user.customer?.subscriptions?.find(s => s.status === 'active') ?? session.user.customer?.subscriptions?.[0]
  return NextResponse.json({
    subscription: sub ? { id: sub.id, status: sub.status, billingCycle: sub.billingCycle, plan: sub.plan.name, endsAt: sub.currentPeriodEnd.toISOString() } : null,
    customer: session.user.customer ? { status: session.user.customer.status } : null,
  })
}
