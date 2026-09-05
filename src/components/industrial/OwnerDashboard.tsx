'use client'
import { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { toast } from 'sonner'
import { Lock, Loader2, Trash2, Phone, Mail, LogOut, ShieldCheck, Users, TrendingUp, Trophy } from 'lucide-react'

type Lead = {
  id: string; type: string; name: string | null; email: string; phone: string | null
  company: string | null; role: string | null; message: string | null; tier: string | null; sites: number | null
  status: string; createdAt: string
}
type Stats = { total: number; new: number; contacted: number; qualified: number; won: number; lost: number; byType: Record<string, number>; newsletterSubscribers: number }

export default function OwnerDashboard({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t } = useI18n()
  const o = t.owner
  const [authed, setAuthed] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats | null>(null)

  const login = async () => {
    setLoggingIn(true)
    try {
      const r = await fetch('/api/owner-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ passcode }) })
      if (r.ok) { setAuthed(true); toast.success('✓'); }
      else toast.error(o.wrong)
    } finally { setLoggingIn(false) }
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/leads', { headers: { 'x-owner-passcode': passcode } })
      if (r.ok) { const d = await r.json(); setLeads(d.leads); setStats(d.stats) }
    } finally { setLoading(false) }
  }, [passcode])

  useEffect(() => { if (authed) load() }, [authed, load])

  const setStatus = async (id: string, status: string) => {
    const r = await fetch('/api/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-owner-passcode': passcode }, body: JSON.stringify({ id, status }) })
    if (r.ok) { toast.success('✓'); load() }
  }
  const remove = async (id: string) => {
    const r = await fetch(`/api/leads?id=${id}`, { method: 'DELETE', headers: { 'x-owner-passcode': passcode } })
    if (r.ok) { toast.success('✓'); load() }
  }

  const logout = () => { setAuthed(false); setPasscode(''); setLeads([]); setStats(null); onOpenChange(false) }

  const statusColor = (s: string) => ({
    new: 'bg-sev-medium/15 text-sev-medium border-sev-medium/30',
    contacted: 'bg-sev-info/15 text-sev-info border-sev-info/30',
    qualified: 'bg-primary/15 text-emerald-accent border-primary/30',
    won: 'bg-sev-low/15 text-sev-low border-sev-low/30',
    lost: 'bg-sev-critical/15 text-sev-critical border-sev-critical/30',
  }[s] || '')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto glass-strong">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="h-5 w-5 text-emerald-accent" /> {o.title}
          </DialogTitle>
          <DialogDescription>{o.desc}</DialogDescription>
        </DialogHeader>

        {!authed ? (
          <div className="py-8 space-y-4">
            <div className="max-w-sm mx-auto space-y-3">
              <div>
                <Label htmlFor="oc-passcode" className="text-xs">{o.passcodeLabel}</Label>
                <Input id="oc-passcode" type="password" value={passcode} onChange={e => setPasscode(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} dir="ltr" placeholder={o.passcodePlaceholder} className="mt-1 bg-background/60" />
              </div>
              <Button onClick={login} disabled={loggingIn || !passcode} className="w-full bg-primary text-primary-foreground">
                {loggingIn ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Lock className="h-4 w-4 mr-2" /> {o.login}</>}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard icon={<Users className="h-4 w-4" />} label={o.stats.total} value={stats.total} />
                <StatCard icon={<TrendingUp className="h-4 w-4" />} label={o.stats.new} value={stats.new} accent="medium" />
                <StatCard icon={<Trophy className="h-4 w-4" />} label={o.stats.won} value={stats.won} accent="low" />
                <StatCard icon={<Mail className="h-4 w-4" />} label={o.stats.newsletter} value={stats.newsletterSubscribers} />
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={logout}><LogOut className="h-3.5 w-3.5 mr-1.5" /> {o.logout}</Button>
            </div>

            {/* Leads table */}
            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
            ) : leads.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">{o.noLeads}</div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border/40">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/40 bg-foreground/[0.02]">
                      <th className="px-3 py-2">{o.tableCols.type}</th>
                      <th className="px-3 py-2">{o.tableCols.name}</th>
                      <th className="px-3 py-2">{o.tableCols.contact}</th>
                      <th className="px-3 py-2">{o.tableCols.message}</th>
                      <th className="px-3 py-2">{o.tableCols.date}</th>
                      <th className="px-3 py-2">{o.tableCols.status}</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.id} className="border-b border-border/20 align-top">
                        <td className="px-3 py-3"><Badge variant="outline" className="text-[10px]">{o.leadType[l.type as keyof typeof o.leadType] ?? l.type}</Badge></td>
                        <td className="px-3 py-3">
                          <div className="font-medium">{l.name || '—'}</div>
                          {l.company && <div className="text-[11px] text-muted-foreground">{l.company}</div>}
                          {l.tier && <div className="text-[10px] text-emerald-accent font-mono mt-0.5">{l.tier}</div>}
                        </td>
                        <td className="px-3 py-3 text-xs">
                          <div dir="ltr" style={{ direction: 'ltr' }} className="font-mono">{l.email}</div>
                          {l.phone && <div dir="ltr" style={{ direction: 'ltr' }} className="font-mono text-muted-foreground flex items-center gap-1 mt-0.5"><Phone className="h-2.5 w-2.5" />{l.phone}</div>}
                        </td>
                        <td className="px-3 py-3 text-xs text-muted-foreground max-w-xs">
                          <div className="line-clamp-2">{l.message || '—'}</div>
                        </td>
                        <td className="px-3 py-3 text-[11px] text-muted-foreground font-mono whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                        <td className="px-3 py-3">
                          <span className={cn('inline-block px-2 py-0.5 rounded border text-[10px] font-semibold', statusColor(l.status))}>{o.status[l.status as keyof typeof o.status] ?? l.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1">
                            <select value={l.status} onChange={e => setStatus(l.id, e.target.value)} className="text-[10px] bg-background/60 border border-border/40 rounded px-1.5 py-1" aria-label={o.setStatus}>
                              {['new', 'contacted', 'qualified', 'won', 'lost'].map(s => <option key={s} value={s}>{o.status[s as keyof typeof o.status] ?? s}</option>)}
                            </select>
                            <button onClick={() => remove(l.id)} className="p-1 text-muted-foreground hover:text-sev-critical transition-colors" aria-label={o.delete}><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent?: 'medium' | 'low' }) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className={accent === 'medium' ? 'text-sev-medium' : accent === 'low' ? 'text-sev-low' : 'text-emerald-accent'}>{icon}</span>
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  )
}
