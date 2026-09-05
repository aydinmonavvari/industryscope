'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, ArrowRight, Building2, Sparkles, Rocket } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'

const TIERS = [
  {
    name: 'Starter', icon: <Sparkles className="h-5 w-5" />,
    desc: 'Inventory + Logistics + Command Center.',
    features: ['Multi-site & warehouse', 'Real-time stock health', 'Shipment tracking', 'Risk & alert engine', 'Excel/CSV import'],
    cta: 'Start with Starter', highlight: false,
  },
  {
    name: 'Growth', icon: <Rocket className="h-5 w-5" />,
    desc: 'Supply Chain + Procurement + AI Copilot.',
    features: ['Everything in Starter', 'Procurement & approvals', 'Supplier intelligence', 'AI Copilot (tool-registry)', 'REST API & webhooks', 'Scope Intelligence'],
    cta: 'Scale with Growth', highlight: true,
  },
  {
    name: 'Enterprise', icon: <Building2 className="h-5 w-5" />,
    desc: 'Full intelligence + integrations + advanced AI.',
    features: ['Everything in Growth', 'Custom ERP integrations', 'AI agents & workflow automation', 'Predictive maintenance', 'Digital twin (roadmap)', 'Private deployment', 'SSO & advanced RBAC'],
    cta: 'Talk to Enterprise', highlight: false,
  },
]

export default function EnterpriseCTA() {
  return (
    <SectionShell id="enterprise">
      <SectionHeading
        align="center"
        eyebrow="Enterprise"
        title={<>Built for real industrial customers. <span className="text-emerald-accent">Priced for ROI.</span></>}
        description="Packaging scales with sites, modules, data volume, and AI usage — not just seat count. Design partners ship measurable outcomes: fewer stockouts, less dead stock, higher OTIF."
      />

      <div className="mt-10 grid lg:grid-cols-3 gap-4">
        {TIERS.map(t => (
          <Card key={t.name} className={cn('rounded-2xl p-6 relative overflow-hidden',
            t.highlight ? 'glass-strong border-primary/50' : 'glass border-border/40')}>
            {t.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-mono px-3 py-1 rounded-bl-lg">MOST CHOSEN</div>
            )}
            <div className="flex items-center gap-2">
              <span className={cn('h-9 w-9 rounded-lg flex items-center justify-center',
                t.highlight ? 'bg-primary/15 text-emerald-accent' : 'bg-foreground/5 text-muted-foreground')}>{t.icon}</span>
              <h3 className="text-lg font-semibold">{t.name}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            <ul className="mt-4 space-y-2">
              {t.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className={cn('h-4 w-4 mt-0.5 flex-shrink-0', t.highlight ? 'text-emerald-accent' : 'text-muted-foreground')} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className={cn('mt-6 w-full h-11',
              t.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'glass')} variant={t.highlight ? 'default' : 'outline'}>
              {t.cta} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      <Card className="glass-strong mt-10 rounded-2xl p-6 sm:p-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          See it on <span className="text-emerald-accent">your operation</span> — not a sandbox.
        </h3>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Design partners get a guided onboarding, connected data sources, and a measurable ROI review at 30, 60, and 90 days.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6">
            Book a design-partner session <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="glass h-12 px-6">Read the architecture</Button>
        </div>
      </Card>
    </SectionShell>
  )
}
