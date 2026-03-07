import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize, MapPin, Eye } from 'lucide-react'

interface ListingCardProps {
  listing: {
    id: string
    slug: string
    title: string
    price: number
    priceType: string
    status: string
    type: string
    bedrooms: number
    bathrooms: number
    area: number
    location: string
    energyClass: string | null
    images: string
  }
}

export default function ListingCard({ listing }: ListingCardProps) {
  const images = JSON.parse(listing.images || '[]')
  const mainImage = images[0] || '/images/placeholder.jpg'
  const priceFormatted = listing.priceType === 'rent' 
    ? `${listing.price.toLocaleString('pt-PT')}€/mês`
    : `${listing.price.toLocaleString('pt-PT')}€`

  const statusColors = {
    available: 'bg-green-500',
    sold: 'bg-red-500',
    reserved: 'bg-orange-500',
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/images/tysoncofre-logo.png"
            alt="Tyson Cofre"
            className="w-32 h-auto opacity-50"
          />
        </div>
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 text-white text-xs font-medium rounded ${statusColors[listing.status as keyof typeof statusColors] || 'bg-gray-500'}`}>
          {listing.status === 'available' ? 'Disponível' : listing.status === 'sold' ? 'Vendido' : 'Reservado'}
        </div>
        {/* Price Badge */}
        <div className="absolute bottom-2 left-2 bg-[#0A2240] text-white px-3 py-1 rounded font-bold">
          {priceFormatted}
        </div>
        {listing.priceType === 'rent' && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded">
            Arrendamento
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[#DC1010] font-bold text-lg">{listing.type}</span>
          {listing.energyClass && (
            <span className={`px-2 py-1 text-white text-xs font-medium rounded ${energyColors[listing.energyClass] || 'bg-gray-500'}`}>
              {listing.energyClass}
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-[#0A2240] mb-2 line-clamp-1">{listing.title}</h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin size={14} />
          <span>{listing.location}</span>
        </div>

        <div className="flex justify-between items-center text-gray-600 text-sm border-t pt-3">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            <span>{listing.bedrooms} Quartos</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            <span>{listing.bathrooms} WC</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={16} />
            <span>{listing.area} m²</span>
          </div>
        </div>

        <Link
          href={`/imoveis/${listing.slug}`}
          className="mt-4 block w-full bg-[#DC1010] text-white text-center py-2 rounded font-medium hover:bg-[#b00d0d] transition"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  )
}
