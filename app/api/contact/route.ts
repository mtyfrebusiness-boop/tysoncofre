import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message, source, listingId } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      )
    }

    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        source: source || 'homepage',
        listingId: listingId || null,
      },
    })

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json(
      { error: 'Erro ao processar o pedido. Por favor, tente novamente.' },
      { status: 500 }
    )
  }
}
