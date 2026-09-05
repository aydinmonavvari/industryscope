import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

// Acknowledge an alert (state transition with audit). Read-only demo: marks acknowledged.
export async function POST(req: Request) {
  const orgId = await getDemoOrgId()
  const body = await req.json().catch(() => ({}))
  const { alertId } = body as { alertId?: string }
  if (!alertId) return NextResponse.json({ error: 'alertId required' }, { status: 400 })

  const before = await db.alert.findUnique({ where: { id: alertId } })
  if (!before || before.organizationId !== orgId) {
    return NextResponse.json({ error: 'not found or out of tenant' }, { status: 404 })
  }
  const after = await db.alert.update({ where: { id: alertId }, data: { status: 'acknowledged' } })
  await db.auditLog.create({
    data: {
      organizationId: orgId, actor: 'demo_user', action: 'alert.acknowledged',
      resource: 'alert', resourceId: alertId,
      before: JSON.stringify({ status: before.status }),
      after: JSON.stringify({ status: after.status }),
    },
  })
  return NextResponse.json({ ok: true, status: after.status })
}
