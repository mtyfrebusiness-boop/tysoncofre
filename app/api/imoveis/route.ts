import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const priceType = searchParams.get('priceType')
    const district = searchParams.get('district')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const featured = searchParams.get('featured')

    const where: any = {}

    // Filter by featured
    if (featured === 'true') {
      where.featured = true
    } else if (featured === 'false' || featured === null) {
      // If not filtering by featured, show all (including non-featured)
    }

    // Filter by price type (sale or rent)
    if (priceType && priceType !== 'all') {
      where.priceType = priceType
    }

    // Filter by property type
    if (type && type !== 'all') {
      where.type = type
    }

    // Filter by district
    if (district && district !== 'all') {
      where.district = {
        contains: district,
        mode: 'insensitive'
      }
    }

    // Filter by price range
    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice) }
    }
    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) }
    }

    // Filter by bedrooms
    if (bedrooms && bedrooms !== 'all') {
      where.bedrooms = parseInt(bedrooms)
    }

    const listings = await prisma.listing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 })
  }
}
