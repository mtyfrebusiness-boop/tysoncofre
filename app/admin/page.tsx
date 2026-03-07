import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Building, FileText, Users, Plus, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  // Fetch stats
  const totalListings = await prisma.listing.count()
  const activeListings = await prisma.listing.count({
    where: { status: 'available' }
  })
  const totalLeads = await prisma.lead.count()
  const unreadLeads = await prisma.lead.count({
    where: { read: false }
  })
  const totalPosts = await prisma.blogPost.count()

  // Fetch recent leads
  const recentLeads = await prisma.lead.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0A2240] mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#DC1010]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Imóveis</p>
              <p className="text-3xl font-bold text-[#0A2240]">{totalListings}</p>
            </div>
            <Building className="text-[#DC1010]" size={32} />
          </div>
          <Link href="/admin/imoveis" className="text-sm text-[#DC1010] hover:underline mt-2 block">
            Ver todos →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Imóveis Ativos</p>
              <p className="text-3xl font-bold text-green-600">{activeListings}</p>
            </div>
            <Building className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#0A2240]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-3xl font-bold text-[#0A2240]">{totalLeads}</p>
            </div>
            <Users className="text-[#0A2240]" size={32} />
          </div>
          {unreadLeads > 0 && (
            <p className="text-sm text-orange-500 mt-2">{unreadLeads} não lidos</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#C9A84C]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Posts Blog</p>
              <p className="text-3xl font-bold text-[#C9A84C]">{totalPosts}</p>
            </div>
            <FileText className="text-[#C9A84C]" size={32} />
          </div>
          <Link href="/admin/blog" className="text-sm text-[#C9A84C] hover:underline mt-2 block">
            Ver todos →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link 
          href="/admin/imoveis/novo"
          className="flex items-center gap-4 bg-[#DC1010] text-white p-6 rounded-lg hover:bg-[#b00d0d] transition-colors"
        >
          <Plus size={32} />
          <div>
            <h3 className="font-bold text-lg">Novo Imóvel</h3>
            <p className="text-sm text-white/80">Adicionar um novo imóvel ao site</p>
          </div>
        </Link>

        <Link 
          href="/admin/blog/novo"
          className="flex items-center gap-4 bg-[#0A2240] text-white p-6 rounded-lg hover:bg-[#1a3a5c] transition-colors"
        >
          <Plus size={32} />
          <div>
            <h3 className="font-bold text-lg">Novo Post</h3>
            <p className="text-sm text-white/80">Escrever um novo artigo no blog</p>
          </div>
        </Link>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-[#0A2240]">Leads Recentes</h2>
          <Link href="/admin/leads" className="text-[#DC1010] hover:underline flex items-center gap-1">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Ainda não há leads registados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fonte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentLeads.map((lead: { id: string; name: string; email: string; phone: string | null; source: string | null; createdAt: Date; read: boolean }) => (
                  <tr key={lead.id} className={lead.read ? 'bg-white' : 'bg-yellow-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.source || 'Direct'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString('pt-PT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.read ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          Lido
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                          Novo
                        </span>
                      )}
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
