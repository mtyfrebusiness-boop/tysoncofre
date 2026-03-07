'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin, Search, X } from 'lucide-react'

export default function ImoveisPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [filters, setFilters] = useState({
    type: '',
    priceType: '',
    district: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  })

  const fetchListings = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.type) params.set('type', filters.type)
    if (filters.priceType) params.set('priceType', filters.priceType)
    if (filters.district) params.set('district', filters.district)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms)

    fetch(`/api/imoveis?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setListings(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchListings()
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    fetchListings()
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({
      type: '',
      priceType: '',
      district: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    })
    fetchListings()
    setShowFilters(false)
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-[#0A2240]">
          Os Nossos Imóveis
        </h1>

        {/* Filter Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[#0A2240] text-white px-4 py-2 rounded-lg hover:bg-[#1a3a5c] transition"
          >
            <Search size={20} />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="bg-[#DC1010] text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0A2240]">Filtros</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Transação
                </label>
                <select
                  value={filters.priceType}
                  onChange={(e) => handleFilterChange('priceType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                >
                  <option value="">Todas</option>
                  <option value="sale">Venda</option>
                  <option value="rent">Arrendamento</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Imóvel
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="T1">T1</option>
                  <option value="T2">T2</option>
                  <option value="T3">T3</option>
                  <option value="T4">T4</option>
                  <option value="T5">T5</option>
                  <option value="Moradia">Moradia</option>
                  <option value="Loja">Loja</option>
                  <option value="Escritório">Escritório</option>
                  <option value="Terreno">Terreno</option>
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distrito
                </label>
                <select
                  value={filters.district}
                  onChange={(e) => handleFilterChange('district', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="Lisboa">Lisboa</option>
                  <option value="Setúbal">Setúbal</option>
                  <option value="Porto">Porto</option>
                  <option value="Faro">Faro</option>
                  <option value="Coimbra">Coimbra</option>
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço Mínimo
                </label>
                <select
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                >
                  <option value="">Qualquer</option>
                  <option value="50000">50.000€</option>
                  <option value="100000">100.000€</option>
                  <option value="150000">150.000€</option>
                  <option value="200000">200.000€</option>
                  <option value="300000">300.000€</option>
                  <option value="500000">500.000€</option>
                </select>
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço Máximo
                </label>
                <select
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                >
                  <option value="">Qualquer</option>
                  <option value="100000">100.000€</option>
                  <option value="150000">150.000€</option>
                  <option value="200000">200.000€</option>
                  <option value="300000">300.000€</option>
                  <option value="500000">500.000€</option>
                  <option value="1000000">1.000.000€</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quartos
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC1010] focus:border-transparent"
                >
                  <option value="">Qualquer</option>
                  <option value="1">1 Quarto</option>
                  <option value="2">2 Quartos</option>
                  <option value="3">3 Quartos</option>
                  <option value="4">4 Quartos</option>
                  <option value="5">5+ Quartos</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={applyFilters}
                className="bg-[#DC1010] text-white px-6 py-2 rounded-lg hover:bg-[#b00d0d] transition"
              >
                Aplicar Filtros
              </button>
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 px-4 py-2"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        <p className="text-gray-500 mb-4">
          {loading ? 'A carregar...' : `${listings.length} imóvel(is) encontrado(s)`}
        </p>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DC1010] mx-auto"></div>
            <p className="mt-4 text-gray-500">A carregar imóveis...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing: any) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {listings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Não existem imóveis com os filtros selecionados.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#DC1010] hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </>
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
            className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto opacity-50"
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
