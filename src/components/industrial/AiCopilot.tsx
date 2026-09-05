'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Brain, Send, Sparkles, ShieldCheck, Wrench, Loader2, User, Bot, AlertCircle } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { useI18n } from '@/lib/i18n'

type Msg = { role: 'user' | 'assistant'; content: string; tools?: string[]; confidence?: number; autonomy?: number; freshness?: string }

export default function AiCopilot() {
  const { t, lang } = useI18n()
  const cp = t.copilot
  const suggestions = cp.suggestions
  const trustIcons = [
    <ShieldCheck key="i1" className="h-4 w-4" />,
    <Sparkles key="i2" className="h-4 w-4" />,
    <Wrench key="i3" className="h-4 w-4" />,
  ]
  const [messages, setMessages] = useState<Msg[]>([{
    role: 'assistant',
    content: cp.welcome,
    tools: [],
    confidence: 1,
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading) return
    setInput('')
    setError(null)
    setMessages(m => [...m, { role: 'user', content: q }])
    setLoading(true)
    try {
      const r = await fetch('/api/copilot', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, lang }),
      })
      if (!r.ok) throw new Error('request failed')
      const d = await r.json()
      setMessages(m => [...m, {
        role: 'assistant', content: d.answer, tools: d.toolsUsed, confidence: 0.85, autonomy: d.autonomyLevel, freshness: d.dataFreshness,
      }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'unknown')
      setMessages(m => [...m, { role: 'assistant', content: cp.cantReach }])
    } finally { setLoading(false) }
  }

  return (
    <SectionShell id="copilot">
      <SectionHeading
        eyebrow={cp.eyebrow}
        title={<>{cp.title}<span className="text-emerald-accent">{cp.titleAccent}</span></>}
        description={cp.desc}
      />

      <Card className="glass-strong mt-6 rounded-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3 bg-foreground/[0.02]">
          <div className="flex items-center gap-2">
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-primary/30 blur-sm" />
              <Brain className="relative h-5 w-5 text-emerald-accent" />
            </span>
            <div>
              <div className="text-sm font-semibold">{cp.name}</div>
              <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" /> {cp.meta}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded border border-border/40"><ShieldCheck className="h-3 w-3 text-emerald-accent" /> {cp.level}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded border border-border/40"><Wrench className="h-3 w-3" /> {cp.toolsCount}</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-[420px] overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={cn('flex gap-3', m.role === 'user' ? 'justify-end' : '')}>
              {m.role === 'assistant' && (
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center"><Bot className="h-4 w-4 text-emerald-accent" /></span>
              )}
              <div className={cn('max-w-[80%]', m.role === 'user' ? 'order-1' : '')}>
                {m.role === 'user' && <span className="flex-shrink-0 h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center mb-1"><User className="h-4 w-4" /></span>}
                <div className={cn('rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                  m.role === 'user' ? 'bg-primary text-primary-foreground' : 'glass border border-border/40')}>
                  <FormattedContent content={m.content} />
                </div>
                {m.role === 'assistant' && m.tools && m.tools.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1"><Sparkles className="h-3 w-3" /> {cp.toolsLabel}</span>
                    {m.tools.map((to, ti) => (
                      <span key={ti} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-emerald-accent border border-primary/20">{to}</span>
                    ))}
                  </div>
                )}
                {m.role === 'assistant' && m.freshness && (
                  <div className="mt-1 text-[10px] text-muted-foreground font-mono">{cp.freshness}: {new Date(m.freshness).toLocaleTimeString(lang === 'fa' ? 'fa-IR' : 'en-US')}</div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center"><Bot className="h-4 w-4 text-emerald-accent" /></span>
              <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> {cp.consulting}
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-xs text-sev-critical"><AlertCircle className="h-3.5 w-3.5" /> {error}</div>
          )}
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2 border-t border-border/40 flex flex-wrap gap-1.5">
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} disabled={loading}
              className="text-[11px] px-2.5 py-1 rounded-full border border-border/40 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors">
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border/40 flex gap-2">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={cp.placeholder}
            rows={1}
            className="min-h-[44px] max-h-32 resize-none bg-background/60"
            disabled={loading}
          />
          <Button onClick={() => send()} disabled={loading || !input.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </Card>

      {/* Trust footer */}
      <div className="mt-4 grid sm:grid-cols-3 gap-3">
        {cp.trust.map((tr, idx) => (
          <div key={tr.t} className="glass rounded-xl p-3 flex items-start gap-2.5">
            <span className="text-emerald-accent mt-0.5">{trustIcons[idx]}</span>
            <div>
              <div className="text-sm font-medium">{tr.t}</div>
              <div className="text-xs text-muted-foreground">{tr.d}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

function FormattedContent({ content }: { content: string }) {
  // lightweight markdown-ish rendering (headings, bold, bullets)
  const lines = content.split('\n')
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (/^#{1,3}\s/.test(line)) {
          return <div key={i} className="font-semibold text-foreground mt-2 first:mt-0">{line.replace(/^#{1,3}\s/, '')}</div>
        }
        if (/^\s*[-*]\s/.test(line)) {
          return <div key={i} className="pl-3 relative"><span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-muted-foreground" />{renderInline(line.replace(/^\s*[-*]\s/, ''))}</div>
        }
        if (line.trim() === '') return <div key={i} className="h-1" />
        return <div key={i}>{renderInline(line)}</div>
      })}
    </div>
  )
}
function renderInline(s: string) {
  // bold **x**
  const parts = s.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => p.startsWith('**') && p.endsWith('**')
    ? <strong key={i} className="font-semibold text-foreground">{p.slice(2, -2)}</strong>
    : <span key={i}>{p}</span>)
}
