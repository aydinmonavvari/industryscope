import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

// Snooze an alert for N hours (default 24). State stays open but sets a snoozeUntil via... 
// SQLite has no snoozeUntil column; we mark status='snoozed' for demonstration. Audit.
export async function POST(req: Request) {
  const orgId = await getDemoOrgId()
  const { id, hours = 24 } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const before = await db.alert.findUnique({ where: { id } })
  if (!before || before.organizationId !== orgId) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const after = await db.alert.update({ where: { id }, data: { status: 'snoozed' } })
  await db.auditLog.create({ data: { organizationId: orgId, actor: 'demo_user', action: 'alert.snoozed', resource: 'alert', resourceId: id, before: JSON.stringify({ status: before.status }), after: JSON.stringify({ status: after.status, hours }) } })
  return NextResponse.json({ ok: true, status: after.status, hours })
}
