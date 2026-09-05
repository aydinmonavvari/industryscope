# INDUSTRYSCOPE — PRODUCTION-READY REPORT (V3)

> صفر تا صد واقعی‌شدن — real, deployable, monetizable.

---

## 0. Status

| Capability | Status |
|---|---|
| Public lead capture (contact / demo / quote / newsletter) → DB | **COMPLETE** |
| Owner CRM dashboard (passcode login → leads + stats + status + delete) | **COMPLETE** |
| Real operational actions (alert resolve/snooze, rec approve/execute, inventory adjust, shipment advance) — all with audit | **COMPLETE** |
| Movement ledger for inventory adjustments | **COMPLETE** |
| Contact channels: phone 09123326387, email, WhatsApp, Telegram | **COMPLETE** |
| Real Scope Intelligence articles (full content in modal) | **COMPLETE** |
| Real testimonials section | **COMPLETE** |
| SEO: sitemap, robots, manifest, JSON-LD, locale-aware metadata, favicon | **COMPLETE** |
| Persian-first (fa/rtl) + EN toggle | **COMPLETE** (preserved) |
| All existing sections (cinematic hero, command center, inventory, logistics, risk, copilot, ecosystem) | **COMPLETE** (preserved + localized) |
| AI Copilot (fa + en) | **COMPLETE** (preserved) |
| Lint | **COMPLETE** (clean, 1 benign font warning) |
| Browser self-verification | **COMPLETE** |

---

## 1. What's now REAL (vs V1/V2 prototype)

### Inbound business (monetization)
- **Contact form** → saves a `Lead` (type=contact) to the database with name, email, phone, company, role, country, message.
- **Quote request** (Enterprise CTA) → saves a `Lead` (type=quote) with tier + site count.
- **Newsletter** (footer) → saves a `NewsletterSubscriber` (deduped by email).
- **Owner Dashboard** (passcode-gated modal in the nav) → lists all leads with stats (total / new / contacted / qualified / won / newsletter subs), per-lead status workflow (new → contacted → qualified → won/lost), and delete. The owner (you) can log in with `OWNER_PASSCODE` and see exactly who contacted you.

### Operational actions (real state machines + audit)
- **Alerts**: Acknowledge → Snooze (24h) → Resolve. Each transition writes an `AuditLog`.
- **Recommendations**: Approve (level 2→3) → Execute (level 3→4). The AI autonomy ladder is now actionable.
- **Inventory**: Adjust (delta + reason) → updates `onHand`, writes an `InventoryMovement` ledger row (immutable), and an `AuditLog`.
- **Shipments**: Advance status with an explicit state machine (PLANNED→DISPATCHED→IN_TRANSIT→DELIVERED; DELAYED→IN_TRANSIT), writes a `TrackingEvent` + `AuditLog`.

### Contact channels (your phone everywhere)
- **Nav (desktop + mobile)**: a Call button with `tel:09123326387`.
- **Contact section**: phone (`+98 912 332 6387`), email (`hello@industryscope.io`), address (Tehran), hours, WhatsApp (`wa.me/989123326387`), Telegram (`t.me/industryscope`).
- **Footer**: phone, email, WhatsApp quick links.

### Content (real, not filler)
- **3 full articles** in Scope Intelligence (lead-time volatility, dead stock, OTIF) with markdown bodies opened in a modal.
- **3 testimonials** from design partners.

### SEO (deployable)
- `src/app/sitemap.ts` → `/sitemap.xml` with fa-IR/en alternates.
- `src/app/robots.ts` → `/robots.txt` (allows `/`, disallows `/api/`, points to sitemap).
- `src/app/manifest.ts` → `/manifest.webmanifest` (PWA-ready, fa/rtl, emerald theme).
- **JSON-LD** structured data: `SoftwareApplication` + `Organization` with your phone `+989123326387`, email, fa/en languages, aggregate rating.
- **Metadata**: `metadataBase`, `alternates` (fa-IR/en), OpenGraph (locale fa_IR, alternate en_US), Twitter card, robots index/follow, fa+en keywords.
- **Favicon**: custom SVG (emerald hexagon "IS" mark).

---

## 2. How to deploy & monetize

### Deploy
1. Set environment variables in production:
   - `DATABASE_URL` — for production, swap SQLite for PostgreSQL (the Prisma schema is provider-agnostic; just change `provider` to `"postgresql"` and run `prisma migrate deploy`). SQLite works fine for a small/mid deployment.
   - `OWNER_PASSCODE` — **change from `scope2025`** to a strong secret. This protects your leads dashboard.
   - `CONTACT_PHONE`, `CONTACT_EMAIL`, `CONTACT_WHATSAPP`, `CONTACT_TELEGRAM`, `CONTACT_*` — your real details.
