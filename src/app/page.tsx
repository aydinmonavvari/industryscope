'use client'
import { useCallback } from 'react'
import Nav from '@/components/industrial/Nav'
import Hero from '@/components/industrial/Hero'
import LiveWorld from '@/components/industrial/LiveWorld'
import CommandCenter from '@/components/industrial/CommandCenter'
import InventoryIntelligence from '@/components/industrial/InventoryIntelligence'
import LogisticsTower from '@/components/industrial/LogisticsTower'
import SupplyChainRisk from '@/components/industrial/SupplyChainRisk'
import AiCopilot from '@/components/industrial/AiCopilot'
import ScopeEcosystem from '@/components/industrial/ScopeEcosystem'
import ScopeIntelligence from '@/components/industrial/ScopeIntelligence'
import EnterpriseCTA from '@/components/industrial/EnterpriseCTA'
import Footer from '@/components/industrial/Footer'

export default function Home() {
  const scrollToPlatform = useCallback(() => {
    const el = document.getElementById('command-center')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <Nav onEnterDemo={scrollToPlatform} />
      <main className="flex-1 flex flex-col">
        <Hero onEnterDemo={scrollToPlatform} />
        <LiveWorld />
        <div id="command-center" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-primary/60" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-accent font-semibold">Executive Command Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            What needs my attention?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            The signature IndustryScope experience. Open the command center and the system tells you — in plain language — what is happening, why it matters, and what to do.
          </p>
          <div className="mt-6">
            <CommandCenter />
          </div>
        </div>
        <InventoryIntelligence />
        <LogisticsTower />
        <SupplyChainRisk />
        <AiCopilot />
        <ScopeEcosystem />
        <ScopeIntelligence />
        <EnterpriseCTA />
      </main>
      <Footer />
    </div>
  )
}
