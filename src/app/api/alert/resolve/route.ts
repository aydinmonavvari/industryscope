import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

// Resolve an alert. State: open|acknowledged → resolved. Audit.
export async function POST(req: Request) {
  const orgId = await getDemoOrgId()
  const { id } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const before = await db.alert.findUnique({ where: { id } })
  if (!before || before.organizationId !== orgId) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const after = await db.alert.update({ where: { id }, data: { status: 'resolved' } })
  await db.auditLog.create({ data: { organizationId: orgId, actor: 'demo_user', action: 'alert.resolved', resource: 'alert', resourceId: id, before: JSON.stringify({ status: before.status }), after: JSON.stringify({ status: after.status }) } })
  return NextResponse.json({ ok: true, status: after.status })
}
