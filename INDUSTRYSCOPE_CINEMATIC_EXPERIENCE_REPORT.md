# INDUSTRYSCOPE — CINEMATIC INDUSTRIAL ENTRANCE — IMPLEMENTATION REPORT

> Luxury 3D Brand Experience V2 — Persian-first, scroll-driven, cinematic.

---

## 0. Status Snapshot

| Area | Status |
|---|---|
| Cinematic 3D hero (truck → warehouse → intelligence → network → handoff) | **COMPLETED** |
| Persian-first i18n (fa default, rtl) + EN toggle (ltr) | **COMPLETED** |
| Vazirmatn (fa) + Geist (en) typography | **COMPLETED** |
| Scroll-driven camera + truck physics | **COMPLETED** |
| Warehouse with instanced boxes, racks, conveyor, forklift, machine | **COMPLETED** |
| Spatial data overlays (Warehouse A / SKU-2048 / Shipment #1842 / Machine M-204) | **COMPLETED** |
| Progressive localized brand copy reveal | **COMPLETED** |
| 2D / reduced-motion / WebGL-fail fallback | **COMPLETED** |
| Cinematic3DErrorBoundary (graceful 2D fallback, no raw error) | **COMPLETED** |
| Performance: in-view 3D unmount (one-way downgrade) | **COMPLETED** |
| All existing sections preserved + localized | **COMPLETED** |
| Copilot responds in fa (natural Persian, Persian numerals) | **COMPLETED** |
| Lint | **COMPLETED** (clean, 1 benign font warning) |
| Browser self-verification (desktop, mobile, fa, en, copilot, sections) | **COMPLETED** |

The build is a **working cinematic prototype**. No claim of "production-ready".

---

## 1. The Cinematic Storyboard (implemented)

A single continuous 3D world, scroll-driven over a 760vh sticky canvas:

| Scroll | Scene | What happens |
|---|---|---|
| 0% | The Road | Dark industrial horizon, atmospheric haze, lane markings. Eyebrow + INDUSTRYSCOPE wordmark over the road. |
| ~18% | The Truck | Premium tractor-trailer enters from the left; camera tracks. |
| ~36% | The Journey | Side profile reveals the INDUSTRYSCOPE container branding (both sides, drei Text). |
| ~46% | The Exit | Truck passes camera and accelerates toward the facility. |
| ~60% | The Follow | Camera follows; warehouse facade grows in the background. |
| ~72% | The Warehouse | Camera enters the warehouse; interior revealed (racks, instanced boxes, conveyor, forklift, pallets, machine). |
| ~78% | Intelligence | Emerald point-light grows; spatial data overlays activate around selected objects. |
| ~86% | Brand | Localized headline + subhead + supporting copy reveal progressively (fa: «کل عملیات خود را یکجا ببینید.» / en: "See Your Entire Operation."). |
| ~88% | Network | 5 connected nodes (factory → warehouse → truck → distribution → customer) appear as camera pulls up. |
| ~95–100% | Command Center | Seamless fade to page background; the sticky canvas releases and the Executive Command Center section scrolls up — the physical world becomes the intelligence layer. |

The truck has believable motion: acceleration curve, wheel rotation proportional to distance, subtle suspension bob, contact shadow that fades with distance. Fog manages depth and hides the world edges.

---

## 2. Persian-First i18n

- **Default**: `lang="fa"`, `dir="rtl"` (set in layout; reconciled client-side after mount to avoid hydration mismatch).
- **Toggle**: `فارسی | EN` button in Nav (desktop + mobile). Persisted to `localStorage`.
- **Mechanism**: external store via `useSyncExternalStore` (lint-clean, hydration-safe). SSR snapshot = `fa`; persisted preference applied post-mount so React hydration matches.
- **Typography**: Vazirmatn (Google Fonts) for fa, Geist for en — scoped via `html[lang="fa"]` CSS rules.
- **Coverage**: comprehensive dictionary (`src/lib/i18n.tsx`) covering nav, hero, liveWorld, commandCenter, inventory, logistics, risk, copilot, ecosystem, intelligence, enterprise, footer. Operational data (SKU codes, shipment references, alert titles) kept in original form per spec.
- **RTL-aware**: `rtl-flip` utility for arrows; `←` / `→` chosen by lang; overlay copy respects `dir`.
- **AI Copilot**: `/api/copilot` accepts `lang`; fa prompt instructs natural Iranian Persian with Persian numerals, keeps brand wordmark / tool names / SKU codes original. Verified: returns «داده‌های مشاهده‌شده», «ریسک‌های شناسایی‌شده», «توصیه» with `(get_command_center)` citation.

---

## 3. Architecture (new + reused)

New files:
- `src/lib/i18n.tsx` — dictionary + external-store provider + `useI18n`.
- `src/components/industrial/CinematicHero3D.tsx` — scroll-driven R3F scene.
- `src/components/industrial/CinematicHero2D.tsx` — static SVG cinematic fallback.
- `src/components/industrial/Cinematic3DErrorBoundary.tsx` — graceful WebGL-fail fallback.

Reused / extended:
- `src/components/industrial/Hero.tsx` — rewritten as the cinematic wrapper (scroll progress, in-view 3D, error boundary, progressive copy overlays, handoff fade).
- `src/app/layout.tsx` — Vazirmatn font, default fa/rtl, I18nProvider.
- `src/app/globals.css` — Persian font scoping, RTL utilities.
- All existing industrial components — localized to use the dictionary.
- `src/app/api/copilot/route.ts` — accepts `lang`, instructs the LLM accordingly.

Reused stack: React Three Fiber, drei (`Text`, `Html`, `RoundedBox`, `Environment`, `Float`), Three.js, Tailwind 4, shadcn/ui, z-ai-web-dev-sdk. **No new runtime dependencies introduced** (three / @react-three/fiber / @react-three/drei were already installed in V1).

---

## 4. Performance Considerations

- **3D is lazy-loaded** (`lazy(() => import(...))`) and only mounted while the hero is in view the **first** time.
- **One-way downgrade**: once the hero scrolls out of view, the 3D canvas unmounts and a lightweight 2D SVG placeholder takes over — it never remounts 3D, avoiding WebGL context churn / context-lost crashes. This frees the main thread for the rest of the page (AI Copilot, tables, etc.).
- **Instanced inventory boxes** (60) via `instancedMesh` instead of individual meshes.
- **DPR capped** at `[1, 1.5]`.
- **Shadows off** (`shadows={false}`) for the canvas; contact shadow is a cheap alpha plane.
- **Limited lights**: ambient + hemisphere + 1 directional + 3 point lights (one emerald "intelligence" light whose intensity is scroll-driven).
- **Fog** manages depth and hides far geometry so we don't over-build.
- **Copy overlays driven by direct-DOM rAF** (no React re-renders during scroll).
- **Three.js never loaded on non-3D pages/sections** (lazy + in-view gate).

---

## 5. Accessibility & Fallbacks

- **Semantic HTML** carries all important content (headlines, nav, sections, footer) — SEO and screen readers work without WebGL.
- **Reduced-motion**: `detectWebGL()` checks `prefers-reduced-motion: reduce` and returns false → 2D static cinematic is shown.
- **WebGL-fail**: `useSyncExternalStore`-based detection; if no WebGL, 2D fallback renders.
- **Runtime WebGL failure** (e.g. context lost): `Cinematic3DErrorBoundary` catches it and renders the 2D fallback — users never see "WebGL Error" or a raw application-error screen.
- **Keyboard / focus**: nav and CTAs are keyboard-reachable; the cinematic is decorative (pointer-events-none overlays except CTAs).
- **Brand wordmark** "INDUSTRYSCOPE" is always English in both locales (per spec). Localized copy is the headlines.

---

## 6. Tests Performed (Agent Browser + curl + VLM)

1. **Desktop load** — HTTP 200, title correct, no page errors, no console errors (only benign Three.js `Clock` deprecation + HMR logs).
2. **fa/rtl default** — `document.documentElement.lang === 'fa'`, `dir === 'rtl'`. Persian brand copy (کل عملیات / هر سیگنال / IndustryScope داده) reveals in warehouse phase.
3. **Cinematic scroll** — screenshots at p=0 (road), ~30% (truck), ~78% (warehouse/brand); VLM confirmed dark premium industrial mood, road, lane markings, 3D vehicle, INDUSTRYSCOPE branding.
4. **EN/LTR switch** — toggle to EN; `lang=en`, `dir=ltr`; nav + hero + command center ("Good morning", "things need your attention") in English; persisted across reload.
5. **fa command center** — "صبح بخیر", "بحرانی", "توجه" present.
6. **Copilot fa** — Persian suggestion → LLM answer with «مشاهده», «توصی», «پیش‌بینی» and `get_command_center` citation; no application error.
7. **Copilot en** — English suggestion → answer with `get_low_stock` citation, "Products at Risk", RECOMMEND; no application error.
8. **Inventory filter (en)** — Stockout tab returns rows.
9. **Logistics** — shipment list + detail panel update on selection.
10. **Risk matrix** — renders.
11. **Mobile (iPhone 15)** — fa/rtl, language switcher + hamburger menu with fa nav links, cinematic scrolls without error, footer at bottom.
12. **Sticky footer** — at absolute bottom on both desktop (scrollY=maxScroll) and mobile.
13. **curl API checks** — `/api/command-center` 200, `/api/copilot` (fa) 200 with Persian answer, `/api/copilot` (en) 200.
14. **Lint** — clean (1 benign `no-page-custom-font` warning for the Vazirmatn `<link>`, which is the only option since Vazirmatn isn't in next/font's built-in list).

---

## 7. Known Limitations & Technical Debt

- **Headless-browser WebGL context loss** on rapid remount is mitigated by the one-way 3D→2D downgrade + error boundary. Real users on real GPUs will not hit this; the headless verification confirmed graceful fallback.
- **Vazirmatn via `<link>`** instead of `next/font` (Vazirmatn is not in next/font/google's built-in list) — produces a benign lint warning. The font loads correctly and is scoped to `html[lang="fa"]`.
- **Single demo organization** — i18n covers UI chrome; operational data (SKU codes, shipment refs, alert titles from the seeded DB) remain in their original form per the spec ("Do not mechanically translate" / keep brand wordmark).
- **Auto-intro** — deliberately omitted to avoid trapping scroll (per spec: "must not trap scrolling"). The establishing shot at p=0 is dynamic enough (truck entering, emerald breathing dots). The experience is fully user-driven.
- **Sound** — none added (per spec: muted by default / deliberate accessible implementation; the experience is complete without audio).
- **3D assets** — truck, warehouse, forklift, conveyor built procedurally from primitives (no external GLB). This keeps the bundle small and avoids asset-loading failures, at the cost of visual fidelity vs. a hand-modeled GLB. A future phase could swap in optimized GLB/GLTF assets.
- **Digital Twin / IoT / agents** — out of scope for this cinematic phase (P4–P5 per the master roadmap).

---

## 8. Assets Introduced

- No external binary assets. All 3D is procedural (R3F primitives + drei helpers).
- Fonts: Vazirmatn (Google Fonts CSS, fa only).
- No new npm dependencies (three / @react-three/fiber / @react-three/drei installed in V1).

---

## 9. Final Result

The opening experience now tells the visual story:

```
DARK INDUSTRIAL ENVIRONMENT → INDUSTRYSCOPE TRUCK → TRUCK CROSSES SCREEN
→ TRUCK EXITS → CAMERA FOLLOWS → WAREHOUSE REVEALED → INDUSTRIAL WORLD
→ BRAND INTRODUCTION (Persian-first) → LIVE INTELLIGENCE (spatial overlays)
→ NETWORK → COMMAND CENTER (seamless handoff to the existing product).
```

It feels like entering a living industrial world — **INDUSTRYSCOPE, the Digital Brain of Industrial Operations** — in Persian by default, switchable to English, with graceful fallbacks for every device and capability.

# INDUSTRYSCOPE
## SEE. UNDERSTAND. PREDICT. ACT.
## کل عملیات خود را یکجا ببینید.
