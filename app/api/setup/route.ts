import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

// This is a one-time setup route to initialize the database
// Call this once after deployment: https://yoursite.com/api/setup

export async function GET(request: NextRequest) {
  // Skip secret check for now - anyone can setup
  // const secret = request.nextUrl.searchParams.get('secret')
  // if (secret !== process.env.NEXTAUTH_SECRET) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  try {
    // Create tables if they don't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'admin'
      );
    `;
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Listing" (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        "titleEn" TEXT,
        "titleEs" TEXT,
        description TEXT NOT NULL,
        "descriptionEn" TEXT,
        "descriptionEs" TEXT,
        price REAL NOT NULL,
        "priceType" TEXT DEFAULT 'sale',
        status TEXT DEFAULT 'available',
        type TEXT NOT NULL,
        bedrooms INTEGER NOT NULL,
        bathrooms INTEGER NOT NULL,
        area REAL NOT NULL,
        location TEXT NOT NULL,
        district TEXT,
        parish TEXT,
        lat REAL,
        lng REAL,
        "energyClass" TEXT,
        features TEXT NOT NULL,
        images TEXT NOT NULL,
        featured BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "BlogPost" (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        "titleEn" TEXT,
        "titleEs" TEXT,
        content TEXT NOT NULL,
        "contentEn" TEXT,
        "contentEs" TEXT,
        excerpt TEXT NOT NULL,
        "coverImage" TEXT,
        published BOOLEAN DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `;
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Lead" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        source TEXT,
        "listingId" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        read BOOLEAN DEFAULT false
      );
    `;
    
    // Create admin user if not exists
    const existingUser = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL || 'tysoncofre@remax.pt' }
    })

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'tyson2024', 10)
      await prisma.user.create({
        data: {
          email: process.env.ADMIN_EMAIL || 'tysoncofre@remax.pt',
          password: hashedPassword,
          name: 'Tyson Cofre',
          role: 'admin'
        }
      })
      console.log('Admin user created')
    }

    // Seed sample listings if none exist
    const listingsCount = await prisma.listing.count()
    if (listingsCount === 0) {
      await prisma.listing.createMany({
        data: [
          {
            slug: 't3-almada-285000',
            title: 'T3 Apartamento Moderno em Almada',
            titleEn: 'Modern T3 Apartment in Almada',
            titleEs: 'Apartamento T3 Moderno en Almada',
            description: 'Apartamento T3 moderno localizado em Almada, com excelente exposição solar e vista desafogada. Acabamentos de alta qualidade, cozinha equipada, suite com closet. Próximo de transportes públicos e centros comerciais.',
            descriptionEn: 'Modern T3 apartment located in Almada, with excellent sun exposure and open views. High quality finishes, equipped kitchen, suite with closet. Close to public transport and shopping centers.',
            descriptionEs: 'Apartamento T3 moderno ubicado en Almada, con excelente exposición solar y vistas abiertas. Acabamientos de alta calidad, cocina equipada, suite con vestidor. Cerca de transporte público y centros comerciales.',
            price: 285000,
            priceType: 'sale',
            status: 'available',
            type: 'T3',
            bedrooms: 3,
            bathrooms: 2,
            area: 120,
            location: 'Almada, Setúbal',
            district: 'Setúbal',
            parish: 'Almada',
            lat: 38.6606,
            lng: -9.1564,
            energyClass: 'B',
            features: JSON.stringify(['Elevador', 'Varanda', 'Estacionamento', 'Ar Condicionado']),
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
              'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
            ]),
            featured: true
          },
          {
            slug: 't4-seixal-piscina-450000',
            title: 'T4 Moradia com Piscina em Seixal',
            titleEn: 'T4 Villa with Pool in Seixal',
            titleEs: 'Villa T4 con Piscina en Seixal',
            description: 'Moradia T4 ampla com piscina privada, jardim e garagem. Acabamentos de luxo, cozinha profissional, suite master com jacuzzi. Área de 250m2 num terreno de 500m2.',
            descriptionEn: 'Spacious T4 villa with private pool, garden and garage. Luxury finishes, professional kitchen, master suite with jacuzzi. Area of 250m2 on a 500m2 plot.',
            descriptionEs: 'Villa T4 amplia con piscina privada, jardín y garaje. Acabamientos de lujo, cocina profesional, suite principal con jacuzzi. Área de 250m2 en terreno de 500m2.',
            price: 450000,
            priceType: 'sale',
            status: 'available',
            type: 'Moradia',
            bedrooms: 4,
            bathrooms: 3,
            area: 250,
            location: 'Seixal, Setúbal',
            district: 'Setúbal',
            parish: 'Seixal',
            lat: 38.5178,
            lng: -9.1033,
            energyClass: 'A',
            features: JSON.stringify(['Piscina', 'Jardim', 'Garagem', 'Lareira', 'Jacuzzi']),
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
            ]),
            featured: true
          },
          {
            slug: 't2-centro-lisboa-175000',
            title: 'T2 Centro de Lisboa',
            titleEn: 'T2 Downtown Lisbon',
            titleEs: 'T2 Centro de Lisboa',
            description: 'Apartamento T2 no centro de Lisboa, completamente renovado com acabamentos modernos. Localização privilegiada próximo do Marquês de Pombal e Príncipe Real.',
            descriptionEn: 'T2 apartment in downtown Lisbon, completely renovated with modern finishes. Prime location near Marquês de Pombal and Príncipe Real.',
            descriptionEs: 'Apartamento T2 en el centro de Lisboa, completamente renovado con acabados modernos. Ubicación privilegiada cerca del Marquês de Pombal y Príncipe Real.',
            price: 175000,
            priceType: 'sale',
            status: 'available',
            type: 'T2',
            bedrooms: 2,
            bathrooms: 1,
            area: 75,
            location: 'Lisboa, Lisboa',
            district: 'Lisboa',
            parish: 'Avenidas Novas',
            lat: 38.7139,
            lng: -9.1394,
            energyClass: 'C',
            features: JSON.stringify(['Varanda', 'Elevador']),
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
            ]),
            featured: true
          },
          {
            slug: 't2-costa-caparica-frente-mar-1200',
            title: 'T2 Frente Mar em Costa da Caparica',
            titleEn: 'T2 Beachfront in Costa da Caparica',
            titleEs: 'T2 Frente Mar en Costa da Caparica',
            description: 'Apartamento T2 frente mar na Costa da Caparica, com vista panorâmica para o oceano. Ideal para investimento ou habitação própria. Rendimento garantido durante a época alta.',
            descriptionEn: 'Beachfront T2 apartment in Costa da Caparica, with panoramic ocean views. Ideal for investment or own home. Guaranteed income during high season.',
            descriptionEs: 'Apartamento T2 frente al mar en Costa da Caparica, con vistas panorámicas al océano. Ideal para inversión o vivienda propia. Ingreso garantizado durante la temporada alta.',
            price: 1200,
            priceType: 'rent',
            status: 'available',
            type: 'T2',
            bedrooms: 2,
            bathrooms: 1,
            area: 80,
            location: 'Costa da Caparica, Almada',
            district: 'Setúbal',
            parish: 'Costa da Caparica',
            lat: 38.6414,
            lng: -9.2056,
            energyClass: 'D',
            features: JSON.stringify(['Vista Mar', 'Varanda', 'Moblado']),
            images: JSON.stringify([
              'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
            ]),
            featured: true
          }
        ]
      })
      console.log('Sample listings created')
    }

    // Seed sample blog posts if none exist
    const postsCount = await prisma.blogPost.count()
    if (postsCount === 0) {
      await prisma.blogPost.createMany({
        data: [
          {
            slug: 'comprar-casa-almada-2024',
            title: 'Guia Completo para Comprar Casa em Almada em 2024',
            titleEn: 'Complete Guide to Buying a House in Almada in 2024',
            titleEs: 'Guía Completa para Comprar Casa en Almada en 2024',
            content: `# Guia Completo para Comprar Casa em Almada em 2024

