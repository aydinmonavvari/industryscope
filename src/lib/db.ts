import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Ensure DATABASE_URL works with Supabase Pooler (Transaction mode).
// The Pooler (pgbouncer) doesn't support prepared statements, so we append
// pgbouncer=true & connection_limit=1 to the URL if not already present.
function buildUrl(): string {
  const url = process.env.DATABASE_URL || ''
  if (!url) return url
  if (url.includes('pooler.supabase.com') || url.includes('pgbouncer')) {
    if (!url.includes('pgbouncer=true')) {
      const sep = url.includes('?') ? '&' : '?'
      return url + sep + 'pgbouncer=true&connection_limit=1'
    }
  }
  return url
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
    datasources: {
      db: { url: buildUrl() },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