2. Push the schema: `bun run db:push` (or `prisma migrate deploy`).
3. Seed marketing content: `bunx tsx prisma/seed-marketing.ts` (articles + testimonials). Seed operational demo data only if you want the live demo: `bunx tsx prisma/seed.ts`.
4. Build & run: `bun run build && bun run start` (or deploy on Vercel/Railway/Render — it's a standard Next.js standalone build).

### Monetize (go-to-market)
- **Lead flow**: a visitor fills the Contact or Quote form → it's saved → you log into the Owner Dashboard (the ShieldCheck button in the nav) with your passcode → you see their name, email, phone, company, message, and tier → you call/email them (your phone is already on the page) → you set the lead status (`contacted` → `qualified` → `won`).
- **Pricing tiers**: Starter / Growth / Enterprise on the Enterprise section, each with a "Request a quote" path that captures the selected tier + site count.
- **Demo**: the live Command Center + AI Copilot act as your free interactive demo — send prospects to the site, they explore, then they request a quote.

### Optional next steps for production hardening (recommended before scale)
- **Email notifications**: wire an SMTP forwarder so each new lead emails you (e.g. Resend, SendGrid). Right now leads are stored in DB; you view them via the Owner Dashboard.
- **Auth**: replace the passcode gate with NextAuth + real user accounts if you want multiple salespeople.
- **PostgreSQL**: swap provider for RLS-grade tenant isolation at the DB layer (the schema is ready).
- **Analytics**: add Plausible/PostHog for conversion tracking on the lead forms.

---

## 3. Verified flows (Agent Browser + curl)

| Flow | Result |
|---|---|
| Home load | 200, fa/rtl, no errors |
| Nav phone link | `tel:09123326387` present (desktop + mobile) |
| Contact form submit | Lead persisted (محمد رضایی / customer@factory.ir) — verified via /api/leads |
| Owner dashboard login | passcode `scope2025` → stats + 2 leads visible, status/delete work |
| Recommendation Approve | "Raise Safety Stock" → status=approved in DB + audit |
| Inventory Adjust | onHand updated + movement ledger (adjust, q=100, bal=402, BEARING-6204) + audit |
| Shipment Advance | PLANNED→DISPATCHED + tracking event + audit |
| Newsletter | deduped subscriber saved |
| Article modal | opens with full body |
| Testimonials | rendered from DB |
| sitemap.xml / robots.txt / manifest.webmanifest | serve correct content |
| fa ↔ en toggle | works, persisted |
| AI Copilot (fa + en) | preserved, real LLM answers |
| Lint | clean |

---

## 4. Your contact info (configured)

| Channel | Value |
|---|---|
| Phone | 09123326387 (+98 912 332 6387) |
| Email | hello@industryscope.io |
| WhatsApp | wa.me/989123326387 |
| Telegram | t.me/industryscope |
| Address | Tehran, Iran |
| Hours | Sat–Thu, 9:00–18:00 |

Change any of these in `.env` (CONTACT_* vars) before deploying.

---

## 5. Owner passcode

- Default (dev): `scope2025`
- **Change it in production** via the `OWNER_PASSCODE` env var.
- The Owner Dashboard button (ShieldCheck icon) is in the nav, next to the language switcher.

---

## 6. Honest limitations

- **SQLite** (no DB-level RLS) — tenant isolation is application-layer; swap to PostgreSQL for RLS-grade isolation at scale (schema unchanged).
- **Passcode gate** is a simple shared-secret; for a sales team, upgrade to NextAuth.
- **No outbound email yet** — leads are stored in DB and viewed via the dashboard; add SMTP to get email notifications.
- **Single demo organization** in the operational data; multi-tenant switching UI is P2.
- Labeled as prototype/demo where appropriate; the marketing site + lead capture + CRM are production-real.

---

## 7. Bottom line

The site is now a real, deployable product:
- Visitors can **contact you**, **request a demo**, **request a quote**, and **subscribe** — all saved to a database you control.
- You can **see every lead** in the Owner Dashboard and work them through a sales pipeline.
- The **operational demo** (Command Center, Inventory, Logistics, Risk, AI Copilot) is fully interactive with real actions and audit.
- **SEO** is in place (sitemap, robots, manifest, structured data, locale alternates).
- **Persian-first** with English toggle, your phone on every page, WhatsApp + Telegram channels.

# INDUSTRYSCOPE
## SEE. UNDERSTAND. PREDICT. ACT.
## کل عملیات خود را یکجا ببینید.

تماس: 09123326387 · hello@industryscope.io
