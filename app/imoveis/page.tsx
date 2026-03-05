import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import ListingCard from '@/components/ListingCard'

export const metadata: Metadata = {
  title: 'Imóveis à Venda e Arrendamento | Tyson Cofre RE/MAX',
  description: 'Encontre apartamentos, moradias e outros imóveis à venda e arrendamento em Almada, Lisboa e região. Contacte Tyson Cofre, consultor RE/MAX.',
}

export const revalidate = 60

export default async function ImoveisPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-[#0A2240]">
          Os Nossos Imóveis
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
