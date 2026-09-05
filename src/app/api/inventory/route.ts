import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

const dec = (s: string | null | undefined): number => (s ? parseFloat(s) : 0)

export async function GET(req: Request) {
  const orgId = await getDemoOrgId()
  const { searchParams } = new URL(req.url)
  const health = searchParams.get('health') ?? 'all'

  const inv = await db.inventoryItem.findMany({
    where: { organizationId: orgId },
    include: { product: true, warehouse: true },
    orderBy: { onHand: 'asc' },
  })

  const classified = inv.map(i => {
    let h = 'healthy'
    if (i.onHand < i.safetyStock) h = 'stockout'
    else if (i.onHand < i.reorderPoint) h = 'low_stock'
    else if (i.onHand > i.reorderPoint * 4) h = 'overstock'
    return {
      id: i.id,
      sku: i.product.sku,
      name: i.product.name,
      category: i.product.category,
      abcClass: i.product.abcClass,
      unit: i.product.unit,
      warehouse: i.warehouse.name,
      onHand: i.onHand,
      reserved: i.reserved,
      available: i.onHand - i.reserved,
      safetyStock: i.safetyStock,
      reorderPoint: i.reorderPoint,
      unitCost: i.product.unitCost,
      unitPrice: i.product.unitPrice,
      capitalLockedUsd: Number((i.onHand * dec(i.product.unitCost)).toFixed(2)),
      coverageDays: i.onHand > 0 ? Math.max(1, Math.round(i.onHand / Math.max(1, Math.floor(i.reorderPoint / 14)))) : 0,
      leadTimeDays: i.product.leadTimeDays,
      health: h,
    }
  })

  const filtered = health !== 'all' ? classified.filter(i => i.health === health) : classified
  const summary = {
    total: classified.length,
    healthy: classified.filter(i => i.health === 'healthy').length,
    lowStock: classified.filter(i => i.health === 'low_stock').length,
    stockout: classified.filter(i => i.health === 'stockout').length,
    overstock: classified.filter(i => i.health === 'overstock').length,
    totalCapitalLockedUsd: Number(classified.reduce((s, i) => s + i.capitalLockedUsd, 0).toFixed(2)),
  }
  return NextResponse.json({ summary, items: filtered })
}
