'use client'
import { useRouter } from '@/lib/router'
import { useI18n } from '@/lib/i18n'
import { Home, ArrowRight } from 'lucide-react'

export default function BackHome({ className }: { className?: string }) {
  const { navigate } = useRouter()
  const { lang } = useI18n()
  return (
    <button
      onClick={() => navigate('')}
      className={`group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-accent transition-colors glass rounded-full px-3 py-1.5 border border-border/40 hover:border-primary/30 ${className ?? ''}`}
      aria-label={lang === 'fa' ? 'بازگشت به خانه' : 'Back home'}
    >
      <Home className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
      <span className="font-medium">{lang === 'fa' ? 'بازگشت به خانه' : 'Back home'}</span>
      <ArrowRight className={`h-3.5 w-3.5 text-emerald-accent opacity-0 group-hover:opacity-100 transition-opacity ${lang === 'fa' ? 'rotate-180' : ''}`} />
    </button>
  )
}
