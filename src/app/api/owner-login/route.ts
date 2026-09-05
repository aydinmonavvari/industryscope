import { NextResponse } from 'next/server'
import { ownerAuthOk } from '@/lib/config'

// Owner login: validate passcode. Returns 200 if ok, 401 otherwise.
// No JWT — the client just stores the passcode and sends it as x-owner-passcode.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { passcode } = body as { passcode?: string }
  if (ownerAuthOk(passcode)) return NextResponse.json({ ok: true })
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
}
