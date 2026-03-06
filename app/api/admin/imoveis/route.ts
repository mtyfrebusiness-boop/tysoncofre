import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all listings (admin)
export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(listings)
}

// POST new listing
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const listing = await prisma.listing.create({
      data: {
        slug: body.slug,
        title: body.title,
        titleEn: body.titleEn || null,
        titleEs: body.titleEs || null,
        description: body.description,
        descriptionEn: body.descriptionEn || null,
        descriptionEs: body.descriptionEs || null,
        price: body.price,
        priceType: body.priceType || 'sale',
        status: body.status || 'available',
        type: body.type,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        area: body.area,
        location: body.location,
        district: body.district || null,
        parish: body.parish || null,
        lat: body.lat || null,
        lng: body.lng || null,
        energyClass: body.energyClass || null,
        features: JSON.stringify(body.features || []),
        images: body.images && body.images.length > 0 ? JSON.stringify(body.images.split(',').map((img: string) => img.trim()).filter(Boolean)) : '[]',
        featured: body.featured || false,
      }
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error('Error creating listing:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Error creating listing: ' + message }, { status: 500 })
  }
}
