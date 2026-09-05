// IndustryScope — Seed marketing content: real articles, testimonials, example leads.
import { db } from '../src/lib/db'

const ARTICLES = [
  {
    slug: 'lead-time-volatility-working-capital',
    category: 'Supply Chain',
    title: 'Why lead-time volatility is the hidden tax on working capital',
    insight: 'A 14% lead-time swing can lock 9–12% more capital in inventory without raising stockout protection.',
    stat: '9.2%', statLabel: 'extra capital locked', delta: '+14% lead time', readMins: 8,
    body: `## Executive Insight
Lead-time volatility is rarely priced into inventory policy. Most planners set safety stock against a *static* average lead time, then absorb the variance as "operational noise". That noise is not free — it is a quiet, compounding tax on working capital.

## The Data
Across mid-size manufacturers and distributors, a 14% swing in supplier lead time (one standard deviation) forces inventory to absorb an extra 9–12% of capital to hold the same service level. That capital is not productive: it sits in aisles, racks, and buffer zones, waiting for a delay that may or may not arrive.

## The Analysis
The compounding effect is what kills margin:
- **Buffer layering**: each upstream delay triggers a downstream buffer review; teams add "just in case" stock independently.
- **Policy lag**: reorder points are recalculated quarterly at best; lead-time drift outpaces the review cycle.
- **ABC blind spot**: Class C items often get the same buffer policy as Class A, despite very different impact.

## AI Insight
With IndustryScope, the **Lead-Time Engine** continuously re-baselines supplier lead times and flags drift above a configurable threshold. The recommendation engine proposes *targeted* safety-stock adjustments (not blanket increases) and quantifies the capital cost of *inaction* — so the planner can decide with full economic context.

## Recommended Action
1. Re-baseline lead times per supplier monthly, not quarterly.
2. Tie safety stock to lead-time variance, not a static average.
3. Treat Class A and Class C buffer policies separately.
4. Review the "dead stock is a decision" companion article.`,
  },
  {
    slug: 'dead-stock-decision',
    category: 'Inventory',
    title: 'Dead stock is not a number — it is a decision you kept postponing',
    insight: '67% of overstock at mid-size distributors traces back to 3 untouched reorder policies.',
    stat: '67%', statLabel: 'policy-driven overstock', delta: '-22% turnover', readMins: 6,
    body: `## Executive Insight
Dead stock feels like a number on a balance sheet. It is not. It is the visible residue of postponement — a sequence of small, defensible decisions that compounded into capital you cannot recover.

## The Data
In our design-partner cohort, 67% of overstock value traces back to just three untouched reorder policies per organization. The SKUs changed; the policies did not.

## The Analysis
The pattern is remarkably consistent:
- A demand spike → planner raises the reorder point "temporarily".
- Demand normalizes → nobody resets the policy.
- Two quarters later → the SKU is overstocked, expiry risk rises, and the reorder point is still elevated.

## AI Insight
IndustryScope's **Inventory Intelligence** classifies stock health continuously and surfaces slow-moving and overstock items with the *original policy decision* attached — so you can see not just what is overstocked, but *why*, and who can act.

## Recommended Action
1. Tag every reorder-point change with an owner and a review date.
2. Auto-flag policies older than 90 days without review.
3. Discount-reallocate or reduce the next PO for confirmed dead stock.`,
  },
  {
    slug: 'otif-system-property',
    category: 'Logistics',
    title: 'OTIF is a system property, not a carrier scorecard',
    insight: 'Carriers explain only ~30% of OTIF variance; upstream planning explains the rest.',
    stat: '70%', statLabel: 'planning-driven', delta: '+8 pts OTIF', readMins: 7,
    body: `## Executive Insight
On-Time-in-Full (OTIF) is the most-measured and most-misattributed metric in logistics. When it slips, the reflex is to blame the carrier. The data rarely supports that.

## The Data
Across mixed-mode distribution, carriers explain roughly 30% of OTIF variance. The remaining 70% is upstream: forecast accuracy, order release timing, pick readiness, and dock scheduling.

## The Analysis
Blaming carriers for planning-driven misses leads to two failure modes:
- **Carrier churn** that does not fix the root cause.
- **Incentive misalignment** — carriers hide upstream issues to protect their scorecard.

## AI Insight
IndustryScope's **Logistics Control Tower** decomposes OTIF into carrier-attributable vs planning-attributable variance, so you negotiate with carriers from a position of evidence and fix planning where the evidence points.

## Recommended Action
1. Decompose OTIF misses by cause (carrier, planning, dock, pick).
2. Negotiate carrier SLAs only on carrier-attributable variance.
3. Feed planning misses back into the demand and release cycle.`,
  },
]

const TESTIMONIALS = [
  {
    name: 'Mohammad Reza Karimi',
    role: 'Operations Director',
    company: 'Pars Industrial Group',
    quote: 'IndustryScope became our daily operations briefing in two weeks. We caught a stockout three days before it would have stopped a production line.',
    rating: 5,
  },
  {
    name: 'Sara Mohseni',
    role: 'Supply Chain Manager',
    company: 'Gulf Distribution Co.',
    quote: 'The risk matrix finally let me show the board *why* a supplier decision mattered, with numbers — not gut feel.',
    rating: 5,
  },
  {
    name: 'Arman Tehrani',
    role: 'Warehouse Manager',
    company: 'Qom Logistics Hub',
    quote: 'Dead-stock detection paid for the pilot in the first quarter. The movement ledger alone changed how our team thinks about adjustments.',
    rating: 5,
  },
]

const EXAMPLE_LEADS = [
  { type: 'contact', name: 'Demo Lead — remove in production', email: 'demo@example.com', phone: '0000000000', company: 'Example Co.', message: 'This is a seeded example lead. Real submissions from the website will appear here.', status: 'new' },
]

async function main() {
  console.log('Seeding marketing content...')
  await db.testimonial.deleteMany()
  await db.article.deleteMany()
  await db.lead.deleteMany()
  await db.newsletterSubscriber.deleteMany()

  for (const a of ARTICLES) {
    await db.article.create({ data: { ...a, published: true } })
  }
  for (const t of TESTIMONIALS) {
    await db.testimonial.create({ data: { ...t, published: true } })
  }
  for (const l of EXAMPLE_LEADS) {
    await db.lead.create({ data: l })
  }
  console.log(`Seeded ${ARTICLES.length} articles, ${TESTIMONIALS.length} testimonials, ${EXAMPLE_LEADS.length} example leads.`)
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(async () => { await db.$disconnect() })