Almada é uma das zonas mais procuradas para compra de imóveis na Grande Lisboa. Com excelentes acessos, beaches próximas e uma qualidade de vida elevada, não é difícil entender porquê.

## Por que comprar em Almada?

- **Localização estratégica**: A 15 minutos do centro de Lisboa
- **Transportes**: Metro, comboios e barco fluvial
- **Praias**: Costa da Caparica a poucos minutos
- **Preços mais acessíveis** que Lisboa centro

## Dicas importantes

1. **Defina o seu orçamento** - Considere não só o preço de compra mas também custos de escritura e impostos
2. **Verifique a energia do imóvel** - A classe energética afeta o custo de manutenção
3. **Pesquise a zona** - Visite o bairro em diferentes horários do dia
4. **Negocie** - O mercado tem margem para negociação

Posso ajudá-lo a encontrar o imóvel perfeito para as suas necessidades. Entre em contacto!`,
            contentEn: `# Complete Guide to Buying a House in Almada in 2024

Almada is one of the most sought-after areas for buying property in Greater Lisbon. With excellent access, nearby beaches, and a high quality of life, it's not hard to see why.

## Why buy in Almada?

- **Strategic location**: 15 minutes from downtown Lisbon
- **Transportation**: Metro, trains, and river ferry
- **Beaches**: Costa da Caparica just a few minutes away
- **More affordable prices** than downtown Lisbon

## Important tips

1. **Set your budget** - Consider not just the purchase price but also deed costs and taxes
2. **Check the energy rating** - Energy class affects maintenance costs
3. **Research the area** - Visit the neighborhood at different times of day
4. **Negotiate** - The market has room for negotiation

I can help you find the perfect property for your needs. Get in touch!`,
            contentEs: `# Guía Completa para Comprar Casa en Almada en 2024

