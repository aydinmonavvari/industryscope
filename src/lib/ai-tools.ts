// IndustryScope — controlled AI tool registry.
// The model NEVER touches the DB directly. It calls explicit tools with
// tenant boundary (orgId), permission (none in this demo context but stubbed),
// validation, and audit. Each tool returns JSON-shaped data the model can reason about.
import { db } from '@/lib/db'
import { z } from 'zod'

const ORG_ID = process.env.INDUSTRYSCOPE_DEMO_ORG_ID // single demo tenant in MVP

// Resolve the demo organization (cached per process)
let _orgId: string | null = null
export async function getDemoOrgId(): Promise<string> {
  if (_orgId) return _orgId
  const org = await db.organization.findFirst({ orderBy: { createdAt: 'asc' } })
  if (!org) throw new Error('No organization seeded')
  _orgId = org.id
  return _orgId
}

// ---- Tool definitions --------------------------------------------------------
export type ToolResult = {
  tool: string
  args: Record<string, unknown>
  data: unknown
  audit: { resource: string; action: string; readOnly: boolean }
}

type ToolDef = {
  name: string
  description: string
  schema: z.ZodTypeAny
  run: (args: Record<string, unknown>, orgId: string) => Promise<ToolResult>
}

// Helper: safe numeric parse for decimal strings
const dec = (s: string | null | undefined): number => (s ? parseFloat(s) : 0)

// ---- Tools -------------------------------------------------------------------

