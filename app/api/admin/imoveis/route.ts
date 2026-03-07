import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all listings or single listing (admin)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (id) {
    const listing = await prisma.listing.findUnique({
      where: { id }
    })

    if (!listing) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 })
    }

    return NextResponse.json(listing)
  }

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

// PUT update listing
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const body = await req.json()
    
    // Generate slug from title if not provided
    let slug = body.slug
    if (!slug && body.title) {
      slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    const listing = await prisma.listing.update({
      where: { id },
      data: {
        slug,
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
    console.error('Error updating listing:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Error updating listing: ' + message }, { status: 500 })
  }
}

// DELETE listing
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Check if listing exists first
    const existing = await prisma.listing.findUnique({
      where: { id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 })
    }

    await prisma.listing.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting listing:', error)
    return NextResponse.json({ error: 'Error deleting listing' }, { status: 500 })
  }
}
