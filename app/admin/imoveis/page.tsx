import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Edit, Star } from 'lucide-react'
import DeleteButton from '@/components/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function AdminImoveisPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const formatPrice = (price: number, priceType: string) => {
    if (priceType === 'rent') {
      return `${price.toLocaleString('pt-PT')}€/mês`
    }
    return `${price.toLocaleString('pt-PT')}€`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Disponível</span>
      case 'sold':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Vendido</span>
      case 'reserved':
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">Reservado</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{status}</span>
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#0A2240]">Gerir Imóveis</h1>
        <Link 
          href="/admin/imoveis/novo"
          className="flex items-center gap-2 bg-[#DC1010] text-white px-4 py-2 rounded-lg hover:bg-[#b00d0d] transition-colors"
        >
          <Plus size={20} />
          Novo Imóvel
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {listings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">Ainda não há imóveis registados.</p>
            <Link 
              href="/admin/imoveis/novo"
              className="text-[#DC1010] hover:underline"
            >
              Criar o primeiro imóvel →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localização</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destaque</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                      <div className="text-sm text-gray-500">{listing.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {listing.location}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#0A2240]">
                      {formatPrice(listing.price, listing.priceType)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {listing.type}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(listing.status)}
                    </td>
                    <td className="px-6 py-4">
                      {listing.featured && (
                        <Star className="text-[#C9A84C] fill-[#C9A84C]" size={20} />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/admin/imoveis/${listing.id}`}
                          className="p-2 text-[#0A2240] hover:bg-gray-100 rounded"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteButton id={listing.id} type="listing" />
                        <Link 
                          href={`/imoveis/${listing.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                        >
                          Ver
                        </Link>
                      </div>
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
