import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
  
  await prisma.user.upsert({
    where: { email: 'tysoncofre@remax.pt' },
    update: {},
    create: {
      email: 'tysoncofre@remax.pt',
      password: hashedPassword,
      name: 'Tyson Cofre',
      role: 'admin',
    },
  })

  // Create sample listings
  const listings = [
    {
      slug: 't3-apartamento-moderno-almada',
      title: 'T3 Apartamento Moderno em Almada',
      titleEn: 'T3 Modern Apartment in Almada',
      titleEs: 'Apartamento Moderno T3 en Almada',
      description: 'Fantástico apartamento T3 remodelado em Almada, com acabamentos de alta qualidade. Situado em zona calma com excelente exposição solar. Inclui cozinha equipada, varanda e lugar de parqueamento.',
      descriptionEn: 'Fantastic renovated T3 apartment in Almada, with high-quality finishes. Located in a quiet area with excellent sun exposure. Includes equipped kitchen, balcony and parking space.',
      descriptionEs: 'Fantástico apartamento T3 renovado en Almada, con acabados de alta calidad. Situado en una zona tranquila con excelente exposición solar. Incluye cocina equipada, balcón y plaza de aparamiento.',
      price: 285000,
      priceType: 'sale',
      status: 'available',
      type: 'T3',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      location: 'Almada',
      district: 'Setúbal',
      parish: 'Almada',
      lat: 38.6783,
      lng: -9.1584,
      energyClass: 'B',
      features: JSON.stringify(['Varanda', 'Parqueamento', 'Elevador', 'Cozinha Equipada']),
      images: JSON.stringify(['/images/listings/t3-almada-1.jpg', '/images/listings/t3-almada-2.jpg']),
      featured: true,
    },
    {
      slug: 't4-moradia-com-piscina-seixal',
      title: 'T4 Moradia com Piscina no Seixal',
      titleEn: 'T4 Villa with Pool in Seixal',
      titleEs: 'Villa T4 con Piscina en Seixal',
      description: 'Espetacular moradia T4 com piscina privativa no Seixal. Acabamentos de luxo, jardim arborizado, garagem para 2 carros. Ideal para famílias que procuram qualidade de vida.',
      descriptionEn: 'Spectacular T4 villa with private pool in Seixal. Luxury finishes, landscaped garden, garage for 2 cars. Ideal for families looking for quality of life.',
      descriptionEs: 'Espectacular villa T4 con piscina privada en Seixal. Acabados de lujo, jardín ajardinado, garaje para 2 coches. Ideal para familias que buscan calidad de vida.',
      price: 450000,
      priceType: 'sale',
      status: 'available',
      type: 'Moradia',
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      location: 'Seixal',
      district: 'Setúbal',
      parish: 'Seixal',
      lat: 38.5268,
      lng: -9.1031,
      energyClass: 'A',
      features: JSON.stringify(['Piscina', 'Jardim', 'Garagem', 'Lareira', 'Ar Condicionado']),
      images: JSON.stringify(['/images/listings/moradia-seixal-1.jpg', '/images/listings/moradia-seixal-2.jpg']),
      featured: true,
    },
    {
      slug: 't2-centro-lisboa',
      title: 'T2 Centro de Lisboa',
      titleEn: 'T2 City Center Lisbon',
      titleEs: 'T2 Centro de Lisboa',
      description: 'Excelente apartamento T2 no centro de Lisboa, a poucos minutos do Marquês de Pombal. Prédio histórico com renovação completa. Ideal para investimento ou habitação própria.',
      descriptionEn: 'Excellent T2 apartment in downtown Lisbon, a few minutes from Marquês de Pombal. Historic building with complete renovation. Ideal for investment or own home.',
      descriptionEs: 'Excelente apartamento T2 en el centro de Lisboa, a pocos minutos del Marquês de Pombal. Edificio histórico con renovación completa. Ideal para inversión o vivienda propia.',
      price: 175000,
      priceType: 'sale',
      status: 'available',
      type: 'T2',
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      location: 'Lisboa',
      district: 'Lisboa',
      parish: 'Avenidas Novas',
      lat: 38.7139,
      lng: -9.1394,
      energyClass: 'C',
      features: JSON.stringify(['Vista Cidade', 'Elevador', 'Renovado']),
      images: JSON.stringify(['/images/listings/t2-lisboa-1.jpg']),
      featured: true,
    },
    {
      slug: 't2-frente-mar-costa-caparica',
      title: 'T2 Frente Mar em Costa da Caparica',
      titleEn: 'T2 Sea Front in Costa da Caparica',
      titleEs: 'T2 Frente Mar en Costa da Caparica',
      description: 'Maravilhoso apartamento T2 frente mar na Costa da Caparica. Vista panorâmica para o oceano, a poucos metros da praia. Perfeito para férias ou investimento turístico.',
      descriptionEn: 'Wonderful seafront T2 apartment in Costa da Caparica. Panoramic ocean view, a few meters from the beach. Perfect for holidays or tourist investment.',
      descriptionEs: 'Maravilloso apartamento T2 frente al mar en Costa da Caparica. Vista panorámica del océano, a pocos metros de la playa. Perfecto para vacaciones o inversión turística.',
      price: 1200,
      priceType: 'rent',
      status: 'available',
      type: 'T2',
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      location: 'Costa da Caparica',
      district: 'Setúbal',
      parish: 'Costa da Caparica',
      lat: 38.5636,
      lng: -9.1558,
      energyClass: 'D',
      features: JSON.stringify(['Vista Mar', 'Varanda', 'Mobiliado']),
      images: JSON.stringify(['/images/listings/t2-caparica-1.jpg']),
      featured: true,
    },
  ]

  for (const listing of listings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: listing,
      create: listing,
    })
  }

  // Create sample blog posts
  const blogPosts = [
    {
      slug: 'como-escolher-imóvel-certo',
      title: 'Como Escolher o Imóvel Certo para Si',
      titleEn: 'How to Choose the Right Property for You',
      titleEs: 'Cómo Elegir la Propiedad Correcta para Ti',
      excerpt: 'Guia completo para ajudá-lo a encontrar o imóvel perfeito para as suas necessidades.',
      content: 'Escolher um imóvel é uma das decisões mais importantes da vida. Aqui estão algumas dicas para ajudá-lo a fazer a escolha certa. Defina o seu orçamento antes de começar a procurar. A localização é o fator mais importante na valorização de um imóvel.',
      contentEn: 'Choosing a property is one of the most important decisions in life. Here are some tips to help you make the right choice. Define your budget before you start looking.',
      contentEs: 'Elegir una propiedad es una de las decisiones más importantes de la vida. Aquí hay algunos consejos para ayudarte a tomar la decisión correcta. Define tu presupuesto antes de comenzar a buscar.',
      published: true,
      coverImage: '/images/blog/choosing-property.jpg',
    },
    {
      slug: 'tendencias-mercado-imobiliario-2024',
      title: 'Tendências do Mercado Imobiliário 2024',
      titleEn: 'Real Estate Market Trends 2024',
      titleEs: 'Tendencias del Mercado Inmobiliario 2024',
      excerpt: 'Descubra as principais tendências que estão a moldar o mercado imobiliário em Portugal.',
      content: 'O mercado imobiliário português continua a evoluir. Descubra as principais tendências para este ano.',
      contentEn: 'The Portuguese real estate market continues to evolve. Discover the main trends for this year.',
      contentEs: 'El mercado inmobiliario português continúa evolucionando. Descubre las principales tendencias para este año.',
      published: true,
      coverImage: '/images/blog/market-trends.jpg',
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
