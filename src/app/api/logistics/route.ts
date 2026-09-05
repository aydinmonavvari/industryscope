import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

export async function GET(req: Request) {
  const orgId = await getDemoOrgId()
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? 'all'

  const where: Record<string, unknown> = { organizationId: orgId }
  if (status !== 'all') where.status = status

  const shipments = await db.shipment.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } }, supplier: true, tracking: { orderBy: { createdAt: 'desc' }, take: 1 } },
  })

  const data = shipments.map(s => ({
    id: s.id,
    reference: s.reference,
    status: s.status,
    carrier: s.carrier,
    supplier: s.supplier?.name ?? null,
    originName: s.originName,
    originLat: s.originLat,
    originLng: s.originLng,
    destName: s.destName,
    destLat: s.destLat,
    destLng: s.destLng,
    distanceKm: s.distanceKm,
    progress: Number(s.progress.toFixed(2)),
    delayMinutes: s.delayMinutes,
    eta: s.eta?.toISOString() ?? null,
    dispatchedAt: s.dispatchedAt?.toISOString() ?? null,
    deliveredAt: s.deliveredAt?.toISOString() ?? null,
    items: s.items.map(it => ({ sku: it.product.sku, name: it.product.name, quantity: it.quantity })),
    lastTracking: s.tracking[0] ? { status: s.tracking[0].status, lat: s.tracking[0].lat, lng: s.tracking[0].lng, note: s.tracking[0].note, at: s.tracking[0].createdAt.toISOString() } : null,
  }))

  const counts = {
    total: shipments.length,
    planned: shipments.filter(s => s.status === 'PLANNED').length,
    dispatched: shipments.filter(s => s.status === 'DISPATCHED').length,
    inTransit: shipments.filter(s => s.status === 'IN_TRANSIT').length,
    delayed: shipments.filter(s => s.status === 'DELAYED').length,
    delivered: shipments.filter(s => s.status === 'DELIVERED').length,
  }

  return NextResponse.json({ counts, shipments: data })
}
