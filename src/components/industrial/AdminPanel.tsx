'use client'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { useRouter } from '@/lib/router'
import { toast } from 'sonner'
import { Lock, Loader2, Trash2, Plus, Save, LogOut, ShieldCheck, FileText, Users, Settings, Star } from 'lucide-react'

type Article = {
  id: string; slug: string; category: string; title: string; insight: string; body: string
  stat?: string | null; statLabel?: string | null; delta?: string | null; readMins: number
  published: boolean; metaDescription?: string | null; keywords?: string | null; externalLinks?: string | null
  ogImage?: string | null
}

export default function AdminPanel() {
  const { t } = useI18n()
  const { navigate } = useRouter()
  const [authed, setAuthed] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [tab, setTab] = useState<'leads' | 'articles' | 'content'>('leads')
  const o = t.owner

  const login = async () => {
    try {
      const r = await fetch('/api/owner-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ passcode }) })
      if (r.ok) { setAuthed(true); toast.success('✓') }
      else toast.error(o.wrong)
    } catch { toast.error('error') }
  }
  const logout = () => { setAuthed(false); setPasscode(''); navigate('') }

  if (!authed) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="glass-strong rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-accent"><ShieldCheck className="h-6 w-6" /><h1 className="text-xl font-semibold">{o.title}</h1></div>
          <p className="text-sm text-muted-foreground">{o.desc}</p>
          <div>
            <Label htmlFor="ap" className="text-xs">{o.passcodeLabel}</Label>
            <Input id="ap" type="password" value={passcode} onChange={e => setPasscode(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} dir="ltr" placeholder={o.passcodePlaceholder} className="mt-1 bg-background/60" />
          </div>
          <Button onClick={login} className="w-full bg-primary text-primary-foreground"><Lock className="h-4 w-4 mr-2" /> {o.login}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-emerald-accent" /> {o.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{o.desc}</p>
        </div>
        <Button variant="outline" onClick={logout}><LogOut className="h-4 w-4 mr-2" /> {o.logout}</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-foreground/[0.03] border border-border/40 mb-6 w-fit">
        <TabBtn active={tab === 'leads'} onClick={() => setTab('leads')} icon={<Users className="h-4 w-4" />} label={t.nav.commandCenter + ' / لیدها'} />
        <TabBtn active={tab === 'articles'} onClick={() => setTab('articles')} icon={<FileText className="h-4 w-4" />} label="مقالات" />
        <TabBtn active={tab === 'content'} onClick={() => setTab('content')} icon={<Settings className="h-4 w-4" />} label="محتوای سایت" />
      </div>

      {tab === 'leads' && <LeadsTab passcode={passcode} />}
      {tab === 'articles' && <ArticlesTab passcode={passcode} />}
      {tab === 'content' && <ContentTab passcode={passcode} />}
    </div>
  )
}

function TabBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors', active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>
      {icon} {label}
    </button>
  )
}

