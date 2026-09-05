import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

export async function GET() {
  const orgId = await getDemoOrgId()
  const [risks, suppliers] = await Promise.all([
    db.risk.findMany({ where: { organizationId: orgId }, orderBy: { score: 'desc' } }),
    db.supplier.findMany({ where: { organizationId: orgId } }),
  ])
  const supplierPerf = suppliers.map(s => ({
    name: s.name, country: s.country, rating: s.rating, onTimeRate: s.onTimeRate,
    avgLeadDays: s.avgLeadDays, defectRate: s.defectRate,
    riskScore: Number(((1 - s.onTimeRate) * (1 - s.rating) * 4).toFixed(2)),
  }))
  return NextResponse.json({
    risks: risks.map(r => ({
      id: r.id, dimension: r.dimension, title: r.title, severity: r.severity,
      probability: r.probability, impact: r.impact, score: Number(r.score.toFixed(2)),
      confidence: r.confidence, recommendation: r.recommendation,
    })),
    suppliers: supplierPerf,
  })
}
