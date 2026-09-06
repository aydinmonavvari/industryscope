import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
    const safe = testimonials.map((t) => ({
      id: t.id, name: t.name, role: t.role, company: t.company, quote: t.quote, rating: t.rating,
      avatar: t.avatar, published: t.published,
      createdAt: t.createdAt instanceof Date ? t.createdAt.toISOString() : String(t.createdAt ?? ''),
    }))
    return NextResponse.json({ testimonials: safe })
  } catch (e) {
    console.error('testimonials error', e)
    return NextResponse.json({ testimonials: [] }, { status: 200 })
  }
}