// ---- Leads tab ----
function LeadsTab({ passcode }: { passcode: string }) {
  const { t } = useI18n()
  const o = t.owner
  const [leads, setLeads] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/leads', { headers: { 'x-owner-passcode': passcode } })
      if (r.ok) { const d = await r.json(); setLeads(d.leads); setStats(d.stats) }
    } finally { setLoading(false) }
  }, [passcode])
  useEffect(() => { load() }, [load])
  const setStatus = async (id: string, status: string) => { await fetch('/api/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-owner-passcode': passcode }, body: JSON.stringify({ id, status }) }); load() }
  const remove = async (id: string) => { await fetch(`/api/leads?id=${id}`, { method: 'DELETE', headers: { 'x-owner-passcode': passcode } }); toast.success('✓'); load() }

  const statusColor = (s: string) => ({ new: 'bg-sev-medium/15 text-sev-medium', contacted: 'bg-sev-info/15 text-sev-info', qualified: 'bg-primary/15 text-emerald-accent', won: 'bg-sev-low/15 text-sev-low', lost: 'bg-sev-critical/15 text-sev-critical' }[s] || '')

  if (loading) return <div className="py-12 text-center text-sm text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline" /></div>
  if (leads.length === 0) return <div className="py-12 text-center text-sm text-muted-foreground">{o.noLeads}</div>
  return (
    <div className="space-y-4">
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label={o.stats.total} value={stats.total} />
          <Stat label={o.stats.new} value={stats.new} />
          <Stat label={o.stats.won} value={stats.won} />
          <Stat label={o.stats.newsletter} value={stats.newsletterSubscribers} />
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-border/40">
        <table className="w-full text-sm min-w-[760px]">
          <thead><tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/40 bg-foreground/[0.02]">
            <th className="px-3 py-2">نوع</th><th className="px-3 py-2">نام</th><th className="px-3 py-2">تماس</th><th className="px-3 py-2">پیام</th><th className="px-3 py-2">تاریخ</th><th className="px-3 py-2">وضعیت</th><th className="px-3 py-2"></th>
          </tr></thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-border/20 align-top">
                <td className="px-3 py-3"><Badge variant="outline" className="text-[10px]">{o.leadType[l.type as keyof typeof o.leadType] ?? l.type}</Badge></td>
                <td className="px-3 py-3"><div className="font-medium">{l.name || '—'}</div>{l.company && <div className="text-[11px] text-muted-foreground">{l.company}</div>}{l.tier && <div className="text-[10px] text-emerald-accent font-mono">{l.tier}</div>}</td>
                <td className="px-3 py-3 text-xs"><div dir="ltr" style={{ direction: 'ltr' }} className="font-mono">{l.email}</div>{l.phone && <div dir="ltr" style={{ direction: 'ltr' }} className="font-mono text-muted-foreground">{l.phone}</div>}</td>
                <td className="px-3 py-3 text-xs text-muted-foreground max-w-xs"><div className="line-clamp-2">{l.message || '—'}</div></td>
                <td className="px-3 py-3 text-[11px] text-muted-foreground font-mono whitespace-nowrap">{new Date(l.createdAt).toLocaleString()}</td>
                <td className="px-3 py-3"><span className={cn('inline-block px-2 py-0.5 rounded border text-[10px] font-semibold', statusColor(l.status))}>{o.status[l.status as keyof typeof o.status] ?? l.status}</span></td>
                <td className="px-3 py-3"><div className="flex items-center gap-1">
                  <select value={l.status} onChange={e => setStatus(l.id, e.target.value)} className="text-[10px] bg-background/60 border border-border/40 rounded px-1.5 py-1">
                    {['new', 'contacted', 'qualified', 'won', 'lost'].map(s => <option key={s} value={s}>{o.status[s as keyof typeof o.status] ?? s}</option>)}
                  </select>
                  <button onClick={() => remove(l.id)} className="p-1 text-muted-foreground hover:text-sev-critical"><Trash2 className="h-3.5 w-3.5" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
function Stat({ label, value }: { label: string; value: number }) {
  return <div className="glass rounded-xl p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div></div>
}

// ---- Articles tab ----
function ArticlesTab({ passcode }: { passcode: string }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Article | null>(null)
  const [creating, setCreating] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/article', { headers: { 'x-owner-passcode': passcode } })
      if (r.ok) { const d = await r.json(); setArticles(d.articles) }
    } finally { setLoading(false) }
  }, [passcode])
  useEffect(() => { load() }, [load])

  const blank: Article = { id: '', slug: '', category: 'صنعت', title: '', insight: '', body: '', stat: '', statLabel: '', delta: '', readMins: 5, published: true, metaDescription: '', keywords: '', externalLinks: '', ogImage: '' }

  const del = async (slug: string) => {
    if (!confirm('حذف مقاله؟')) return
    await fetch(`/api/admin/article?slug=${slug}`, { method: 'DELETE', headers: { 'x-owner-passcode': passcode } })
    toast.success('حذف شد ✓'); load()
  }

  if (loading) return <div className="py-12 text-center text-sm text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline" /></div>

  if (creating || editing) {
    return <ArticleEditor article={editing || blank} isNew={creating} passcode={passcode} onClose={() => { setEditing(null); setCreating(false) }} onSaved={() => { setEditing(null); setCreating(false); load() }} />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">مقالات ({articles.length})</h2>
        <Button onClick={() => setCreating(true)} className="bg-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> مقالهٔ جدید</Button>
      </div>
      <div className="grid gap-3">
        {articles.map((a) => (
          <div key={a.id} className="glass rounded-xl p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[10px]">{a.category}</Badge>
                {a.published ? <Badge className="text-[10px] bg-sev-low/15 text-sev-low">منتشرشده</Badge> : <Badge variant="outline" className="text-[10px]">پیش‌نویس</Badge>}
                <span className="text-[10px] font-mono text-muted-foreground">/{a.slug}</span>
              </div>
              <h3 className="mt-1 font-medium">{a.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.insight}</p>
              {a.keywords && <p className="text-[10px] text-emerald-accent/70 font-mono mt-1 line-clamp-1">سئو: {a.keywords}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={() => setEditing(a)}>ویرایش</Button>
              <button onClick={() => del(a.slug)} className="p-2 text-muted-foreground hover:text-sev-critical"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArticleEditor({ article, isNew, passcode, onClose, onSaved }: { article: Article; isNew: boolean; passcode: string; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState<Article>(article)
  const [saving, setSaving] = useState(false)
  const set = (k: keyof Article, v: any) => setF(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!f.slug || !f.title || !f.insight || !f.body) { toast.error('slug، عنوان، بینش و متن الزامی‌اند'); return }
    setSaving(true)
    try {
      const r = await fetch('/api/admin/article', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-owner-passcode': passcode }, body: JSON.stringify(f) })
      const d = await r.json()
      if (d.ok) { toast.success('ذخیره شد ✓'); onSaved() }
      else toast.error(d.error || 'خطا')
    } catch { toast.error('خطا') }
    finally { setSaving(false) }
  }

  return (
    <div className="glass-strong rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{isNew ? 'مقالهٔ جدید' : 'ویرایش مقاله'}</h2>
        <Button variant="ghost" onClick={onClose}>بستن</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Slug (آدرس انگلیسی) *"><Input value={f.slug} onChange={e => set('slug', e.target.value)} dir="ltr" placeholder="my-article" className="bg-background/60" /></Field>
        <Field label="دسته‌بندی">
          <select value={f.category} onChange={e => set('category', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background/60 px-3 text-sm">
            <option value="صنعت">صنعت</option>
            <option value="لجستیک">لجستیک</option>
            <option value="زنجیره تأمین">زنجیره تأمین</option>
            <option value="هوش مصنوعی">هوش مصنوعی</option>
            <option value="تولید">تولید</option>
            <option value="اقتصاد">اقتصاد</option>
            <option value="عملیات">عملیات</option>
            <option value="موجودی">موجودی</option>
          </select>
        </Field>
      </div>
      <Field label="عنوان *"><Input value={f.title} onChange={e => set('title', e.target.value)} className="bg-background/60" /></Field>
      <Field label="بینش (خلاصهٔ کوتاه) *"><Textarea value={f.insight} onChange={e => set('insight', e.target.value)} rows={2} className="bg-background/60" /></Field>
      <Field label="متن کامل (Markdown) *"><Textarea value={f.body} onChange={e => set('body', e.target.value)} rows={10} className="bg-background/60 font-mono text-xs" dir="ltr" /></Field>
      <div className="grid sm:grid-cols-3 gap-3">
        <Field label="آمار (عدد)"><Input value={f.stat || ''} onChange={e => set('stat', e.target.value)} className="bg-background/60" /></Field>
        <Field label="برچسب آمار"><Input value={f.statLabel || ''} onChange={e => set('statLabel', e.target.value)} className="bg-background/60" /></Field>
        <Field label="تغییر (دلتا)"><Input value={f.delta || ''} onChange={e => set('delta', e.target.value)} className="bg-background/60" /></Field>
      </div>
      <Field label="آدرس عکس کاور (URL)">
        <Input value={f.ogImage || ''} onChange={e => set('ogImage', e.target.value)} dir="ltr" placeholder="/images/articles/cover-industry.png" className="bg-background/60" />
      </Field>
      {f.ogImage && (
        <div className="rounded-lg overflow-hidden border border-border/40 max-h-32">
          <img src={f.ogImage} alt="cover preview" className="w-full h-full object-cover" />
        </div>
      )}
      {/* SEO */}
      <div className="border-t border-border/40 pt-4 space-y-3">
        <div className="text-xs uppercase tracking-wider text-emerald-accent font-semibold">سئو (SEO)</div>
        <Field label="Meta Description (توضیحات متا — حداکثر ۱۶۰ کاراکتر)"><Textarea value={f.metaDescription || ''} onChange={e => set('metaDescription', e.target.value)} rows={2} maxLength={500} className="bg-background/60" /></Field>
        <Field label="کلمات کلیدی (با ویرگول)"><Input value={f.keywords || ''} onChange={e => set('keywords', e.target.value)} placeholder="کلمه۱, کلمه۲, keyword3" className="bg-background/60" /></Field>
        <Field label="لینک‌های خارجی (JSON — برای سئو بین‌سایتی)"><Textarea value={f.externalLinks || ''} onChange={e => set('externalLinks', e.target.value)} rows={3} dir="ltr" placeholder='[{"label":"FinScope","url":"https://finscope.ir"}]' className="bg-background/60 font-mono text-xs" /></Field>
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.published} onChange={e => set('published', e.target.checked)} /> منتشر شود</label>
        <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground ml-auto">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> ذخیره</>}</Button>
      </div>
    </div>
  )
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label className="text-xs">{label}</Label><div className="mt-1">{children}</div></div>
}

// ---- Site content tab ----
function ContentTab({ passcode }: { passcode: string }) {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [subtab, setSubtab] = useState<'texts' | 'appearance' | 'contact' | 'enterprise'>('texts')
  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/settings')
      if (r.ok) { const d = await r.json(); setSettings(d.settings || {}) }
    } finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const set = (k: string, v: string) => setSettings(s => ({ ...s, [k]: v }))

  const sections: { title: string; items: { key: string; label: string; type?: 'textarea' }[] }[] = [
    {
      title: 'بخش ورودی (Hero)',
      items: [
        { key: 'hero_headline', label: 'تیتر اصلی' },
        { key: 'hero_subhead', label: 'زیرتیتر' },
        { key: 'hero_supporting', label: 'متن پشتیبان', type: 'textarea' },
      ],
    },
    {
      title: 'بخش دنیای صنعتی زنده',
      items: [
        { key: 'liveworld_title', label: 'تیتر' },
        { key: 'liveworld_desc', label: 'توضیح', type: 'textarea' },
      ],
    },
    {
      title: 'بخش مرکز فرماندهی',
      items: [
        { key: 'cmd_title', label: 'تیتر' },
        { key: 'cmd_desc', label: 'توضیح', type: 'textarea' },
      ],
    },
    {
      title: 'بخش دستیار هوش مصنوعی',
      items: [
        { key: 'copilot_title', label: 'تیتر' },
        { key: 'copilot_desc', label: 'توضیح', type: 'textarea' },
      ],
    },
    {
      title: 'سئو (SEO)',
      items: [
        { key: 'seo_meta_title', label: 'عنوان متا (Meta Title) — برای موتورهای جستجو' },
        { key: 'seo_meta_description', label: 'توضیحات متا (Meta Description)', type: 'textarea' },
        { key: 'seo_keywords', label: 'کلمات کلیدی سایت (با ویرگول)' },
        { key: 'seo_og_title', label: 'عنوان OpenGraph (شبکه‌های اجتماعی)' },
        { key: 'seo_og_description', label: 'توضیح OpenGraph', type: 'textarea' },
      ],
    },
  ]

  const appearanceItems: { key: string; label: string; type: 'color' | 'text' }[] = [
    { key: 'theme_accent', label: 'رنگ تأکید (Accent)', type: 'color' },
    { key: 'theme_background', label: 'رنگ پس‌زمینه', type: 'color' },
    { key: 'theme_foreground', label: 'رنگ متن', type: 'color' },
    { key: 'theme_primary', label: 'رنگ اصلی (Primary)', type: 'color' },
  ]

  const contactItems: { key: string; label: string }[] = [
    { key: 'contact_phone', label: 'شماره تماس' },
    { key: 'contact_email', label: 'ایمیل' },
    { key: 'contact_address', label: 'آدرس' },
    { key: 'contact_hours', label: 'ساعات کاری' },
  ]

  const enterpriseItems: { key: string; label: string; type?: 'textarea' }[] = [
    { key: 'cta_title', label: 'تیتر دعوت سازمانی' },
    { key: 'cta_desc', label: 'توضیحات دعوت سازمانی', type: 'textarea' },
    { key: 'cta_book_btn', label: 'متن دکمهٔ رزرو' },
  ]

  const save = async () => {
    setSaving(true)
    try {
      const r = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-owner-passcode': passcode }, body: JSON.stringify({ settings }) })
      if (r.ok) toast.success('ذخیره شد ✓ (برای اعمال کامل، صفحه را رفرش کنید)')
      else toast.error('خطا')
    } finally { setSaving(false) }
  }

  if (loading) return <div className="py-12 text-center text-sm text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline" /></div>

  const renderField = (item: { key: string; label: string; type?: 'textarea' | 'color' }) => {
    if (item.type === 'color') {
      return (
        <Field key={item.key} label={item.label}>
          <div className="flex items-center gap-2">
            <input type="color" value={settings[item.key] || '#10b981'} onChange={e => set(item.key, e.target.value)} className="h-10 w-16 rounded border border-border/40 bg-transparent cursor-pointer" />
            <Input value={settings[item.key] || ''} onChange={e => set(item.key, e.target.value)} dir="ltr" placeholder="#10b981" className="bg-background/60 font-mono text-sm" />
          </div>
        </Field>
      )
    }
    if (item.type === 'textarea') {
      return <Field key={item.key} label={item.label}><Textarea value={settings[item.key] || ''} onChange={ev => set(item.key, ev.target.value)} rows={3} className="bg-background/60" /></Field>
    }
    return <Field key={item.key} label={item.label}><Input value={settings[item.key] || ''} onChange={ev => set(item.key, ev.target.value)} className="bg-background/60" /></Field>
  }

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'texts', label: '📝 متن‌های سایت' },
          { id: 'appearance', label: '🎨 ظاهر و رنگ‌ها' },
          { id: 'contact', label: '📞 اطلاعات تماس' },
          { id: 'enterprise', label: '💼 بخش سازمانی' },
        ].map(s => (
          <button key={s.id} onClick={() => setSubtab(s.id as any)} className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-colors border', subtab === s.id ? 'bg-primary text-primary-foreground border-primary' : 'glass border-border/40 hover:border-primary/30')}>{s.label}</button>
        ))}
      </div>

      <div className="glass-strong rounded-2xl p-5 sm:p-6 space-y-6">
        {subtab === 'texts' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">📝 ویرایش متن‌های سایت</h2>
              <p className="text-xs text-muted-foreground mt-1">متن‌های هر بخش از سایت را ویرایش کنید. تغییرات در پایگاه داده ذخیره می‌شوند؛ برای اعمال کامل، صفحه را رفرش کنید.</p>
            </div>
            {sections.map(sec => (
              <div key={sec.title} className="space-y-3 pb-4 border-b border-border/30 last:border-0">
                <h3 className="text-sm font-semibold text-emerald-accent">{sec.title}</h3>
                {sec.items.map(item => renderField(item))}
              </div>
            ))}
          </div>
        )}
        {subtab === 'appearance' && (
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">🎨 ظاهر و رنگ‌ها</h2>
              <p className="text-xs text-muted-foreground mt-1">رنگ‌های برند را شخصی‌سازی کنید. (پیش‌نمایش زنده در نسخهٔ پیشرفته فعال خواهد شد.)</p>
            </div>
            {appearanceItems.map(item => renderField(item as any))}
          </div>
        )}
        {subtab === 'contact' && (
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">📞 اطلاعات تماس</h2>
              <p className="text-xs text-muted-foreground mt-1">راه‌های ارتباطی نمایش‌داده‌شده در سراسر سایت.</p>
            </div>
            {contactItems.map(item => renderField(item as any))}
          </div>
        )}
        {subtab === 'enterprise' && (
          <div className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">💼 بخش سازمانی</h2>
              <p className="text-xs text-muted-foreground mt-1">متن‌های بخش قیمت‌گذاری و دعوت سازمانی.</p>
            </div>
            {enterpriseItems.map(item => renderField(item))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <p className="text-[11px] text-muted-foreground">برای اعمال کامل، صفحه را رفرش کنید.</p>
          <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> ذخیرهٔ تغییرات</>}</Button>
        </div>
      </div>
    </div>
  )
}
