'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Brain, Send, Sparkles, ShieldCheck, Wrench, Loader2, User, Bot, AlertCircle } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'

type Msg = { role: 'user' | 'assistant'; content: string; tools?: string[]; confidence?: number; autonomy?: number; freshness?: string }

const SUGGESTIONS = [
  'Which products may stock out and what should I do?',
  'Why is my inventory capital so high?',
  'Which shipments are at risk of delay?',
  'Which supplier is underperforming and why?',
  'What needs my attention today?',
]

export default function AiCopilot() {
  const [messages, setMessages] = useState<Msg[]>([{
    role: 'assistant',
    content: "I'm IndustryScope AI — your operational intelligence copilot. I reason only over your connected operational data through a controlled tool registry, so every fact I cite is sourced. Ask me what needs your attention, what may stock out, or what to do next.",
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
        body: JSON.stringify({ question: q }),
      })
      if (!r.ok) throw new Error('request failed')
      const d = await r.json()
      setMessages(m => [...m, {
        role: 'assistant', content: d.answer, tools: d.toolsUsed, confidence: 0.85, autonomy: d.autonomyLevel, freshness: d.dataFreshness,
      }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'unknown')
      setMessages(m => [...m, { role: 'assistant', content: "I couldn't reach the intelligence layer right now. Please retry. (This is shown instead of fabricating an answer.)" }])
    } finally { setLoading(false) }
  }

  return (
    <SectionShell id="copilot">
      <SectionHeading
        eyebrow="AI Copilot"
        title={<>Ask your operation a question. <span className="text-emerald-accent">Get a sourced answer.</span></>}
        description="IndustryScope AI never invents operational facts. It reasons over structured tool results, labels observations vs predictions vs recommendations, and requires human approval before any sensitive action."
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
              <div className="text-sm font-semibold">IndustryScope AI</div>
              <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" /> tool-registry · tenant-bound · audited
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded border border-border/40"><ShieldCheck className="h-3 w-3 text-emerald-accent" /> L1 Recommend</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded border border-border/40"><Wrench className="h-3 w-3" /> 9 tools</span>
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
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1"><Sparkles className="h-3 w-3" /> tools:</span>
                    {m.tools.map((t, ti) => (
                      <span key={ti} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-emerald-accent border border-primary/20">{t}</span>
                    ))}
                  </div>
                )}
                {m.role === 'assistant' && m.freshness && (
                  <div className="mt-1 text-[10px] text-muted-foreground font-mono">data freshness: {new Date(m.freshness).toLocaleTimeString()}</div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center"><Bot className="h-4 w-4 text-emerald-accent" /></span>
              <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Consulting tool registry…
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-xs text-sev-critical"><AlertCircle className="h-3.5 w-3.5" /> {error}</div>
          )}
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2 border-t border-border/40 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map(s => (
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
            placeholder="Ask: what needs my attention today?…"
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
        {[
          { icon: <ShieldCheck className="h-4 w-4" />, title: 'No direct DB access', desc: 'Model reasons only over explicit tool outputs.' },
          { icon: <Sparkles className="h-4 w-4" />, title: 'Hallucination control', desc: 'Observations vs predictions vs recommendations are labeled.' },
          { icon: <Wrench className="h-4 w-4" />, title: 'Audited & tenant-bound', desc: 'Every tool call logged with args and resource.' },
        ].map(t => (
          <div key={t.title} className="glass rounded-xl p-3 flex items-start gap-2.5">
            <span className="text-emerald-accent mt-0.5">{t.icon}</span>
            <div>
              <div className="text-sm font-medium">{t.title}</div>
              <div className="text-xs text-muted-foreground">{t.desc}</div>
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
