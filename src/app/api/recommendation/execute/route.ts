import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

// Execute an approved recommendation (level 3 → 4). State: approved → executed. Audit.
export async function POST(req: Request) {
  const orgId = await getDemoOrgId()
  const { id } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const before = await db.recommendation.findUnique({ where: { id } })
  if (!before || before.organizationId !== orgId) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (before.status !== 'approved') return NextResponse.json({ error: 'must be approved first' }, { status: 400 })
  const after = await db.recommendation.update({ where: { id }, data: { status: 'executed' } })
  await db.auditLog.create({ data: { organizationId: orgId, actor: 'demo_user', action: 'recommendation.executed', resource: 'recommendation', resourceId: id, before: JSON.stringify({ status: before.status }), after: JSON.stringify({ status: after.status, action: before.action }) } })
  return NextResponse.json({ ok: true, status: after.status, action: before.action })
}
