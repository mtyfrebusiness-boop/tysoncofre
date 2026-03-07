import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || '')

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

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'tysoncofre@remax.pt'
    
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Tyson Cofre RE/MAX <onboarding@resend.dev>',
          to: adminEmail,
          subject: `🔔 Novo Lead: ${name}`,
          html: `
            <h2>Novo Contacto Recebido</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone || 'Não fornecido'}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
            <p><strong>Fonte:</strong> ${source || 'homepage'}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Recebido em: ${new Date().toLocaleString('pt-PT')}
            </p>
          `
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Continue even if email fails - lead is saved
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json(
      { error: 'Erro ao processar o pedido. Por favor, tente novamente.' },
      { status: 500 }
    )
  }
}
