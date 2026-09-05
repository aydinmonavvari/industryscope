import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

const dec = (s: string | null | undefined): number => (s ? parseFloat(s) : 0)

export async function GET() {
  const orgId = await getDemoOrgId()
  const [alerts, risks, recs, products, shipments, suppliers, inv] = await Promise.all([
    db.alert.findMany({ where: { organizationId: orgId, status: 'open' }, orderBy: { createdAt: 'desc' } }),
    db.risk.findMany({ where: { organizationId: orgId }, orderBy: { score: 'desc' } }),
    db.recommendation.findMany({ where: { organizationId: orgId, status: 'pending' }, orderBy: { createdAt: 'desc' } }),
    db.product.findMany({ where: { organizationId: orgId } }),
    db.shipment.findMany({ where: { organizationId: orgId }, orderBy: { createdAt: 'desc' } }),
    db.supplier.findMany({ where: { organizationId: orgId } }),
    db.inventoryItem.findMany({ where: { organizationId: orgId }, include: { product: true, warehouse: true } }),
  ])

  const sevOrder: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3, INFO: 4 }
  const sortedAlerts = [...alerts].sort((a, b) => (sevOrder[a.severity] ?? 9) - (sevOrder[b.severity] ?? 9))

  const lowStock = inv.filter(i => i.onHand < i.reorderPoint && i.onHand >= i.safetyStock)
  const stockout = inv.filter(i => i.onHand < i.safetyStock)
  const overstock = inv.filter(i => i.onHand > i.reorderPoint * 4)
  const capitalLocked = inv.reduce((s, i) => s + i.onHand * dec(i.product.unitCost), 0)

  // operational health: weighted inverse of risk exposure
  const riskExposure = risks.reduce((s, r) => s + r.score * (r.severity === 'CRITICAL' ? 3 : r.severity === 'HIGH' ? 2 : 1), 0)
  const operationalHealth = Math.max(20, Math.min(98, Math.round(100 - riskExposure * 4)))

  // OTIF (on-time in-full) — derived from delivered vs delayed shipments
  const delivered = shipments.filter(s => s.status === 'DELIVERED').length
  const delayed = shipments.filter(s => s.status === 'DELAYED').length
  const otf = delivered + delayed > 0 ? Math.round((delivered / (delivered + delayed)) * 100) : 92

  return NextResponse.json({
    organization: (await db.organization.findUnique({ where: { id: orgId } }))?.name ?? 'IndustryScope',
    greeting: {
      headline: 'Good morning.',
      subhead: `${sortedAlerts.length} things need your attention.`,
    },
    operationalHealth,
    kpis: {
      inventoryCapitalLockedUsd: Number(capitalLocked.toFixed(2)),
      lowStockItems: lowStock.length,
      stockoutItems: stockout.length,
      overstockItems: overstock.length,
      openShipments: shipments.filter(s => !['DELIVERED', 'CANCELLED'].includes(s.status)).length,
      delayedShipments: delayed,
      otfPercent: otf,
      suppliers: suppliers.length,
      products: products.length,
      pendingRecommendations: recs.length,
    },
    alertCounts: {
      critical: sortedAlerts.filter(a => a.severity === 'CRITICAL').length,
      high: sortedAlerts.filter(a => a.severity === 'HIGH').length,
      medium: sortedAlerts.filter(a => a.severity === 'MEDIUM').length,
      low: sortedAlerts.filter(a => a.severity === 'LOW').length,
      info: sortedAlerts.filter(a => a.severity === 'INFO').length,
      total: sortedAlerts.length,
    },
    alerts: sortedAlerts.slice(0, 8).map(a => ({
      id: a.id, severity: a.severity, category: a.category, title: a.title,
      message: a.message, impact: a.impact, recommendation: a.recommendation,
      confidence: a.confidence, source: a.source, status: a.status, createdAt: a.createdAt.toISOString(),
    })),
    topRisks: risks.slice(0, 6).map(r => ({
      id: r.id, dimension: r.dimension, title: r.title, severity: r.severity,
      probability: r.probability, impact: r.impact, score: Number(r.score.toFixed(2)),
      confidence: r.confidence, recommendation: r.recommendation,
    })),
    recommendations: recs.map(r => ({
      id: r.id, title: r.title, summary: r.summary, rationale: r.rationale,
      action: r.action, autonomyLevel: r.autonomyLevel, impact: r.impact, confidence: r.confidence, status: r.status,
    })),
    inventoryHealth: {
      healthy: inv.filter(i => i.onHand >= i.reorderPoint && i.onHand <= i.reorderPoint * 4).length,
      lowStock: lowStock.length,
      stockout: stockout.length,
      overstock: overstock.length,
    },
    supplierAvgOnTime: suppliers.length ? Number((suppliers.reduce((s, x) => s + x.onTimeRate, 0) / suppliers.length * 100).toFixed(1)) : 0,
  })
}
