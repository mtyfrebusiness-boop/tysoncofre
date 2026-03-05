import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import ContactForm from '@/components/ContactForm'
import { Bed, Bath, Maximize, MapPin, Zap, Check } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await prisma.listing.findUnique({
    where: { slug },
  })

  if (!listing) {
    return { title: 'Imóvel Não Encontrado' }
  }

  return {
    title: `${listing.title} | Tyson Cofre RE/MAX`,
    description: listing.description,
  }
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params
  const listing = await prisma.listing.findUnique({
    where: { slug },
  })

  if (!listing) {
    notFound()
  }

  const images = JSON.parse(listing.images || '[]')
  const features = JSON.parse(listing.features || '[]')
  const priceFormatted = listing.priceType === 'rent' 
    ? `${listing.price.toLocaleString('pt-PT')}€/mês`
    : `${listing.price.toLocaleString('pt-PT')}€`

  const statusLabels = {
    available: 'Disponível',
    sold: 'Vendido',
    reserved: 'Reservado',
  }

  const energyColors: Record<string, string> = {
    A: 'bg-green-500',
    B: 'bg-green-400',
    C: 'bg-yellow-400',
    D: 'bg-yellow-300',
    E: 'bg-orange-400',
    F: 'bg-red-500',
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <img
              src={images[0] || '/images/placeholder.jpg'}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`${listing.title} - Imagem ${index + 1}`}
                  className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[#DC1010] font-bold text-xl">{listing.type}</span>
                <h1 className="text-3xl font-bold text-[#0A2240] mt-1">{listing.title}</h1>
                <div className="flex items-center gap-2 text-gray-500 mt-2">
                  <MapPin size={18} />
                  <span>{listing.location}</span>
                  {listing.parish && <span>, {listing.parish}</span>}
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#0A2240]">{priceFormatted}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded">
                  {statusLabels[listing.status as keyof typeof statusLabels]}
                </span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Bed size={24} className="mx-auto text-[#DC1010] mb-2" />
                <p className="font-bold">{listing.bedrooms}</p>
                <p className="text-sm text-gray-500">Quartos</p>
              </div>
              <div className="text-center">
                <Bath size={24} className="mx-auto text-[#DC1010] mb-2" />
                <p className="font-bold">{listing.bathrooms}</p>
                <p className="text-sm text-gray-500">WC</p>
              </div>
              <div className="text-center">
                <Maximize size={24} className="mx-auto text-[#DC1010] mb-2" />
                <p className="font-bold">{listing.area} m²</p>
                <p className="text-sm text-gray-500">Área</p>
              </div>
              {listing.energyClass && (
                <div className="text-center">
                  <Zap size={24} className="mx-auto text-[#DC1010] mb-2" />
                  <span className={`inline-block px-3 py-1 text-white text-sm font-bold rounded ${energyColors[listing.energyClass] || 'bg-gray-500'}`}>
                    {listing.energyClass}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Energia</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0A2240] mb-4">Descrição</h2>
              <p className="text-gray-600 whitespace-pre-line">{listing.description}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0A2240] mb-4">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <Check size={16} className="text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-[#0A2240] mb-4">
                Interessado neste imóvel?
              </h3>
              <ContactForm 
                source="listing" 
                listingId={listing.id} 
                listingTitle={listing.title} 
              />
              
              <div className="mt-6 pt-6 border-t">
                <a
                  href={`https://wa.me/351930567663?text=Olá Tyson, estou interessado no imóvel: ${encodeURIComponent(listing.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#25D366] text-white text-center py-3 rounded font-bold hover:bg-[#20BD5A] transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
