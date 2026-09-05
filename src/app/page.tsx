'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import Testimonials from '@/components/industrial/Testimonials'
import EnterpriseCTA from '@/components/industrial/EnterpriseCTA'
import Contact from '@/components/industrial/Contact'
import Footer from '@/components/industrial/Footer'
import AdminPanel from '@/components/industrial/AdminPanel'
import BackHome from '@/components/industrial/BackHome'
import { RouterProvider, useRouter } from '@/lib/router'
import { useI18n } from '@/lib/i18n'
import { SectionShell, SectionHeading } from '@/components/industrial/shared'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <RouterProvider>
      <div id="top" className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 flex flex-col">
          <PageSwitch />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  )
}

function PageSwitch() {
  const { page, param } = useRouter()
  const { t } = useI18n()
  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [page])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {page === 'home' && <HomePage />}
        {page === 'command-center' && <PageWrapper><CommandCenter /></PageWrapper>}
        {page === 'inventory' && <PageWrapper><InventoryIntelligence /></PageWrapper>}
        {page === 'logistics' && <PageWrapper><LogisticsTower /></PageWrapper>}
        {page === 'risk' && <PageWrapper><SupplyChainRisk /></PageWrapper>}
        {page === 'copilot' && <PageWrapper><AiCopilot /></PageWrapper>}
        {page === 'ecosystem' && <PageWrapper><ScopeEcosystem /></PageWrapper>}
        {page === 'intelligence' && <PageWrapper><ScopeIntelligence slug={param} /></PageWrapper>}
        {page === 'enterprise' && <PageWrapper><EnterpriseCTA /></PageWrapper>}
        {page === 'contact' && <PageWrapper><Contact /></PageWrapper>}
        {page === 'admin' && <AdminPanel />}
      </motion.div>
    </AnimatePresence>
  )
}

// PageWrapper: adds a "back home" button at the top of dedicated pages
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <BackHome />
      </div>
      {children}
    </div>
  )
}

// Shorter, focused homepage — only the essentials + clear nav to deep pages
function HomePage() {
  const { t } = useI18n()
  const { navigate } = useRouter()
  return (
    <>
      <Hero onEnterDemo={() => navigate('command-center')} />
      <LiveWorld />
      {/* Compact command center preview */}
      <SectionShell id="command-center-preview" className="py-16 sm:py-20">
        <SectionHeading
          eyebrow={t.commandCenter.eyebrow}
          title={t.commandCenter.title}
          description={t.commandCenter.desc}
        />
        <div className="mt-6">
          <CommandCenter />
        </div>
        <div className="mt-6 text-center">
          <Button onClick={() => navigate('command-center')} variant="outline" className="glass h-11 px-6">
            {t.nav.enterDemo} <ArrowRight className="ml-2 h-4 w-4 rtl-flip" />
          </Button>
        </div>
      </SectionShell>

      {/* Product modules grid — entry to deep pages */}
      <SectionShell id="modules" className="py-12">
        <SectionHeading
          eyebrow={t.nav.platform}
          title={t.liveWorld.eyebrow}
          description={t.liveWorld.desc}
        />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModuleCard onClick={() => navigate('inventory')} eyebrow={t.inventory.eyebrow} title={t.inventory.title + t.inventory.titleAccent} icon="📦" />
          <ModuleCard onClick={() => navigate('logistics')} eyebrow={t.logistics.eyebrow} title={t.logistics.title + t.logistics.titleAccent} icon="🚛" />
          <ModuleCard onClick={() => navigate('risk')} eyebrow={t.risk.eyebrow} title={t.risk.title + t.risk.titleAccent} icon="🛡️" />
          <ModuleCard onClick={() => navigate('copilot')} eyebrow={t.copilot.eyebrow} title={t.copilot.title + t.copilot.titleAccent} icon="🧠" />
          <ModuleCard onClick={() => navigate('ecosystem')} eyebrow={t.ecosystem.eyebrow} title={t.ecosystem.title + t.ecosystem.titleAccent} icon="🌐" />
          <ModuleCard onClick={() => navigate('intelligence')} eyebrow={t.intelligence.eyebrow} title={t.intelligence.title} icon="📊" />
        </div>
      </SectionShell>

      <Testimonials />
      <EnterpriseCTA />
    </>
  )
}

function ModuleCard({ onClick, eyebrow, title, icon }: { onClick: () => void; eyebrow: string; title: string; icon: string }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass rounded-2xl p-5 text-left relative overflow-hidden group border border-transparent hover:border-primary/30 transition-colors"
    >
      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-accent group-hover:translate-x-1 rtl-flip transition-all" />
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-wider text-emerald-accent font-semibold">{eyebrow}</div>
      <div className="mt-1 text-base font-medium leading-snug">{title}</div>
    </motion.button>
  )
}