Almada es una de las zonas más buscadas para la compra de inmuebles en Gran Lisboa. Con excelentes accesos, playas cercanas y una alta calidad de vida, no es difícil entender por qué.

## Por qué comprar en Almada?

- **Ubicación estratégica**: A 15 minutos del centro de Lisboa
- **Transporte**: Metro, trenes y ferry fluvial
- **Playas**: Costa da Caparica a pocos minutos
- **Precios más asequibles** que el centro de Lisboa

## Consejos importantes

1. **Defina su presupuesto** - Considere no solo el precio de compra sino también costos de escritura e impuestos
2. **Verifique la energía del inmueble** - La clase energética afecta el costo de mantenimiento
3. **Investigue la zona** - Visite el barrio en diferentes momentos del día
4. **Negocie** - El mercado tiene margen para negociación

¡Puedo ayudarlo a encontrar la propiedad perfecta para sus necesidades. Contáctenos!`,
            excerpt: 'Guia completo para compra de imóvel em Almada, zona cada vez mais procurada na Grande Lisboa.',
            published: true,
            coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
          },
          {
            slug: 'investir-immobiliario-portugal',
            title: 'Por que Investir no Mercado Imobiliário Português',
            titleEn: 'Why Invest in the Portuguese Real Estate Market',
            titleEs: 'Por qué Invertir en el Mercado Inmobiliario Portugués',
            content: `# Por que Investir no Mercado Imobiliário Português

Portugal continua a ser um dos destinos mais atrativos para investimento imobiliário na Europa. Com um mercado estável, regras claras e uma qualidade de vida excecional, o país oferece oportunidades únicas.

## Vantagens de investir em Portugal

1. **Estabilidade política e económica**
2. **Sistema jurídico transparente**
3. **Clima atractivo** para turismo
4. **Programa Golden Visa** (sujeito a condições)
5. **Crescimento constante** do mercado de arrendamento

## Tipos de investimento

- **Arrendamento de longa duração**: Rendimentos mensais estáveis
- **Arrendamento de curta duração**: Rentabilidade mais elevada (Airbnb)
- **Revenda**: Compra para valorização e venda posterior
- **Promoção imobiliária**: Para investidores com maior capacidade

## Zonas mais procuradas

- Lisboa e Porto (centro histórico)
- Costa do Algarve (turismo)
- Costa de Caparica (praias)
- Cascais (exclusividade)

 contacte-me para uma análise personalizada do seu investimento!`,
            contentEn: `# Why Invest in the Portuguese Real Estate Market

Portugal continues to be one of the most attractive destinations for real estate investment in Europe. With a stable market, clear rules, and exceptional quality of life, the country offers unique opportunities.

## Advantages of investing in Portugal

1. **Political and economic stability**
2. **Transparent legal system**
3. **Attractive climate** for tourism
4. **Golden Visa program** (subject to conditions)
5. **Constant growth** of the rental market

## Types of investment

- **Long-term rental**: Stable monthly income
- **Short-term rental**: Higher profitability (Airbnb)
- **Resale**: Buy for appreciation and later sale
- **Real estate development**: For investors with greater capacity

## Most sought-after areas

- Lisbon and Porto (historic center)
- Algarve coast (tourism)
- Costa de Caparica (beaches)
- Cascais (exclusivity)

Contact me for a personalized analysis of your investment!`,
            contentEs: `# Por qué Invertir en el Mercado Inmobiliario Portugués

Portugal continúa siendo uno de los destinos más atractivos para la inversión inmobiliaria en Europa. Con un mercado estable, reglas claras y una calidad de vida excepcional, el país ofrece oportunidades únicas.

## Ventajas de invertir en Portugal

1. **Estabilidad política y económica**
2. **Sistema jurídico transparente**
3. **Clima atractivo** para turismo
4. **Programa Golden Visa** (sujeto a condiciones)
5. **Crecimiento constante** del mercado de alquiler

## Tipos de inversión

- **Alquiler de larga duración**: Ingresos mensuales estables
- **Alquiler de corta duración**: Mayor rentabilidad (Airbnb)
- **Reventa**: Compra para apreciación y venta posterior
- **Promoción inmobiliaria**: Para inversores con mayor capacidad

## Zonas más buscadas

- Lisboa y Porto (centro histórico)
- Costa del Algarve (turismo)
- Costa de Caparica (playas)
- Cascais (exclusividad)

¡Contácteme para un análisis personalizado de su inversión!`,
            excerpt: 'Portugal oferece oportunidades únicas para investidores imobiliários. Descubra as vantagens.',
            published: true,
            coverImage: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800'
          }
        ]
      })
      console.log('Sample blog posts created')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      adminCreated: !!existingUser,
      listingsCount: await prisma.listing.count(),
      postsCount: await prisma.blogPost.count()
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ 
      error: 'Setup failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
