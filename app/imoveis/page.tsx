'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'

export default function ImoveisPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/imoveis')
      .then(res => res.json())
      .then(data => {
        setListings(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC1010] mx-auto"></div>
            <p className="mt-4 text-gray-500">A carregar imóveis...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-[#0A2240]">
          Os Nossos Imóveis
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing: any) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Não existem imóveis disponíveis de momento.
            </p>
            <p className="text-gray-400 mt-2">
              Em breve teremos novas opções para si.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function ListingCard({ listing }: { listing: any }) {
  const images = JSON.parse(listing.images || '[]')
  const mainImage = images[0] || '/images/placeholder.jpg'
  const priceFormatted = listing.priceType === 'rent' 
    ? `${listing.price.toLocaleString('pt-PT')}€/mês`
    : `${listing.price.toLocaleString('pt-PT')}€`

  const statusColors: Record<string, string> = {
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
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
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
            className="w-24 sm:w-28 md:w-32 h-auto opacity-50"
          />
        </div>
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 text-white text-xs font-medium rounded ${statusColors[listing.status] || 'bg-gray-500'}`}>
          {listing.status === 'available' ? 'Disponível' : listing.status === 'sold' ? 'Vendido' : 'Reservado'}
        </div>
        {/* Price Badge */}
        <div className="absolute bottom-2 left-2 bg-[#0A2240] text-white px-2 sm:px-3 py-1 rounded font-bold text-sm sm:text-base">
          {priceFormatted}
        </div>
        {listing.priceType === 'rent' && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded">
            Arrendamento
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[#DC1010] font-bold text-base sm:text-lg">{listing.type}</span>
          {listing.energyClass && (
            <span className={`px-2 py-1 text-white text-xs font-medium rounded ${energyColors[listing.energyClass] || 'bg-gray-500'}`}>
              {listing.energyClass}
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-[#0A2240] mb-2 line-clamp-1 text-sm sm:text-base">{listing.title}</h3>
        
        <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
          <MapPin size={14} />
          <span className="line-clamp-1">{listing.location}</span>
        </div>

        <div className="flex justify-between items-center text-gray-600 text-xs sm:text-sm border-t pt-2 sm:pt-3">
          <div className="flex items-center gap-1">
            <Bed size={14} />
            <span>{listing.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} />
            <span>{listing.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={14} />
            <span>{listing.area} m²</span>
          </div>
        </div>

        <Link
          href={`/imoveis/${listing.slug}`}
          className="mt-3 sm:mt-4 block w-full bg-[#DC1010] text-white text-center py-2 rounded font-medium hover:bg-[#b00d0d] transition text-sm sm:text-base"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  )
}