const tools: ToolDef[] = [
  {
    name: 'get_command_center',
    description:
      'Get the executive command center summary: counts of open alerts by severity, top risks, pending recommendations, and KPI snapshot for the organization.',
    schema: z.object({}).strict(),
    run: async (_args, orgId) => {
      const [alerts, risks, recs, products, shipments, suppliers] = await Promise.all([
        db.alert.findMany({ where: { organizationId: orgId, status: 'open' }, orderBy: { createdAt: 'desc' } }),
        db.risk.findMany({ where: { organizationId: orgId }, orderBy: { score: 'desc' }, take: 8 }),
        db.recommendation.findMany({ where: { organizationId: orgId, status: 'pending' }, orderBy: { createdAt: 'desc' } }),
        db.product.findMany({ where: { organizationId: orgId } }),
        db.shipment.findMany({ where: { organizationId: orgId } }),
        db.supplier.findMany({ where: { organizationId: orgId } }),
      ])
      const inv = await db.inventoryItem.findMany({ where: { organizationId: orgId }, include: { product: true } })
      const lowStock = inv.filter(i => i.onHand < i.reorderPoint)
      const stockout = inv.filter(i => i.onHand < i.safetyStock)
      const overstock = inv.filter(i => i.onHand > i.reorderPoint * 4)
      const capitalLocked = inv.reduce((s, i) => s + i.onHand * dec(i.product.unitCost), 0)
      const data = {
        alertCounts: {
          critical: alerts.filter(a => a.severity === 'CRITICAL').length,
          high: alerts.filter(a => a.severity === 'HIGH').length,
          medium: alerts.filter(a => a.severity === 'MEDIUM').length,
          low: alerts.filter(a => a.severity === 'LOW').length,
          info: alerts.filter(a => a.severity === 'INFO').length,
          total: alerts.length,
        },
        topRisks: risks.slice(0, 5).map(r => ({ id: r.id, dimension: r.dimension, title: r.title, severity: r.severity, score: Number(r.score.toFixed(2)), confidence: r.confidence, recommendation: r.recommendation })),
        pendingRecommendations: recs.length,
        kpis: {
          products: products.length,
          openShipments: shipments.filter(s => !['DELIVERED', 'CANCELLED'].includes(s.status)).length,
          delayedShipments: shipments.filter(s => s.status === 'DELAYED').length,
          suppliers: suppliers.length,
          lowStockItems: lowStock.length,
          stockoutItems: stockout.length,
          overstockItems: overstock.length,
          inventoryCapitalLockedUsd: Number(capitalLocked.toFixed(2)),
        },
      }
      return { tool: 'get_command_center', args: {}, data, audit: { resource: 'command_center', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_inventory',
    description:
      'List inventory items with stock health classification (low_stock, stockout, overstock, healthy) and capital locked per product. Optional filter by health.',
    schema: z.object({ health: z.enum(['low_stock', 'stockout', 'overstock', 'healthy', 'all']).optional() }).strict(),
    run: async (args, orgId) => {
      const inv = await db.inventoryItem.findMany({
        where: { organizationId: orgId },
        include: { product: true, warehouse: true },
      })
      const classified = inv.map(i => {
        let health = 'healthy'
        if (i.onHand < i.safetyStock) health = 'stockout'
        else if (i.onHand < i.reorderPoint) health = 'low_stock'
        else if (i.onHand > i.reorderPoint * 4) health = 'overstock'
        const available = i.onHand - i.reserved
        const coverageDays = i.onHand > 0 ? Math.max(1, Math.round(i.onHand / Math.max(1, Math.floor(i.reorderPoint / 14)))) : 0
        return {
          id: i.id,
          sku: i.product.sku,
          name: i.product.name,
          category: i.product.category,
          warehouse: i.warehouse.name,
          onHand: i.onHand,
          reserved: i.reserved,
          available,
          safetyStock: i.safetyStock,
          reorderPoint: i.reorderPoint,
          unitCost: i.product.unitCost,
          capitalLockedUsd: Number((i.onHand * dec(i.product.unitCost)).toFixed(2)),
          coverageDays,
          health,
        }
      })
      const filtered = args.health && args.health !== 'all' ? classified.filter(i => i.health === args.health) : classified
      return { tool: 'get_inventory', args, data: { count: filtered.length, items: filtered }, audit: { resource: 'inventory', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_low_stock',
    description: 'Get products at risk of stockout (on-hand below reorder point) with coverage estimate.',
    schema: z.object({}).strict(),
    run: async (_args, orgId) => {
      const inv = await db.inventoryItem.findMany({ where: { organizationId: orgId }, include: { product: true, warehouse: true } })
      const low = inv.filter(i => i.onHand < i.reorderPoint).map(i => ({
        sku: i.product.sku, name: i.product.name, warehouse: i.warehouse.name,
        onHand: i.onHand, reorderPoint: i.reorderPoint, safetyStock: i.safetyStock,
        leadTimeDays: i.product.leadTimeDays, unitCost: i.product.unitCost,
        status: i.onHand < i.safetyStock ? 'stockout' : 'low_stock',
      }))
      return { tool: 'get_low_stock', args: {}, data: { count: low.length, items: low }, audit: { resource: 'inventory', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_shipments',
    description: 'List shipments with status, progress, delay, origin/destination, ETA. Optional status filter.',
    schema: z.object({ status: z.enum(['PLANNED', 'DISPATCHED', 'IN_TRANSIT', 'DELAYED', 'DELIVERED', 'CANCELLED', 'all']).optional() }).strict(),
    run: async (args, orgId) => {
      const where: Record<string, unknown> = { organizationId: orgId }
      if (args.status && args.status !== 'all') where.status = args.status
      const shipments = await db.shipment.findMany({ where, orderBy: { createdAt: 'desc' }, include: { items: { include: { product: true } }, supplier: true } })
      const data = shipments.map(s => ({
        reference: s.reference, status: s.status, carrier: s.carrier,
        origin: s.originName, destination: s.destName, distanceKm: s.distanceKm,
        progress: Number(s.progress.toFixed(2)), delayMinutes: s.delayMinutes,
        eta: s.eta?.toISOString(), items: s.items.map(it => ({ sku: it.product.sku, name: it.product.name, quantity: it.quantity })),
        supplier: s.supplier?.name ?? null,
      }))
      return { tool: 'get_shipments', args, data: { count: data.length, shipments: data }, audit: { resource: 'shipments', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_delayed_shipments',
    description: 'Get shipments currently flagged as DELAYED with delay minutes and ETA slip.',
    schema: z.object({}).strict(),
    run: async (_args, orgId) => {
      const shipments = await db.shipment.findMany({ where: { organizationId: orgId, status: 'DELAYED' }, include: { items: { include: { product: true } }, supplier: true } })
      const data = shipments.map(s => ({
        reference: s.reference, carrier: s.carrier, origin: s.originName, destination: s.destName,
        delayMinutes: s.delayMinutes, progress: Number(s.progress.toFixed(2)),
        eta: s.eta?.toISOString(), items: s.items.map(it => ({ sku: it.product.sku, name: it.product.name, quantity: it.quantity })),
        supplier: s.supplier?.name ?? null,
      }))
      return { tool: 'get_delayed_shipments', args: {}, data: { count: data.length, shipments: data }, audit: { resource: 'shipments', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_supplier_performance',
    description: 'Supplier performance summary: rating, on-time rate, avg lead time, defect rate.',
    schema: z.object({}).strict(),
    run: async (_args, orgId) => {
      const suppliers = await db.supplier.findMany({ where: { organizationId: orgId } })
      const data = suppliers.map(s => ({
        name: s.name, country: s.country, rating: s.rating, onTimeRate: s.onTimeRate,
        avgLeadDays: s.avgLeadDays, defectRate: s.defectRate,
        riskScore: Number((1 - s.onTimeRate) * (1 - s.rating) * 4).toFixed(2),
      }))
      return { tool: 'get_supplier_performance', args: {}, data: { count: data.length, suppliers: data }, audit: { resource: 'suppliers', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_risks',
    description: 'List supply-chain risks by dimension with probability, impact, score, and recommendation.',
    schema: z.object({}).strict(),
    run: async (_args, orgId) => {
      const risks = await db.risk.findMany({ where: { organizationId: orgId }, orderBy: { score: 'desc' } })
      const data = risks.map(r => ({ id: r.id, dimension: r.dimension, title: r.title, severity: r.severity, probability: r.probability, impact: r.impact, score: Number(r.score.toFixed(2)), confidence: r.confidence, recommendation: r.recommendation }))
      return { tool: 'get_risks', args: {}, data: { count: data.length, risks: data }, audit: { resource: 'risks', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_alerts',
    description: 'List open alerts ordered by severity and recency.',
    schema: z.object({}).strict(),
    run: async (_args, orgId) => {
      const alerts = await db.alert.findMany({ where: { organizationId: orgId, status: 'open' }, orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }] })
      const sevOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3, INFO: 4 }
      const data = alerts.sort((a, b) => (sevOrder[a.severity as keyof typeof sevOrder] ?? 9) - (sevOrder[b.severity as keyof typeof sevOrder] ?? 9)).map(a => ({
        id: a.id, severity: a.severity, category: a.category, title: a.title, message: a.message,
        impact: a.impact, recommendation: a.recommendation, confidence: a.confidence, source: a.source,
        createdAt: a.createdAt.toISOString(),
      }))
      return { tool: 'get_alerts', args: {}, data: { count: data.length, alerts: data }, audit: { resource: 'alerts', action: 'read', readOnly: true } }
    },
  },
  {
    name: 'get_recommendations',
    description: 'List pending AI recommendations with autonomy level, rationale, impact, and proposed action.',
    schema: z.object({}).strict(),
    run: async (_args, orgId) => {
      const recs = await db.recommendation.findMany({ where: { organizationId: orgId, status: 'pending' }, orderBy: { createdAt: 'desc' } })
      const data = recs.map(r => ({
        id: r.id, title: r.title, summary: r.summary, rationale: r.rationale,
        action: r.action, autonomyLevel: r.autonomyLevel, impact: r.impact, confidence: r.confidence,
      }))
      return { tool: 'get_recommendations', args: {}, data: { count: data.length, recommendations: data }, audit: { resource: 'recommendations', action: 'read', readOnly: true } }
    },
  },
]

export function getToolNames(): string[] {
  return tools.map(t => t.name)
}

export function getToolSchemas(): { name: string; description: string; parameters: string }[] {
  return tools.map(t => ({ name: t.name, description: t.description, parameters: t.schema.description ?? '{}' }))
}

export async function executeTool(name: string, args: Record<string, unknown>, orgId: string): Promise<ToolResult> {
  const tool = tools.find(t => t.name === name)
  if (!tool) throw new Error(`Unknown tool: ${name}`)
  const parsed = tool.schema.safeParse(args ?? {})
  if (!parsed.success) throw new Error(`Invalid args for ${name}: ${parsed.error.message}`)
  return tool.run(parsed.data as Record<string, unknown>, orgId)
}
