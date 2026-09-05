// IndustryScope — Seed realistic industrial demo data
import { db } from '../src/lib/db'

const ORG_NAME = 'Pars Industrial Group'

function rnd(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

async function main() {
  console.log('Seeding IndustryScope demo data...')

  // Clean (cascade-friendly order)
  await db.auditLog.deleteMany()
  await db.aiMessage.deleteMany()
  await db.aiConversation.deleteMany()
  await db.recommendation.deleteMany()
  await db.risk.deleteMany()
  await db.alert.deleteMany()
  await db.trackingEvent.deleteMany()
  await db.shipmentItem.deleteMany()
  await db.shipment.deleteMany()
  await db.inventoryMovement.deleteMany()
  await db.inventoryItem.deleteMany()
  await db.warehouse.deleteMany()
  await db.supplier.deleteMany()
  await db.product.deleteMany()
  await db.facility.deleteMany()
  await db.site.deleteMany()
  await db.organizationMember.deleteMany()
  await db.organization.deleteMany()

  const org = await db.organization.create({
    data: { name: ORG_NAME, industry: 'Manufacturing & Distribution', region: 'Middle East', currency: 'USD' },
  })
  const orgId = org.id

  // Members / RBAC
  const roles = ['Platform Admin', 'Organization Owner', 'Executive', 'Operations Manager', 'Supply Chain Manager', 'Logistics Manager', 'Warehouse Manager', 'Procurement Manager', 'Factory Manager', 'Finance Manager', 'Analyst', 'Viewer']
  for (const role of roles) {
    await db.organizationMember.create({ data: { organizationId: orgId, userId: `u_${role.toLowerCase().replace(/\s+/g, '_')}`, role } })
  }

  // Sites
  const sites = [
    { name: 'Tehran Factory', type: 'factory', region: 'Tehran', lat: 35.6892, lng: 51.3890 },
    { name: 'Qom Warehouse', type: 'warehouse', region: 'Qom', lat: 34.6401, lng: 50.8764 },
    { name: 'Bandar Abbas Distribution Center', type: 'distribution', region: 'Hormozgan', lat: 27.1832, lng: 56.2666 },
    { name: 'Tehran Office', type: 'office', region: 'Tehran', lat: 35.7219, lng: 51.3347 },
  ]
  for (const s of sites) {
    await db.site.create({ data: { ...s, organizationId: orgId } })
  }
  const siteRows = await db.site.findMany({ where: { organizationId: orgId } })

  // Facilities
  for (const s of siteRows.filter(s => s.type === 'factory')) {
    await db.facility.createMany({ data: [
      { siteId: s.id, name: `${s.name} — Line A`, type: 'production' },
      { siteId: s.id, name: `${s.name} — Line B`, type: 'production' },
      { siteId: s.id, name: `${s.name} — Staging`, type: 'staging' },
    ] })
  }

  // Products
  const products = [
    { sku: 'STEEL-COIL-01', name: 'Steel Coil HR 2mm', category: 'Raw Material', unit: 'kg', unitCost: '0.92', unitPrice: '1.40', leadTimeDays: 21, abcClass: 'A' },
    { sku: 'ALU-SHEET-02', name: 'Aluminum Sheet 1.5mm', category: 'Raw Material', unit: 'kg', unitCost: '2.10', unitPrice: '3.20', leadTimeDays: 18, abcClass: 'A' },
    { sku: 'COPPER-ROD-03', name: 'Copper Rod 8mm', category: 'Raw Material', unit: 'kg', unitCost: '7.40', unitPrice: '9.85', leadTimeDays: 28, abcClass: 'A' },
    { sku: 'PLASTIC-PELLET-04', name: 'PE Pellet HD-50', category: 'Raw Material', unit: 'kg', unitCost: '1.05', unitPrice: '1.65', leadTimeDays: 12, abcClass: 'B' },
    { sku: 'BEARING-6204', name: 'Bearing 6204-2RS', category: 'Component', unit: 'pcs', unitCost: '4.20', unitPrice: '7.10', leadTimeDays: 35, abcClass: 'A' },
    { sku: 'MOTOR-1HP', name: 'Electric Motor 1HP', category: 'Component', unit: 'pcs', unitCost: '88.00', unitPrice: '142.00', leadTimeDays: 42, abcClass: 'A' },
    { sku: 'SENSOR-TEMP-K', name: 'Thermocouple Type-K', category: 'Component', unit: 'pcs', unitCost: '12.50', unitPrice: '21.00', leadTimeDays: 14, abcClass: 'B' },
    { sku: 'OIL-LUBE-20', name: 'Industrial Lube Oil 20L', category: 'Consumable', unit: 'L', unitCost: '3.80', unitPrice: '6.20', leadTimeDays: 10, abcClass: 'B' },
    { sku: 'PKG-CARTON-M', name: 'Carton Box Medium', category: 'Packaging', unit: 'pcs', unitCost: '0.45', unitPrice: '0.80', leadTimeDays: 7, abcClass: 'C' },
    { sku: 'WIRE-CU-2.5', name: 'Copper Wire 2.5mm', category: 'Raw Material', unit: 'm', unitCost: '0.30', unitPrice: '0.55', leadTimeDays: 9, abcClass: 'C' },
    { sku: 'CHEM-SOLVENT', name: 'Industrial Solvent 5L', category: 'Consumable', unit: 'L', unitCost: '2.20', unitPrice: '3.90', leadTimeDays: 16, abcClass: 'C' },
    { sku: 'GASKET-NBR', name: 'NBR Gasket Set', category: 'Component', unit: 'set', unitCost: '6.80', unitPrice: '11.50', leadTimeDays: 24, abcClass: 'B' },
  ]
  for (const p of products) {
    await db.product.create({ data: { ...p, organizationId: orgId } })
  }
  const productRows = await db.product.findMany({ where: { organizationId: orgId } })

  // Suppliers
  const suppliers = [
    { name: 'Iran Alloy Co.', country: 'IR', rating: 0.82, onTimeRate: 0.78, avgLeadDays: 21, defectRate: 0.025 },
    { name: 'Gulf Metals FZE', country: 'AE', rating: 0.9, onTimeRate: 0.92, avgLeadDays: 14, defectRate: 0.01 },
    { name: 'Anatolia Components', country: 'TR', rating: 0.75, onTimeRate: 0.7, avgLeadDays: 28, defectRate: 0.04 },
    { name: 'Asia Bearings Ltd', country: 'CN', rating: 0.88, onTimeRate: 0.85, avgLeadDays: 35, defectRate: 0.015 },
    { name: 'Petrochem North', country: 'IR', rating: 0.7, onTimeRate: 0.68, avgLeadDays: 12, defectRate: 0.05 },
    { name: 'European Motor Works', country: 'DE', rating: 0.95, onTimeRate: 0.96, avgLeadDays: 42, defectRate: 0.005 },
  ]
  for (const s of suppliers) {
    await db.supplier.create({ data: { ...s, organizationId: orgId } })
  }
  const supplierRows = await db.supplier.findMany({ where: { organizationId: orgId } })

  // Warehouses (one per site)
  const warehouses: { id: string; name: string }[] = []
  for (const s of siteRows) {
    const w = await db.warehouse.create({ data: { organizationId: orgId, siteId: s.id, name: `${s.name} Storage`, capacity: s.type === 'warehouse' ? 250000 : s.type === 'distribution' ? 400000 : 80000 } })
    warehouses.push({ id: w.id, name: w.name })
  }

  // Inventory items
  const now = new Date()
  for (const p of productRows) {
    for (const w of warehouses) {
      const safety = Math.floor(rnd(200, 1500))
      const reorder = safety + Math.floor(rnd(100, 600))
      // Make a few critical low-stock / stockout / overstock cases
      let onHand = Math.floor(rnd(reorder * 0.4, reorder * 3))
      if (p.sku === 'STEEL-COIL-01' && w.name.includes('Tehran Factory')) onHand = Math.floor(safety * 0.4) // stockout risk
      if (p.sku === 'BEARING-6204' && w.name.includes('Qom')) onHand = Math.floor(safety * 0.5) // stockout risk
      if (p.sku === 'PKG-CARTON-M' && w.name.includes('Bandar Abbas')) onHand = Math.floor(reorder * 6) // overstock
      if (p.sku === 'CHEM-SOLVENT' && w.name.includes('Qom')) onHand = Math.floor(reorder * 5) // overstock / slow
      const reserved = Math.floor(onHand * rnd(0.05, 0.25))
      await db.inventoryItem.create({ data: { organizationId: orgId, warehouseId: w.id, productId: p.id, onHand, reserved, safetyStock: safety, reorderPoint: reorder } })
    }
  }

  // Shipments across suppliers → sites
  const statusCycle = ['PLANNED', 'DISPATCHED', 'IN_TRANSIT', 'DELAYED', 'DELIVERED']
  const dests = [{ name: 'Tehran Factory', lat: 35.6892, lng: 51.389 }, { name: 'Bandar Abbas DC', lat: 27.1832, lng: 56.2666 }, { name: 'Qom Warehouse', lat: 34.6401, lng: 50.8764 }]
  const origins = [{ name: 'Gulf Metals FZE, Jebel Ali', lat: 25.0097, lng: 55.0737 }, { name: 'Asia Bearings, Shanghai', lat: 31.2304, lng: 121.4737 }, { name: 'Anatolia, Istanbul', lat: 41.0082, lng: 28.9784 }, { name: 'European Motor Works, Munich', lat: 48.1351, lng: 11.582 }]
  for (let i = 0; i < 14; i++) {
    const sup = pick(supplierRows)
    const o = pick(origins)
    const d = pick(dests)
    const status = pick(statusCycle)
    const daysAgo = Math.floor(rnd(0, 8))
    const createdAt = new Date(now.getTime() - daysAgo * 86400000)
    const eta = new Date(now.getTime() + rnd(1, 6) * 86400000)
    const dispatchedAt = status === 'PLANNED' ? null : new Date(createdAt.getTime() + 86400000)
    const progress = status === 'DELIVERED' ? 1 : status === 'IN_TRANSIT' ? rnd(0.4, 0.8) : status === 'DELAYED' ? rnd(0.3, 0.6) : status === 'DISPATCHED' ? rnd(0.1, 0.35) : 0
    const delayMinutes = status === 'DELAYED' ? Math.floor(rnd(180, 2880)) : 0
    const distanceKm = Math.round(rnd(800, 7500))
    const sh = await db.shipment.create({
      data: {
        organizationId: orgId, reference: `SHP-${(1000 + i).toString()}`, supplierId: sup.id,
        originName: o.name, originLat: o.lat, originLng: o.lng,
        destName: d.name, destLat: d.lat, destLng: d.lng,
        carrier: pick(['DHL Industrial', 'Maersk Logistics', 'Internal Fleet', 'Rail Cargo']), status,
        eta, dispatchedAt, distanceKm, progress, delayMinutes, createdAt,
        deliveredAt: status === 'DELIVERED' ? new Date(now.getTime() - rnd(1, 5) * 86400000) : null,
      },
    })
    // items: 1-3 products
    const itemCount = Math.floor(rnd(1, 3))
    const chosen = [...productRows].sort(() => Math.random() - 0.5).slice(0, itemCount)
    for (const p of chosen) {
      await db.shipmentItem.create({ data: { shipmentId: sh.id, productId: p.id, quantity: Math.floor(rnd(50, 1200)) } })
    }
    // tracking events
    const eventCount = status === 'PLANNED' ? 0 : Math.floor(rnd(2, 5))
    for (let e = 0; e < eventCount; e++) {
      const t = new Date(createdAt.getTime() + e * 3600000 * 8)
      await db.trackingEvent.create({ data: { shipmentId: sh.id, status: pick(['DEPARTED', 'IN_TRANSIT', 'CUSTOMS', 'HUB', 'ARRIVED']), lat: rnd(28, 38), lng: rnd(48, 58), note: `Checkpoint ${e + 1}`, createdAt: t } })
    }
  }

  // Alerts — signature "7 things need your attention"
  const alerts = [
    { severity: 'CRITICAL', category: 'inventory', title: 'Steel Coil HR 2mm may stock out in 3 days', message: 'Tehran Factory on-hand below safety stock with active production consumption.', impact: 'Production interruption risk on Line A & B.', recommendation: 'Increase PO quantity by 12,000 kg; Gulf Metals FZE can deliver in 14 days.', confidence: 0.91, source: 'inventory-engine' },
    { severity: 'HIGH', category: 'logistics', title: 'Shipment SHP-1006 delayed at customs', message: 'Asia Bearings shipment 6 days in transit; ETA slipped by 28h.', impact: 'Bearing stockout risk within 5 days if not resolved.', recommendation: 'Escalate with carrier; expedite customs clearance.', confidence: 0.84, source: 'logistics-engine' },
    { severity: 'HIGH', category: 'supplier', title: 'Petrochem North on-time rate dropped to 68%', message: 'Last 4 PE Pellet deliveries late by avg 2.3 days.', impact: 'Packaging line contingency usage rising.', recommendation: 'Dual-source PE Pellet via Iran Alloy Co. pilot.', confidence: 0.78, source: 'supplier-engine' },
    { severity: 'HIGH', category: 'inventory', title: 'Carton Box overstock at Bandar Abbas DC', message: 'On-hand 4.8x reorder point; 92-day coverage.', impact: 'Working capital tied: ~$18,400.', recommendation: 'Pause next 2 carton POs; reallocate to Qom.', confidence: 0.88, source: 'inventory-engine' },
    { severity: 'MEDIUM', category: 'logistics', title: 'European Motor Works lead time +14% vs 90d avg', message: 'Avg 48d vs baseline 42d across last 6 POs.', impact: 'Motor availability planning buffer reduced.', recommendation: 'Increase safety stock from 120 to 160 pcs.', confidence: 0.72, source: 'lead-time-engine' },
    { severity: 'MEDIUM', category: 'inventory', title: 'Industrial Solvent slow-moving at Qom', message: 'Last 2 months consumption 22% of plan.', impact: 'Storage capacity pressure; expiry risk.', recommendation: 'Discount reallocate or reduce next PO 60%.', confidence: 0.69, source: 'inventory-engine' },
    { severity: 'LOW', category: 'supplier', title: 'Anatolia Components defect rate above threshold', message: 'Defect rate 4.0% vs target 2.0%.', impact: 'QC rejection cost trending up.', recommendation: 'Trigger supplier review; sample audit next lot.', confidence: 0.66, source: 'supplier-engine' },
  ]
  for (const a of alerts) {
    await db.alert.create({ data: { ...a, organizationId: orgId, status: 'open', createdAt: new Date(now.getTime() - rnd(1, 20) * 3600000) } })
  }
  // add a few more lower severity to enrich counts
  for (let i = 0; i < 9; i++) {
    await db.alert.create({ data: {
      organizationId: orgId,
      severity: pick(['LOW', 'INFO', 'MEDIUM']),
      category: pick(['inventory', 'logistics', 'supplier', 'system']),
      title: pick(['Sensor drift on Line A thermocouple', 'Lube oil reorder window approaching', 'Daily sync completed', 'Carton price list updated', 'Motor supplier invoice reconciled']),
      message: pick(['Automated check flagged minor variance.', 'Routine threshold reminder.', 'No action required.', 'Informational event logged.']),
      impact: 'Minimal.', recommendation: 'Monitor.', confidence: rnd(0.5, 0.8), source: 'system', status: 'open',
      createdAt: new Date(now.getTime() - rnd(2, 40) * 3600000),
    } })
  }

  // Risks
  const risks = [
    { dimension: 'inventory', title: 'Raw material stockout — Steel Coil', severity: 'CRITICAL', probability: 0.85, impact: 0.9, confidence: 0.9, recommendation: 'Issue PO +12,000 kg within 24h.' },
    { dimension: 'shipment', title: 'Inbound shipment delay — Asia Bearings', severity: 'HIGH', probability: 0.78, impact: 0.72, confidence: 0.82, recommendation: 'Expedite customs; activate backup supplier.' },
    { dimension: 'supplier', title: 'Supplier reliability — Petrochem North', severity: 'HIGH', probability: 0.7, impact: 0.6, confidence: 0.75, recommendation: 'Dual-source PE Pellet.' },
    { dimension: 'inventory', title: 'Overstock capital lock — Packaging', severity: 'MEDIUM', probability: 0.92, impact: 0.45, confidence: 0.86, recommendation: 'Pause next 2 carton POs.' },
    { dimension: 'lead_time', title: 'Lead time drift — European Motor Works', severity: 'MEDIUM', probability: 0.66, impact: 0.55, confidence: 0.72, recommendation: 'Raise safety stock to 160 pcs.' },
    { dimension: 'demand', title: 'Demand spike — Aluminum Sheet', severity: 'MEDIUM', probability: 0.6, impact: 0.6, confidence: 0.62, recommendation: 'Confirm forecast; pre-position Qom stock.' },
  ]
  for (const r of risks) {
    await db.risk.create({ data: { ...r, organizationId: orgId, score: r.probability * r.impact, source: 'risk-engine' } })
  }

  // Recommendations
  const recs = [
    { title: 'Prepare Purchase Order — Steel Coil HR 2mm', summary: '12,000 kg from Gulf Metals FZE to restore safety buffer.', rationale: 'Stockout risk in 3 days; supplier on-time 92%.', action: 'create_purchase_order', autonomyLevel: 2, impact: 'Prevents Line A/B stoppage; est. saved cost $42,000.', confidence: 0.9 },
    { title: 'Expedite Customs — Shipment SHP-1006', summary: 'Escalate with carrier; target clearance within 24h.', rationale: 'Bearing stockout risk within 5 days.', action: 'escalate_shipment', autonomyLevel: 1, impact: 'Avoids 5-day production buffer loss.', confidence: 0.82 },
    { title: 'Pause Next 2 Carton POs — Bandar Abbas', summary: 'Defer reorder until on-hand < 2x reorder point.', rationale: 'Overstock 4.8x; $18.4k capital locked.', action: 'pause_purchase_order', autonomyLevel: 1, impact: 'Frees ~$18,400 working capital.', confidence: 0.86 },
    { title: 'Raise Safety Stock — Electric Motor 1HP', summary: 'Adjust from 120 to 160 pcs.', rationale: 'Lead time drift +14% on primary supplier.', action: 'update_safety_stock', autonomyLevel: 0, impact: 'Improves availability buffer by 4 weeks.', confidence: 0.72 },
  ]
  for (const r of recs) {
    await db.recommendation.create({ data: { ...r, organizationId: orgId, status: 'pending' } })
  }

  // Audit logs (a few)
  for (let i = 0; i < 8; i++) {
    await db.auditLog.create({ data: {
      organizationId: orgId, actor: pick(['system', 'ops_manager', 'procurement', 'ai_copilot']),
      action: pick(['inventory.adjust', 'shipment.dispatched', 'alert.acknowledged', 'recommendation.prepared', 'ai.tool_called']),
      resource: pick(['inventory_item', 'shipment', 'alert', 'recommendation', 'ai_tool']),
      resourceId: `seed_${i}`, before: '{}', after: '{}',
      createdAt: new Date(now.getTime() - i * 3600000),
    } })
  }

  // One AI conversation seed (empty, to be filled by user)
  await db.aiConversation.create({ data: { organizationId: orgId, title: 'Daily Operations Review' } })

  console.log('Seed complete.')
  console.log(`  Org: ${org.name}`)
  console.log(`  Sites: ${siteRows.length}, Products: ${productRows.length}, Suppliers: ${supplierRows.length}`)
  console.log(`  Warehouses: ${warehouses.length}, Shipments: 14, Alerts: ${alerts.length + 9}, Risks: ${risks.length}, Recs: ${recs.length}`)
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(async () => { await db.$disconnect() })
