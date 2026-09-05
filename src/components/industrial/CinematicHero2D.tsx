'use client'
// Static cinematic composition (reduced-motion / WebGL fallback).
// Preserves the narrative: Truck → Warehouse → Brand → Intelligence, fully localized, no animation.
import { useI18n } from '@/lib/i18n'

export default function CinematicHero2D({ className }: { className?: string }) {
  const { t } = useI18n()
  const h = t.hero
  return (
    <div className={className}>
      <svg viewBox="0 0 1600 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label={h.live}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070b12" />
            <stop offset="55%" stopColor="#0c1320" />
            <stop offset="100%" stopColor="#070a10" />
          </linearGradient>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1118" />
            <stop offset="100%" stopColor="#070a10" />
          </linearGradient>
          <linearGradient id="container" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#222a35" />
            <stop offset="100%" stopColor="#161c25" />
          </linearGradient>
          <linearGradient id="wh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#11161e" />
            <stop offset="100%" stopColor="#0a0f16" />
          </linearGradient>
        </defs>

        {/* sky */}
        <rect width="1600" height="900" fill="url(#sky)" />
        {/* distant horizon buildings */}
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={i * 90} y={470 - (i % 5) * 28} width={70} height={150 + (i % 4) * 30} fill="#0a1018" />
        ))}
        {/* atmospheric haze */}
        <rect y="430" width="1600" height="120" fill="#0c1320" opacity="0.5" />
        {/* road */}
        <polygon points="0,900 1600,900 1100,560 500,560" fill="url(#road)" />
        {/* lane markings */}
        {Array.from({ length: 10 }).map((_, i) => (
          <polygon key={i} points={`${500 + i * 100},620 ${540 + i * 100},620 ${560 + i * 100},680 ${490 + i * 100},680`} fill="#1b2433" opacity="0.7" />
        ))}

        {/* warehouse structure (right side, receding) */}
        <rect x="900" y="380" width="640" height="380" fill="url(#wh)" stroke="#1c2330" strokeWidth="2" />
        {/* roof trusses */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={900 + i * 160} y="382" width="6" height="378" fill="#222a35" opacity="0.6" />
        ))}
        {/* warehouse interior racks (simplified) */}
        {[0, 1, 2, 3, 4].map((c) => (
          <g key={c}>
            <rect x={950 + c * 110} y={560} width="60" height="180" fill="#1a2028" stroke="#2a323e" strokeWidth="1" />
            <rect x={950 + c * 110} y={620} width="60" height="8" fill="#222a35" />
            <rect x={950 + c * 110} y={680} width="60" height="8" fill="#222a35" />
            {/* boxes */}
            <rect x={956 + c * 110} y={630} width="22" height="22" fill="#8a7f6a" />
            <rect x={982 + c * 110} y={628} width="22" height="24" fill="#7a6f5a" />
            <rect x={956 + c * 110} y={690} width="22" height="22" fill="#8a7f6a" />
          </g>
        ))}

        {/* intelligence overlay on warehouse */}
        <g opacity="0.9">
          <rect x="960" y="430" width="170" height="64" rx="6" fill="#020617" stroke="#10b98166" />
          <text x="972" y="448" fill="#10b981" fontSize="13" fontFamily="ui-monospace, monospace" fontWeight="600">WAREHOUSE A</text>
          <text x="972" y="466" fill="#cbd5e1" fontSize="11" fontFamily="ui-monospace, monospace">Inventory · 12,482 units</text>
          <text x="972" y="482" fill="#cbd5e1" fontSize="11" fontFamily="ui-monospace, monospace">Risk · LOW</text>
        </g>

        {/* truck (centered, side profile) */}
        <g transform="translate(620, 600)">
          {/* shadow */}
          <ellipse cx="180" cy="120" rx="220" ry="14" fill="#000" opacity="0.45" />
          {/* container */}
          <rect x="0" y="20" width="300" height="100" rx="6" fill="url(#container)" stroke="#0d1218" strokeWidth="1.5" />
          <text x="150" y="74" textAnchor="middle" fill="#d7dee8" fontSize="34" fontWeight="700" fontFamily="ui-sans-serif, system-ui" letterSpacing="1">INDUSTRYSCOPE</text>
          <text x="150" y="98" textAnchor="middle" fill="#5b6573" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="3">AI OPERATING SYSTEM</text>
          {/* container rear doors */}
          <rect x="294" y="22" width="8" height="96" fill="#0e131a" />
          {/* chassis */}
          <rect x="10" y="120" width="280" height="14" fill="#0d1218" />
          {/* cab */}
          <rect x="300" y="40" width="90" height="80" rx="14" fill="#222a35" stroke="#0d1218" strokeWidth="1.5" />
          <rect x="312" y="50" width="70" height="34" rx="4" fill="#0a1822" opacity="0.7" />
          <rect x="386" y="74" width="6" height="18" fill="#bfe0ff" />
          {/* wheels */}
          {[40, 110, 250, 320, 360].map((wx) => (
            <circle key={wx} cx={wx} cy={140} r="20" fill="#15181d" />
          ))}
        </g>
      </svg>
    </div>
  )
}
