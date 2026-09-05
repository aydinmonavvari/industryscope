import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

// Advance a shipment to its next valid state. Explicit transitions only. Audit.
const NEXT: Record<string, string> = {
  PLANNED: 'DISPATCHED',
  DISPATCHED: 'IN_TRANSIT',
  IN_TRANSIT: 'DELIVERED',
  DELAYED: 'IN_TRANSIT',
}

export async function POST(req: Request) {
  const orgId = await getDemoOrgId()
  const { id } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const ship = await db.shipment.findUnique({ where: { id } })
  if (!ship || ship.organizationId !== orgId) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const next = NEXT[ship.status]
  if (!next) return NextResponse.json({ error: 'no valid next state' }, { status: 400 })
  const data: Record<string, unknown> = { status: next }
  if (next === 'DELIVERED') data.deliveredAt = new Date()
  if (next === 'IN_TRANSIT' && !ship.dispatchedAt) data.dispatchedAt = new Date()
  const after = await db.shipment.update({ where: { id }, data })
  await db.trackingEvent.create({ data: { shipmentId: id, status: next, note: `Advanced to ${next}` } })
  await db.auditLog.create({ data: { organizationId: orgId, actor: 'demo_user', action: 'shipment.advanced', resource: 'shipment', resourceId: id, before: JSON.stringify({ status: ship.status }), after: JSON.stringify({ status: after.status }) } })
  return NextResponse.json({ ok: true, status: after.status })
}
