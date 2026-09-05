'use client'
// 2D SVG fallback for the industrial world — used when WebGL unavailable or reduced-motion.
export default function IndustrialWorld2D({ className }: { className?: string }) {
  const nodes = [
    { id: 'factory', x: 80, y: 120, color: '#10b981', label: 'Factory' },
    { id: 'warehouse', x: 280, y: 80, color: '#22d3ee', label: 'Warehouse' },
    { id: 'truck', x: 480, y: 130, color: '#f59e0b', label: 'Logistics' },
    { id: 'distribution', x: 680, y: 90, color: '#a78bfa', label: 'Distribution' },
    { id: 'customer', x: 880, y: 120, color: '#34d399', label: 'Customer' },
  ]
  const routes = [
    ['factory', 'warehouse'],
    ['warehouse', 'truck'],
    ['truck', 'distribution'],
    ['distribution', 'customer'],
  ]
  const get = (id: string) => nodes.find(n => n.id === id)!
  return (
    <svg viewBox="0 0 960 200" className={className} role="img" aria-label="Industrial world: factory to warehouse to logistics to distribution to customer">
      <defs>
        <linearGradient id="flow" x1="0" x2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {routes.map((r, i) => {
        const a = get(r[0]); const b = get(r[1])
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="url(#flow)" strokeWidth="2" strokeDasharray="4 6" />
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="22" fill={n.color} fillOpacity="0.12" />
          <rect x={n.x - 12} y={n.y - 12} width="24" height="24" rx="4" fill={n.color} fillOpacity="0.9" />
          <text x={n.x} y={n.y + 40} textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="ui-monospace, monospace">{n.label}</text>
        </g>
      ))}
    </svg>
  )
}
