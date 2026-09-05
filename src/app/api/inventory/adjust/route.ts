import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'
import { z } from 'zod'

// Adjust inventory: delta (signed). Writes a movement ledger row + updates onHand. Audit.
const schema = z.object({
  itemId: z.string(),
  delta: z.number().int(),
  reason: z.string().max(200).optional(),
})

export async function POST(req: Request) {
  const orgId = await getDemoOrgId()
  const body = await req.json().catch(() => ({}))
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_input', issues: parsed.error.issues }, { status: 400 })
  const { itemId, delta, reason } = parsed.data

  const item = await db.inventoryItem.findUnique({ where: { id: itemId }, include: { product: true } })
  if (!item || item.organizationId !== orgId) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const before = { onHand: item.onHand }
  const newOnHand = Math.max(0, item.onHand + delta)
  await db.inventoryItem.update({ where: { id: itemId }, data: { onHand: newOnHand } })
  // NOTE: InventoryMovement.warehouseId is the FK to InventoryItem.id (per schema relation).
  await db.inventoryMovement.create({ data: { productId: item.productId, warehouseId: itemId, type: 'adjust', quantity: delta, balanceAfter: newOnHand, reason: reason || 'manual adjustment' } })
  await db.auditLog.create({ data: { organizationId: orgId, actor: 'demo_user', action: 'inventory.adjust', resource: 'inventory_item', resourceId: itemId, before: JSON.stringify(before), after: JSON.stringify({ onHand: newOnHand, delta, reason }) } })

  return NextResponse.json({ ok: true, onHand: newOnHand })
}
