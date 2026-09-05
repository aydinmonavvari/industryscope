import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getDemoOrgId } from '@/lib/ai-tools'

export async function GET() {
  const orgId = await getDemoOrgId()
  const recs = await db.recommendation.findMany({ where: { organizationId: orgId, status: 'pending' }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({
    recommendations: recs.map(r => ({
      id: r.id, title: r.title, summary: r.summary, rationale: r.rationale,
      action: r.action, autonomyLevel: r.autonomyLevel, impact: r.impact, confidence: r.confidence, status: r.status,
    })),
  })
}
