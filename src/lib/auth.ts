// Simple password hashing (not bcrypt to avoid native build). For production, swap to bcrypt/argon2.
export async function hashPassword(password: string): Promise<string> {
  // Use Web Crypto (available in Node 18+ and edge). Simple PBKDF2-ish via SHA-256 + salt.
  const { createHash, randomBytes } = await import('crypto')
  const salt = randomBytes(16).toString('hex')
  const hash = createHash('sha256').update(salt + password).digest('hex')
  return `${salt}:${hash}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const { createHash } = await import('crypto')
  const test = createHash('sha256').update(salt + password).digest('hex')
  return test === hash
}

export function genToken(): string {
  return Array.from({ length: 48 }, () => Math.floor(Math.random() * 36).toString(36)).join('') + Date.now().toString(36)
}
