import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET all leads (admin)
export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(leads)
}

// DELETE lead
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.lead.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lead:', error)
    return NextResponse.json({ error: 'Error deleting lead' }, { status: 500 })
  }
}
