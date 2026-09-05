// IndustryScope — Seed pricing plans (Starter / Growth / Enterprise).
import { db } from '../src/lib/db'

const PLANS = [
  {
    code: 'starter', name: 'Starter', description: 'Inventory + Logistics + Command Center',
    priceMonthly: 2_900_000, priceYearly: 29_000_000, // IRR (Rial)
    maxUsers: 5, maxSites: 3,
    features: JSON.stringify(['Multi-site & warehouse', 'Real-time stock health', 'Shipment tracking', 'Risk & alert engine', 'Excel/CSV import']),
    active: true,
  },
  {
    code: 'growth', name: 'Growth', description: 'Supply Chain + Procurement + AI Copilot',
    priceMonthly: 7_900_000, priceYearly: 79_000_000,
    maxUsers: 20, maxSites: 10,
    features: JSON.stringify(['Everything in Starter', 'Procurement & approvals', 'Supplier intelligence', 'AI Copilot (tool-registry)', 'REST API & webhooks', 'Scope Intelligence']),
    active: true,
  },
  {
    code: 'enterprise', name: 'Enterprise', description: 'Full intelligence + integrations + advanced AI',
    priceMonthly: 24_900_000, priceYearly: 249_000_000,
    maxUsers: 100, maxSites: 50,
    features: JSON.stringify(['Everything in Growth', 'Custom ERP integrations', 'AI agents & workflow automation', 'Predictive maintenance', 'Digital twin (roadmap)', 'Private deployment', 'SSO & advanced RBAC']),
    active: true,
  },
]

async function main() {
  console.log('Seeding plans...')
  await db.plan.deleteMany()
  for (const p of PLANS) await db.plan.create({ data: p })
  console.log(`Seeded ${PLANS.length} plans.`)
}
main().catch((e) => { console.error(e); process.exit(1) }).finally(async () => { await db.$disconnect() })
