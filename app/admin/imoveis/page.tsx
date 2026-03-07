'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Star, Trash2 } from 'lucide-react'
import DeleteButton from '@/components/DeleteButton'

export default function AdminImoveisPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/imoveis')
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
    return <div className="p-8 text-center">A carregar...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0A2240]">Gerir Imóveis</h1>
        <Link
          href="/admin/imoveis/novo"
          className="bg-[#DC1010] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#b00d0d] transition"
        >
          <Plus size={20} />
          Novo Imóvel
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {listings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Ainda não há imóveis registados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destaque</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {listing.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {listing.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {listing.priceType === 'rent' 
                        ? `${listing.price}€/mês` 
                        : `${listing.price}€`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        listing.status === 'available' ? 'bg-green-100 text-green-800' :
                        listing.status === 'reserved' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {listing.status === 'available' ? 'Disponível' : 
                         listing.status === 'reserved' ? 'Reservado' : 'Vendido'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {listing.featured && <Star className="text-yellow-500" size={20} />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/imoveis/${listing.id}`}
                        className="text-[#0A2240] hover:text-[#DC1010] mr-4"
                      >
                        <Edit size={18} />
                      </Link>
                      <DeleteButton id={listing.id} type="listing" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
